import { formatDate } from '../../utils/formatters';

const eventTypeColors = {
  initial_consultation: 'text-blue-600',
  baseline_scan: 'text-purple-600',
  medication_start: 'text-green-600',
  monitoring_scan_day3: 'text-indigo-600',
  monitoring_scan_day5: 'text-indigo-600',
  monitoring_scan_day7: 'text-indigo-600',
  dose_adjustment: 'text-yellow-600',
  fertilization_day1_report: 'text-pink-600',
  embryo_development_day3: 'text-pink-600',
  embryo_development_day5: 'text-pink-600',
  embryo_transfer_prep: 'text-teal-600',
  patient_inquiry: 'text-gray-600',
  counseling_session: 'text-orange-600',
};

export default function EventCard({ event, isFirst, isLast }) {
  const colorClass = eventTypeColors[event.eventType] || 'text-gray-600';
  
  const eventTitle = event.eventType
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const hasClinical = event.clinicalData && Object.keys(event.clinicalData).length > 0;
  const hasCounseling = event.counselingData && Object.keys(event.counselingData).length > 0;
  const hasReaction = event.reactionData && Object.keys(event.reactionData).length > 0;

  // Extract clinical data for compact display
  const getClinicalItems = () => {
    if (event.patientRecordText) {
      return event.patientRecordText.split('\n').filter(line => line.trim());
    }
    if (hasClinical) {
      return Object.entries(event.clinicalData).map(([key, value]) => `${key}: ${value}`);
    }
    return [];
  };

  const clinicalItems = getClinicalItems();
  const connector = isLast ? '└─' : '├─';
  const continuer = isLast ? '   ' : '│  ';

  return (
    <div className="font-mono text-sm leading-relaxed">
      {/* Event Header */}
      <div className="flex items-baseline gap-2">
        <span className="text-gray-400">{connector}</span>
        <span className="font-bold text-gray-900">
          {formatDate(event.eventDate).toUpperCase()}:
        </span>
        <span className={`font-semibold ${colorClass}`}>
          {eventTitle}
        </span>
        <span className="text-gray-500 text-xs">
          ({event.creator?.assignedToName || event.staffRole || 'Staff'})
        </span>
        {event.cycleDay && (
          <span className="text-xs text-blue-600 font-semibold">
            [Day {event.cycleDay}]
          </span>
        )}
      </div>

      {/* Clinical Data Items */}
      {clinicalItems.map((item, i) => (
        <div key={i} className="flex items-baseline gap-2 ml-0">
          <span className="text-gray-400">{continuer}├─</span>
          <span className="text-gray-700">{item}</span>
        </div>
      ))}

      {/* Summary */}
      {event.summaryText && (
        <div className="flex items-baseline gap-2 ml-0">
          <span className="text-gray-400">{continuer}├─</span>
          <span className="text-gray-600 italic">{event.summaryText}</span>
        </div>
      )}

      {/* Counseling Note */}
      {hasCounseling && event.counselingData.topics_discussed && (
        <div className="flex items-baseline gap-2 ml-0">
          <span className="text-gray-400">{continuer}└─</span>
          <span className="text-orange-600">Counseling:</span>
          <span className="text-gray-700">
            {event.counselingData.topics_discussed.join(', ')}
          </span>
        </div>
      )}

      {/* Reaction Indicators */}
      {hasReaction && (
        <div className="flex items-baseline gap-2 ml-0">
          <span className="text-gray-400">{continuer}└─</span>
          <span className="text-purple-600">Reaction:</span>
          <span className="text-gray-700">
            {event.reactionData.understanding && `Understanding: ${event.reactionData.understanding}`}
            {event.reactionData.anxiety_before !== undefined && event.reactionData.anxiety_after !== undefined && 
              ` | Anxiety: ${event.reactionData.anxiety_before}→${event.reactionData.anxiety_after}/10`}
            {event.reactionData.emotional_response && ` | ${event.reactionData.emotional_response}`}
          </span>
        </div>
      )}

      {/* Spacing between events */}
      {!isLast && <div className="text-gray-400">{continuer}</div>}
    </div>
  );
}
