import { Calendar, Activity, Plus } from 'lucide-react';

export default function PatientSidebar({ patient, activeCycle, onAddEvent }) {
  const getStageInfo = () => {
    if (!activeCycle) return { stage: 'Planning', next: 'Initial consultation' };
    
    const day = activeCycle.cycleDay || 0;
    if (day === 0) return { stage: 'Planning', next: 'Baseline scan' };
    if (day <= 2) return { stage: 'Baseline', next: 'Medication start' };
    if (day <= 12) return { stage: 'Stimulation', next: 'Monitoring scan' };
    if (day <= 14) return { stage: 'Trigger', next: 'OPU preparation' };
    if (day <= 16) return { stage: 'OPU', next: 'Fertilization report' };
    if (day <= 20) return { stage: 'Lab Watch', next: 'Embryo update' };
    return { stage: 'Transfer Prep', next: 'Embryo transfer' };
  };

  const stageInfo = getStageInfo();

  return (
    <div className="space-y-6">
      {/* Patient Overview */}
      <div className="claude-card p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-tertiary)' }}>
          📊 Overview
        </h3>
        
        <div className="space-y-2">
          <div>
            <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              {patient.firstName} {patient.lastName}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {patient.mrNumber}
            </p>
          </div>

          {activeCycle && (
            <>
              <hr className="claude-divider my-3" />
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Cycle:</span>
                  <span style={{ color: 'var(--text-primary)' }}>#{activeCycle.cycleNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Day:</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {activeCycle.cycleDay || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Stage:</span>
                  <span className="font-semibold" style={{ color: 'var(--accent-action)' }}>
                    {stageInfo.stage}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Next Actions */}
      <div className="claude-card p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-tertiary)' }}>
          🎯 Next Actions
        </h3>
        
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Activity className="w-4 h-4 mt-0.5" style={{ color: 'var(--text-tertiary)' }} />
            <div>
              <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Due Today:</p>
              <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{stageInfo.next}</p>
            </div>
          </div>

          {activeCycle && activeCycle.cycleDay >= 3 && (
            <div className="flex items-start gap-2 mt-3">
              <Calendar className="w-4 h-4 mt-0.5" style={{ color: 'var(--text-tertiary)' }} />
              <div>
                <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Upcoming:</p>
                <ul className="text-sm space-y-1 mt-1" style={{ color: 'var(--text-primary)' }}>
                  <li>• Day {(activeCycle.cycleDay || 0) + 2}: Scan</li>
                  <li>• Day {(activeCycle.cycleDay || 0) + 4}: Review</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Add */}
      <div className="claude-card p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-tertiary)' }}>
          📋 Quick Add
        </h3>
        
        <div className="space-y-2">
          <button
            onClick={() => onAddEvent('monitoring_scan')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors"
            style={{
              background: 'var(--bg-subtle)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-medium)'
            }}
          >
            <Plus className="w-4 h-4" />
            Add Scan
          </button>
          <button
            onClick={() => onAddEvent('patient_inquiry')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors"
            style={{
              background: 'var(--bg-subtle)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-medium)'
            }}
          >
            <Plus className="w-4 h-4" />
            Log Call
          </button>
          <button
            onClick={() => onAddEvent('counseling_session')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors"
            style={{
              background: 'var(--bg-subtle)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-medium)'
            }}
          >
            <Plus className="w-4 h-4" />
            Counseling
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="claude-card p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-tertiary)' }}>
          📊 Stats
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>AMH:</span>
            <span style={{ color: 'var(--text-primary)' }}>{patient.amh || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Previous Cycles:</span>
            <span style={{ color: 'var(--text-primary)' }}>{patient.previousCycles || 0}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Baseline Anxiety:</span>
            <span style={{ color: 'var(--text-primary)' }}>{patient.baselineAnxiety || 5}/10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
