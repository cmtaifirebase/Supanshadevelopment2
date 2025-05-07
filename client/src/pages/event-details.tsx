import React from 'react';
import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import { API_BASE_URL } from '@/config';
import { CalendarDays, MapPin, Users, Clock } from 'lucide-react';

interface Location {
  country?: string;
  state?: string;
  district?: string;
  block?: string;
  venueName?: string;
  fullAddress?: string;
  latitude?: number;
  longitude?: number;
}

interface Event {
  _id: string;
  organizerName: string;
  organizationLogo?: string;
  websiteLink?: string;
  eventTitle: string;
  slug: string;
  eventDescription?: string;
  eventType?: string;
  themeFocusArea?: string;
  objective?: string;
  targetAudience?: string[];
  expectedParticipants?: number;
  startDateTime: string;
  endDateTime?: string;
  location?: Location;
  totalPasses?: number;
  isFreeEvent?: boolean;
  autoAttendanceRequired?: boolean;
  volunteerRolesNeeded?: string;
  needVolunteers?: boolean;
  sponsorRequirements?: string;
  sponsorLogos?: string[];
  eventPoster?: string;
  eventDocuments?: string[];
  approvalStatus: 'Draft' | 'Pending' | 'Approved';
  displayOnWebsite: boolean;
  createdAt: string;
  updatedAt: string;
}

interface EventResponse {
  success: boolean;
  event: Event;
}

const EventDetails: React.FC = () => {
  // useRoute hook returns an array with the matched route and params
  // We destructure it to get just the params object which contains the slug
  const [, params] = useRoute('/event/:slug');
  const slug = params?.slug;

  const { data: eventResponse, isLoading } = useQuery<EventResponse>({
    queryKey: ['event', slug],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/event/${slug}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }
      return response.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!eventResponse?.event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600">The event you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const { event } = eventResponse;
  const startDate = new Date(event.startDateTime);
  const endDate = event.endDateTime ? new Date(event.endDateTime) : null;

  return (
    <>
      <Helmet>
        <title>{event.eventTitle} | Supansha Development Foundation</title>
        <meta name="description" content={event.eventDescription || event.objective || 'Join us for this exciting event.'} />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${event.eventPoster || 'https://via.placeholder.com/1200x400'})`,
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="container mx-auto px-4 h-full flex items-end">
          <div className="relative text-white pb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.eventTitle}</h1>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5" />
                <span>
                  {format(startDate, 'MMMM d, yyyy')}
                  {endDate && ` - ${format(endDate, 'MMMM d, yyyy')}`}
                </span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>
                    {event.location.venueName || event.location.fullAddress}
                  </span>
                </div>
              )}
              {event.expectedParticipants && (
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{event.expectedParticipants} Expected Participants</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold mb-4">About the Event</h2>
              <div className="prose max-w-none">
                {event.eventDescription && <p>{event.eventDescription}</p>}
                {event.objective && (
                  <>
                    <h3 className="text-xl font-semibold mt-6 mb-3">Objective</h3>
                    <p>{event.objective}</p>
                  </>
                )}
              </div>
            </section>

            {/* Target Audience */}
            {event.targetAudience && event.targetAudience.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Target Audience</h2>
                <ul className="list-disc list-inside space-y-2">
                  {event.targetAudience.map((audience, index) => (
                    <li key={index}>{audience}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Volunteer Opportunities */}
            {event.needVolunteers && event.volunteerRolesNeeded && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Volunteer Opportunities</h2>
                <p>{event.volunteerRolesNeeded}</p>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Details Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Event Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CalendarDays className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p className="text-sm text-gray-600">
                      {format(startDate, 'MMMM d, yyyy h:mm a')}
                      {endDate && (
                        <>
                          <br />
                          to<br />
                          {format(endDate, 'MMMM d, yyyy h:mm a')}
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {event.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-gray-600">
                        {event.location.venueName && (
                          <span className="block">{event.location.venueName}</span>
                        )}
                        {event.location.fullAddress && (
                          <span className="block">{event.location.fullAddress}</span>
                        )}
                        {event.location.district && (
                          <span className="block">
                            {[
                              event.location.district,
                              event.location.state,
                              event.location.country
                            ].filter(Boolean).join(', ')}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {event.expectedParticipants && (
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="font-medium">Expected Participants</p>
                      <p className="text-sm text-gray-600">{event.expectedParticipants}</p>
                    </div>
                  </div>
                )}

                {event.totalPasses && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="font-medium">Available Passes</p>
                      <p className="text-sm text-gray-600">{event.totalPasses}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Organizer Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Organizer</h3>
              <div className="space-y-4">
                {event.organizationLogo && (
                  <img 
                    src={event.organizationLogo} 
                    alt={event.organizerName}
                    className="h-16 object-contain"
                  />
                )}
                <p className="font-medium">{event.organizerName}</p>
                {event.websiteLink && (
                  <a 
                    href={event.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails; 