import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { API_BASE_URL } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/lib/queryClient';

// Form schema matching backend model
const donationSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your full name' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  amount: z.number()
    .min(100, { message: 'Minimum donation amount is ₹100' })
    .max(100000, { message: 'Maximum donation amount is ₹100,000' }),
  message: z.string().optional().default(''),
  identityProof: z.instanceof(File).optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

type DonationFormValues = z.infer<typeof donationSchema>;

interface DonationFormProps {
  causeSlug: string | null;
  customCause: string | null;
  lockedCause?: { id: string | null, label: string } | null;
}

const DonationForm: React.FC<DonationFormProps> = ({ causeSlug, customCause, lockedCause }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      amount: 1000,
      message: '',
      identityProof: undefined,
      acceptTerms: false,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue('identityProof', file);
    }
  };

  const onSubmit = async (data: DonationFormValues) => {
    setIsSubmitting(true);

    try {
      setPaymentProcessing(true);
      toast({
        title: 'Processing payment...',
        description: 'Please wait while we process your donation.',
      });

      setTimeout(async () => {
        try {
          let causeSlugToSend = causeSlug;
          let customCauseToSend = customCause;
          if (lockedCause) {
            causeSlugToSend = lockedCause.label ? lockedCause.label : undefined;
            customCauseToSend = lockedCause.id ? null : lockedCause.label;
          }
          if (!causeSlugToSend && !customCauseToSend) {
            customCauseToSend = 'General';
          }

          const formData = new FormData();
          formData.append('name', data.name);
          formData.append('email', data.email);
          formData.append('phone', data.phone);
          formData.append('amount', data.amount.toString());
          formData.append('message', data.message || '');
          formData.append('causeSlug', causeSlugToSend || '');
          formData.append('customCause', customCauseToSend || '');
          formData.append('paymentId', 'pay_' + Math.random().toString(36).substring(2, 15));
          formData.append('status', 'completed');
          if (data.identityProof) {
            formData.append('identityProof', data.identityProof);
          }

          const response = await fetch(`${API_BASE_URL}/api/donation`, {
            method: 'POST',
            credentials: 'include',
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to process donation');
          }

          const result = await response.json();

          toast({
            title: 'Thank you for your donation!',
            description: customCauseToSend 
              ? `Your contribution to "${customCauseToSend}" will help create lasting impact.`
              : 'Your contribution will help create lasting impact.',
          });

          queryClient.invalidateQueries({ queryKey: ['causes'] });
          reset();
          setSelectedFile(null);

          if (result.donation?.receipt) {
            setTimeout(async () => {
              try {
                const response = await fetch(result.donation.receipt);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Donation-Receipt.pdf';
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
              } catch (err) {
                // fallback: open in new tab if download fails
                window.open(result.donation.receipt, '_blank');
              }
            }, 1000);
          }
        } catch (error) {
          console.error('Donation processing error:', error);
          toast({
            title: 'Donation Failed',
            description: error instanceof Error ? error.message : 'Failed to process donation. Please try again.',
            variant: 'destructive',
          });
        } finally {
          setPaymentProcessing(false);
          setIsSubmitting(false);
        }
      }, 2000);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error submitting your form. Please try again.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  const suggestedAmounts = [500, 1000, 2500, 5000, 10000];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-primary focus:border-primary`}
            placeholder="Enter your full name"
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            id="email"
            type="email"
            className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-primary focus:border-primary`}
            placeholder="Enter your email address"
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            id="phone"
            type="tel"
            className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-primary focus:border-primary`}
            placeholder="Enter your phone number"
            {...register('phone')}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Donation Amount (₹) *
          </label>
          <input
            id="amount"
            type="number"
            className={`w-full p-3 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-primary focus:border-primary`}
            {...register('amount', { valueAsNumber: true })}
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            {suggestedAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
                onClick={() => setValue('amount', amount, { shouldValidate: true })}
              >
                ₹{amount.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message (Optional)
          </label>
          <textarea
            id="message"
            rows={3}
            className={`w-full p-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-primary focus:border-primary`}
            placeholder="Add a message with your donation"
            {...register('message')}
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="identityProof" className="block text-sm font-medium text-gray-700 mb-1">
            Identity Proof (Optional)
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="identityProof"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="identityProof"
              className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {selectedFile ? 'Change File' : 'Upload File'}
            </label>
            {selectedFile && (
              <span className="ml-3 text-sm text-gray-500">
                {selectedFile.name}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Upload Aadhar Card, PAN Card, Driving License, or Passport (PDF or Image)
          </p>
          {errors.identityProof && (
            <p className="mt-1 text-sm text-red-600">{errors.identityProof.message}</p>
          )}
        </div>

        <div className="flex items-center h-5">
          <input
            id="acceptTerms"
            type="checkbox"
            className={`h-4 w-4 border ${errors.acceptTerms ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-primary text-primary`}
            {...register('acceptTerms')}
          />
          <div className="ml-3 text-sm">
            <label htmlFor="acceptTerms" className="text-gray-700">
              I agree to the{' '}
              <a href="/policies/donation" className="text-primary hover:underline">
                donation policy
              </a>{' '}
              and{' '}
              <a href="/policies/privacy" className="text-primary hover:underline">
                privacy policy
              </a>
            </label>
            {errors.acceptTerms && (
              <p className="mt-1 text-sm text-red-600">{errors.acceptTerms.message}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-[#F14B05]/90 text-white py-3 px-4 rounded-md font-medium transition-colors flex justify-center items-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {paymentProcessing ? 'Processing Payment...' : 'Processing...'}
            </>
          ) : (
            'Make Donation'
          )}
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Secured by <span className="font-semibold">Razorpay</span>
        </p>
      </div>
    </form>
  );
};

export default DonationForm;
