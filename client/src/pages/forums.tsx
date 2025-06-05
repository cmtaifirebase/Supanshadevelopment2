import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { API_BASE_URL } from '@/config';

interface Forum {
  _id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: 'upcoming' | 'past';
  registrationLink?: string;
  summary?: string;
  recordingLink?: string;
}

interface ForumProposal {
  name: string;
  email: string;
  topic: string;
  description: string;
}

const Forums: React.FC = () => {
  const { user } = useAuth();
  const [upcomingForums, setUpcomingForums] = useState<Forum[]>([]);
  const [pastForums, setPastForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [proposal, setProposal] = useState<ForumProposal>({
    name: '',
    email: '',
    topic: '',
    description: ''
  });

  useEffect(() => {
    fetchForums();
  }, []);

  const fetchForums = async () => {
    try {
      // Assuming a token is required
      const token = localStorage.getItem('authToken'); // Or however you store your token
      const response = await fetch(`${API_BASE_URL}/api/forum`, {
        headers: {
          'Authorization': `Bearer ${token}` // Example for Bearer token authentication
        },
        credentials: 'include' // Keep if cookies are also used for session management
      });
      if (!response.ok) {
        throw new Error('Failed to fetch forums');
      }
      const data = await response.json();
      
      setUpcomingForums(data.forums.filter((f: Forum) => f.type === 'upcoming'));
      setPastForums(data.forums.filter((f: Forum) => f.type === 'past'));
      setError(null);
    } catch (err) {
      console.error('Error fetching forums:', err);
      setError('Failed to fetch forums');
      setUpcomingForums([]);
      setPastForums([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProposalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken'); // Or however you store your token
      const response = await fetch(`${API_BASE_URL}/api/forum/propose`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Keep if cookies are also used for session management
        body: JSON.stringify(proposal),
      });

      if (response.ok) {
        alert('Proposal submitted successfully!');
        setProposal({ name: '', email: '', topic: '', description: '' });
      } else {
        alert('Failed to submit proposal. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting proposal:', err);
      alert('An error occurred. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProposal({
      ...proposal,
      [e.target.id]: e.target.value
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Community Forums</h1>
          
          {/* Upcoming Forums Section */}
          <div className="bg-gray-100 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Forums</h2>
            <div className="space-y-6">
              {upcomingForums.map(forum => (
                <div key={forum._id} className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-medium mb-2">{forum.title}</h3>
                  <p className="text-gray-600 mb-3">{forum.date} · {forum.location}</p>
                  <p className="mb-4">{forum.description}</p>
                  {forum.registrationLink && (
                    <button 
                      onClick={() => window.open(forum.registrationLink, '_blank')}
                      className="bg-primary hover:bg-[#F14B05]/90 text-white px-5 py-2 rounded-md font-medium transition-colors"
                    >
                      Register Now
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Past Forums Section */}
          <div className="bg-gray-100 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Past Forums</h2>
            <div className="space-y-6">
              {pastForums.map(forum => (
                <div key={forum._id} className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-medium mb-2">{forum.title}</h3>
                  <p className="text-gray-600 mb-3">{forum.date} · {forum.location}</p>
                  <p className="mb-4">{forum.description}</p>
                  <div className="flex space-x-4">
                    {forum.summary && (
                      <button 
                        onClick={() => window.open(forum.summary, '_blank')}
                        className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-md font-medium transition-colors"
                      >
                        View Summary
                      </button>
                    )}
                    {forum.recordingLink && (
                      <button 
                        onClick={() => window.open(forum.recordingLink, '_blank')}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-md font-medium transition-colors"
                      >
                        Watch Recording
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Proposal Form */}
          <div className="bg-gray-100 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Propose a Forum</h2>
            <p className="mb-6">Have an idea for a forum topic? We welcome suggestions for meaningful discussions that address important social issues.</p>
            <form className="space-y-4" onSubmit={handleProposalSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={proposal.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={proposal.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Your email address"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">Proposed Topic</label>
                <input 
                  type="text" 
                  id="topic" 
                  value={proposal.topic}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Forum topic"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  id="description" 
                  value={proposal.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="Briefly describe the forum topic and why it's important"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="bg-primary hover:bg-[#F14B05]/90 text-white px-5 py-2 rounded-md font-medium transition-colors"
              >
                Submit Proposal
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forums;