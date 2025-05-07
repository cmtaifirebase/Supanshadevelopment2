import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '@/config';
import EventCard from '@/components/shared/event-card';

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

interface EventsResponse {
  success: boolean;
  events: Event[];
}

const Events: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: eventResponse, isLoading } = useQuery<EventsResponse>({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/event`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      return response.json();
    },
  });

  // Filter only approved events
  const approvedEvents = eventResponse?.events?.filter(event => event.approvalStatus === 'Approved' && event.displayOnWebsite) || [];

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'upcoming', name: 'Upcoming Events' },
    { id: 'past', name: 'Past Events' }
  ];

  const filteredEvents = React.useMemo(() => {
    const now = new Date();
    
    let filtered = approvedEvents;
    
    if (activeCategory === 'upcoming') {
      filtered = approvedEvents.filter(event => new Date(event.startDateTime) > now);
    } else if (activeCategory === 'past') {
      filtered = approvedEvents.filter(event => new Date(event.startDateTime) <= now);
    }

    return filtered.sort((a, b) => 
      activeCategory === 'past' 
        ? new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime()
        : new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
    );
  }, [approvedEvents, activeCategory]);

  return (
    <>
      <Helmet>
        <title>Events | Supansha Development Foundation</title>
        <meta name="description" content="Join us in our upcoming events or explore our past events. Together we can make a difference." />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold mb-4">Our Events</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Join us in making a difference. Explore our upcoming events and past initiatives.
          </p>
        </div>
      </div>

      {/* Events Content */}
      <div className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <div className="flex justify-center mb-8">
              <div className="inline-flex flex-wrap justify-center gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                      activeCategory === category.id 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {filteredEvents && filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map(event => (
                    <EventCard key={event._id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h2 className="text-2xl font-montserrat font-bold mb-2">No Events Found</h2>
                  <p className="text-gray-600">
                    {activeCategory === 'upcoming' 
                      ? 'No upcoming events scheduled at the moment. Please check back later.'
                      : activeCategory === 'past'
                      ? 'No past events to display.'
                      : 'No events found in this category. Please try another category or check back later.'}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Events; 