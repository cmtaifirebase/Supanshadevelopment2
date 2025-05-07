import React from 'react';
import { Link } from 'wouter';
import { format } from 'date-fns';

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

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const isUpcoming = new Date(event.startDateTime) > new Date();
  const formattedDate = format(new Date(event.startDateTime), 'MMMM d, yyyy');
  const locationText = event.location?.venueName || event.location?.fullAddress || 'Location TBA';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div 
        className="h-48 bg-cover bg-center" 
        style={{ backgroundImage: `url(${event.eventPoster || 'https://via.placeholder.com/400x200'})` }}
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-montserrat font-semibold text-xl">{event.eventTitle}</h3>
            <p className="text-gray-500 text-sm">{locationText}</p>
          </div>
          <span className={`
            text-xs font-semibold px-2.5 py-0.5 rounded
            ${isUpcoming ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
          `}>
            {isUpcoming ? 'Upcoming' : 'Past'}
          </span>
        </div>
        <div className="flex items-center mb-4 text-sm text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formattedDate}
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.eventDescription || event.objective || 'Join us for this exciting event!'}
        </p>
        <Link 
          href={`/event/${event.slug}`} 
          className="inline-block bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
