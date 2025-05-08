import React from 'react';
import { Link } from 'wouter';
import { format, parseISO } from 'date-fns';
import { CalendarDays, MapPin } from 'lucide-react';

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
  const getFormattedDate = (dateString: string) => {
    try {
      if (!dateString) return 'Date TBA';
      const date = parseISO(dateString);
      if (isNaN(date.getTime())) return 'Date TBA';
      return format(date, 'MMMM d, yyyy');
    } catch (error) {
      console.error('Invalid date:', dateString);
      return 'Date TBA';
    }
  };

  const isUpcoming = () => {
    try {
      if (!event.startDateTime) return false;
      const eventDate = parseISO(event.startDateTime);
      if (isNaN(eventDate.getTime())) return false;
      return eventDate > new Date();
    } catch (error) {
      console.error('Invalid date for comparison:', event.startDateTime);
      return false;
    }
  };

  const getLocationText = () => {
    if (!event.location) return 'Location TBA';
    if (event.location.venueName) return event.location.venueName;
    if (event.location.fullAddress) return event.location.fullAddress;
    const parts = [
      event.location.block,
      event.location.district,
      event.location.state,
      event.location.country
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'Location TBA';
  };

  const formattedDate = getFormattedDate(event.startDateTime);
  const locationText = getLocationText();
  const upcoming = isUpcoming();
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div 
        className="h-48 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url(${event.eventPoster || 'https://via.placeholder.com/400x200'})`,
          filter: 'brightness(0.95)'
        }}
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-montserrat font-semibold text-xl line-clamp-2">{event.eventTitle}</h3>
            <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{locationText}</span>
            </div>
          </div>
          <span className={`
            text-xs font-semibold px-2.5 py-0.5 rounded-full
            ${upcoming ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
          `}>
            {upcoming ? 'Upcoming' : 'Past'}
          </span>
        </div>
        <div className="flex items-center mb-4 text-sm text-gray-700">
          <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
          {formattedDate}
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.eventDescription || event.objective || 'Join us for this exciting event!'}
        </p>
        <Link 
          href={`/event/${event.slug}`} 
          className="inline-flex items-center text-primary hover:text-primary/90 font-medium text-sm"
        >
          View Details
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
