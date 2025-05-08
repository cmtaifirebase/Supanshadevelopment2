import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import EventCard from '@/components/shared/event-card';
import { API_BASE_URL } from '@/config';

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

const EventsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

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
  const approvedEvents = eventResponse?.events?.filter(event => 
    event.approvalStatus === 'Approved' && event.displayOnWebsite
  ) || [];

  // Filter events based on active tab
  const filteredEvents = React.useMemo(() => {
    const now = new Date();
    
    if (activeTab === 'upcoming') {
      return approvedEvents
        .filter(event => new Date(event.startDateTime) > now)
        .sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime());
    } else {
      return approvedEvents
        .filter(event => new Date(event.startDateTime) <= now)
        .sort((a, b) => new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime());
    }
  }, [approvedEvents, activeTab]);

  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl mb-3">Shared Moments</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Events that united communities — from awareness to workshops and cultural exchanges.</p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button 
              type="button" 
              className={`py-2 px-4 text-sm font-medium rounded-l-lg ${
                activeTab === 'upcoming' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Events
            </button>
            <button 
              type="button" 
              className={`py-2 px-4 text-sm font-medium rounded-r-lg ${
                activeTab === 'past' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('past')}
            >
              Past Events
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow">
            <p className="text-gray-700">
              {activeTab === 'upcoming' 
                ? 'No upcoming events at the moment. Check back soon!' 
                : 'No past events to display.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
