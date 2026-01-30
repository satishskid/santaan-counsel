import { useState } from 'react';
import { Calendar, AlertCircle, Activity } from 'lucide-react';

export default function PatientProfile({ patient, activeCycle, timeline = [] }) {
  const [expandedVisit, setExpandedVisit] = useState(null);

  const calculateDuration = () => {
    if (!patient.firstVisitDate) return 'New patient';
    const months = Math.floor((new Date() - new Date(patient.firstVisitDate)) / (1000 * 60 * 60 * 24 * 30));
    return `${months} months`;
  };

  const getPreviousVisits = () => {
    return timeline.filter(event => 
      ['consultation', 'monitoring_scan', 'baseline_scan', 'opu', 'embryo_transfer'].includes(event.eventType)
    ).reverse();
  };

  const getTodayEvents = () => {
    const today = new Date().toDateString();
    return timeline.filter(event => 
      new Date(event.eventDate).toDateString() === today
    );
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return timeline.filter(event => 
      new Date(event.eventDate) > today
    ).slice(0, 3);
  };

  const isSignificantEvent = (eventType) => {
    return ['opu', 'embryo_transfer', 'trigger_administration', 'baseline_scan'].includes(eventType);
  };

  const previousVisits = getPreviousVisits();
  const todayEvents = getTodayEvents();
  const upcomingEvents = getUpcomingEvents();

  return (
    <div className="h-screen overflow-y-auto p-4 space-y-6" style={{ background: 'var(--bg-canvas)' }}>
      {/* Patient Header - Prominent Summary */}
      <div className="claude-card p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              {patient.firstName} {patient.lastName}
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              MR# {patient.mrNumber}
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold" style={{ color: 'var(--accent-action)' }}>
              {patient.age || 32}<span className="text-sm font-normal">yrs</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--text-tertiary)' }}>
              Attempts
            </p>
            <p className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
              {patient.previousCycles || 0}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--text-tertiary)' }}>
              Trying Since
            </p>
            <p className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
              {calculateDuration()}
            </p>
          </div>
        </div>

        <hr className="claude-divider" />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Primary Diagnosis:</span>
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              {patient.primaryDiagnosis || 'PCOS + Male Factor'}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>AMH:</span>
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              {patient.amh || '2.8'} ng/mL
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>AFC:</span>
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              {patient.afc || '12'}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Partner Age:</span>
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              {patient.partnerAge || '35'} yrs
            </span>
          </div>
        </div>
      </div>

      {/* Current Cycle History Paragraph */}
      {activeCycle && (
        <div className="claude-card p-6">
          <h3 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-tertiary)' }}>
            📖 Current Cycle Story
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Cycle #{activeCycle.cycleNumber} started on <strong>{new Date(activeCycle.startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</strong>. 
            Currently on <strong>Day {activeCycle.cycleDay || 0}</strong> in <strong>{activeCycle.phase || 'Stimulation'}</strong> phase.
            {activeCycle.protocol && ` Following ${activeCycle.protocol} protocol.`}
            {activeCycle.notes && ` ${activeCycle.notes}`}
          </p>
        </div>
      )}

      {/* Previous Visits - Vertical Timeline */}
      <div className="claude-card p-6">
        <h3 className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: 'var(--text-tertiary)' }}>
          📅 Visit History
        </h3>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-3 top-0 bottom-0 w-0.5" style={{ background: 'var(--border-medium)' }}></div>
          
          <div className="space-y-4">
            {previousVisits.map((visit, idx) => (
              <div key={visit.id} className="relative pl-8">
                {/* Dot on timeline */}
                <div 
                  className="absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center"
                  style={{ 
                    background: isSignificantEvent(visit.eventType) ? 'var(--accent-action)' : 'var(--bg-surface)',
                    borderColor: isSignificantEvent(visit.eventType) ? 'var(--accent-action)' : 'var(--border-medium)'
                  }}
                >
                  {isSignificantEvent(visit.eventType) && (
                    <span className="text-xs">🔥</span>
                  )}
                </div>

                {/* Visit Card */}
                <div 
                  onClick={() => setExpandedVisit(expandedVisit === visit.id ? null : visit.id)}
                  className="cursor-pointer transition-all"
                  style={{ 
                    background: expandedVisit === visit.id ? 'var(--bg-subtle)' : 'transparent',
                    padding: '8px',
                    borderRadius: '8px'
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                      {visit.eventType.replace(/_/g, ' ').toUpperCase()}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                      Day {visit.cycleDay}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {new Date(visit.eventDate).toLocaleDateString('en-IN', { 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>

                  {/* Expanded Summary */}
                  {expandedVisit === visit.id && visit.summaryText && (
                    <div className="mt-2 pt-2 border-t text-xs" style={{ borderColor: 'var(--border-light)', color: 'var(--text-secondary)' }}>
                      <p className="italic">"{visit.summaryText}"</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CURRENT / NOW Card */}
      <div className="claude-card p-6 border-2" style={{ borderColor: 'var(--accent-action)' }}>
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-5 h-5" style={{ color: 'var(--accent-action)' }} />
          <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--accent-action)' }}>
            Today
          </h3>
        </div>
        
        {todayEvents.length > 0 ? (
          <div className="space-y-2">
            {todayEvents.map(event => (
              <div key={event.id} className="text-sm">
                <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  {event.eventType.replace(/_/g, ' ').toUpperCase()}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {event.summaryText || 'No summary'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            No events scheduled for today
          </p>
        )}
      </div>

      {/* Important Future Events */}
      {upcomingEvents.length > 0 && (
        <div className="claude-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
            <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>
              Upcoming
            </h3>
          </div>
          
          <div className="space-y-2">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex justify-between items-start text-sm">
                <div>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {event.eventType.replace(/_/g, ' ').toUpperCase()}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    Day {event.cycleDay}
                  </p>
                </div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {new Date(event.eventDate).toLocaleDateString('en-IN', { 
                    month: 'short', 
                    day: 'numeric'
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
