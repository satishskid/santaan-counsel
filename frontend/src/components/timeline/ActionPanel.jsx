import { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, ArrowRight, Send } from 'lucide-react';

export default function ActionPanel({ patient, timeline, activeCycle, onAddEvent }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Determine current situation
  const getCurrentSituation = () => {
    if (!timeline || timeline.length === 0) {
      return {
        status: 'new',
        title: 'New Patient - No Timeline Yet',
        description: 'Start documenting this patient\'s journey',
        urgency: 'low',
      };
    }

    const latestEvent = timeline[0];
    const cycleDay = activeCycle?.currentDay || 0;
    const phase = activeCycle?.currentPhase || 'planning';

    // High-anxiety situations
    if (latestEvent.reactionData?.anxiety_after >= 7) {
      return {
        status: 'alert',
        title: 'High Anxiety Detected',
        description: `Patient anxiety at ${latestEvent.reactionData.anxiety_after}/10 after last interaction`,
        urgency: 'high',
        action: 'Consider counseling session or doctor consultation',
      };
    }

    // Monitoring phase - regular scans needed
    if (phase === 'monitoring' && cycleDay >= 3) {
      const daysSinceLastScan = timeline.findIndex(e => 
        e.eventType.includes('monitoring_scan') || e.eventType.includes('baseline_scan')
      );
      
      if (daysSinceLastScan > 2 || daysSinceLastScan === -1) {
        return {
          status: 'pending',
          title: 'Monitoring Scan Due',
          description: `Cycle Day ${cycleDay} - Check follicle development`,
          urgency: 'medium',
          action: 'Schedule monitoring scan and hormone levels',
        };
      }
    }

    // Waiting for lab results
    if (latestEvent.eventType === 'fertilization_day1_report') {
      return {
        status: 'waiting',
        title: 'Embryo Development in Progress',
        description: 'Next update: Day 3 embryo development report',
        urgency: 'low',
        action: 'Monitor lab progress, prepare Day 3 update',
      };
    }

    return {
      status: 'normal',
      title: 'Treatment Progressing',
      description: `Last event: ${latestEvent.eventType.replace(/_/g, ' ')}`,
      urgency: 'low',
    };
  };

  // Get recommended next actions
  const getRecommendedActions = () => {
    if (!activeCycle) {
      return [
        { type: 'initial_consultation', label: 'Schedule Initial Consultation', priority: 'high' },
        { type: 'baseline_scan', label: 'Baseline Scan & Tests', priority: 'high' },
      ];
    }

    const cycleDay = activeCycle.currentDay || 0;
    const phase = activeCycle.currentPhase;
    const actions = [];

    // Monitoring phase actions
    if (phase === 'monitoring') {
      if (cycleDay >= 3 && cycleDay <= 5) {
        actions.push({ type: 'monitoring_scan_day3', label: `Day ${cycleDay} Monitoring Scan`, priority: 'high' });
      } else if (cycleDay >= 6 && cycleDay <= 8) {
        actions.push({ type: 'monitoring_scan_day5', label: `Day ${cycleDay} Monitoring Scan`, priority: 'high' });
        actions.push({ type: 'dose_adjustment', label: 'Review & Adjust Medication', priority: 'medium' });
      } else if (cycleDay >= 9) {
        actions.push({ type: 'monitoring_scan_day7', label: `Day ${cycleDay} Monitoring Scan`, priority: 'high' });
      }
    }

    // Lab phase actions
    if (phase === 'lab') {
      const latestEvent = timeline?.[0];
      if (!latestEvent || !latestEvent.eventType.includes('fertilization')) {
        actions.push({ type: 'fertilization_day1_report', label: 'Fertilization Report (Day 1)', priority: 'high' });
      } else if (!latestEvent.eventType.includes('day3')) {
        actions.push({ type: 'embryo_development_day3', label: 'Embryo Development (Day 3)', priority: 'high' });
      } else if (!latestEvent.eventType.includes('day5')) {
        actions.push({ type: 'embryo_development_day5', label: 'Embryo Development (Day 5)', priority: 'high' });
      }
    }

    // Always available
    actions.push({ type: 'patient_inquiry', label: 'Log Patient Question/Call', priority: 'low' });
    actions.push({ type: 'counseling_session', label: 'Schedule Counseling', priority: 'low' });

    return actions;
  };

  const situation = getCurrentSituation();
  const recommendedActions = getRecommendedActions();

  const urgencyColors = {
    high: 'bg-red-50 border-red-200 text-red-800',
    medium: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    low: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const statusIcons = {
    alert: <AlertCircle className="w-5 h-5 text-red-600" />,
    pending: <Clock className="w-5 h-5 text-yellow-600" />,
    waiting: <Clock className="w-5 h-5 text-blue-600" />,
    normal: <CheckCircle className="w-5 h-5 text-green-600" />,
    new: <AlertCircle className="w-5 h-5 text-gray-600" />,
  };

  return (
    <div className="space-y-4">
      {/* Current Situation Card */}
      <div className={`border-2 rounded-lg p-4 ${urgencyColors[situation.urgency]}`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            {statusIcons[situation.status]}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm mb-1">{situation.title}</h3>
            <p className="text-sm mb-2">{situation.description}</p>
            {situation.action && (
              <div className="flex items-center gap-2 text-sm font-semibold">
                <ArrowRight className="w-4 h-4" />
                <span>{situation.action}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Patient Context Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-sm text-gray-900 mb-3">Quick Context</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Current Anxiety:</span>
            <span className={`font-semibold ${
              patient.currentAnxietyLevel >= 7 ? 'text-red-600' :
              patient.currentAnxietyLevel >= 4 ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {patient.currentAnxietyLevel}/10
            </span>
          </div>
          {activeCycle && (
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">Cycle Day:</span>
                <span className="font-semibold text-gray-900">Day {activeCycle.currentDay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phase:</span>
                <span className="font-semibold text-gray-900 capitalize">{activeCycle.currentPhase}</span>
              </div>
            </>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Total Events:</span>
            <span className="font-semibold text-gray-900">{timeline?.length || 0}</span>
          </div>
          {patient.preferences && (
            <div className="pt-2 border-t border-gray-300">
              <span className="text-gray-600 text-xs">Preferences:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {Object.entries(patient.preferences).map(([key, value]) => (
                  <span key={key} className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                    {key}: {value.toString()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-sm text-gray-900 mb-3">Recommended Actions</h3>
        <div className="space-y-2">
          {recommendedActions.map((action, i) => (
            <button
              key={i}
              onClick={() => onAddEvent(action.type)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all hover:border-blue-400 hover:bg-blue-50 ${
                action.priority === 'high' 
                  ? 'border-blue-300 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-900">{action.label}</div>
                  {action.priority === 'high' && (
                    <div className="text-xs text-blue-600 font-semibold mt-1">Recommended now</div>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Communication Templates */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-sm text-gray-900 mb-3">Quick Communication</h3>
        <div className="space-y-2">
          <button className="w-full p-3 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition text-left">
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4 text-green-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">Send Appointment Reminder</div>
                <div className="text-xs text-gray-600">WhatsApp • English/Hindi</div>
              </div>
            </div>
          </button>
          <button className="w-full p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition text-left">
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4 text-blue-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">Share Test Results</div>
                <div className="text-xs text-gray-600">WhatsApp • with explanation</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
