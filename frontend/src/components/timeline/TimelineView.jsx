import { formatDate } from '../../utils/formatters';
import EventCard from './EventCard';

export default function TimelineView({ timeline, patient, onRefresh }) {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400 font-mono">
        <div className="text-6xl mb-4">📋</div>
        <p className="text-gray-600 font-semibold">No timeline events yet</p>
        <p className="text-sm text-gray-500 mt-2">Click "Add Event" to start the patient journey</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <div className="flex items-baseline gap-3 mb-4 pb-3 border-b border-gray-300">
        <h3 className="font-bold text-gray-900">PATIENT TIMELINE</h3>
        <span className="text-sm text-gray-600">
          {patient.name} | {timeline.length} events
        </span>
      </div>
      
      <div className="bg-white rounded border border-gray-200 p-4">
        {timeline.map((event, index) => (
          <EventCard
            key={event.id}
            event={event}
            isFirst={index === 0}
            isLast={index === timeline.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
