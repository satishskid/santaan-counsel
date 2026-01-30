import { useState } from 'react';
import { Stethoscope, Plus, Trash2 } from 'lucide-react';

const META_PROMPTS = {
  Subjective: [
    { emoji: '😊', label: 'Feeling Good', text: 'Patient reports feeling well with no discomfort.' },
    { emoji: '😰', label: 'Anxious', text: 'Patient expressing anxiety about treatment progress.' },
    { emoji: '🤕', label: 'Pain/Discomfort', text: 'Patient reports mild abdominal discomfort.' },
    { emoji: '💊', label: 'Medication Adherence', text: 'Patient confirms medication taken as prescribed.' },
    { emoji: '❓', label: 'Has Questions', text: 'Patient has questions about next steps.' },
  ],
  Objective: [
    { emoji: '🔬', label: 'Normal Scan', text: 'E2: [value] pg/mL, [n] follicles ([size]mm), Lining: [value]mm.' },
    { emoji: '📊', label: 'Good Response', text: 'Good ovarian response with [n] growing follicles.' },
    { emoji: '⚠️', label: 'Slow Response', text: 'Slower than expected response, [n] follicles observed.' },
    { emoji: '💉', label: 'Blood Work', text: 'E2: [value], LH: [value], P4: [value].' },
    { emoji: '🥚', label: 'Egg Count', text: 'Retrieved [n] eggs, [n] mature (MII).' },
  ],
  Assessment: [
    { emoji: '✅', label: 'On Track', text: 'Cycle progressing as expected.' },
    { emoji: '📈', label: 'Good Progress', text: 'Excellent follicular development, ready for next phase.' },
    { emoji: '⏸️', label: 'Need to Wait', text: 'Need more time for follicles to mature.' },
    { emoji: '🔄', label: 'Adjust Meds', text: 'Plan to adjust medication dosage.' },
    { emoji: '🎯', label: 'Ready for Trigger', text: 'Follicles ready, trigger shot tonight.' },
  ],
  Plan: [
    { emoji: '📅', label: 'Next Scan', text: 'Continue current medications, next scan in 2-3 days.' },
    { emoji: '💉', label: 'Trigger Tonight', text: 'Trigger shot tonight at [time], OPU scheduled for [date].' },
    { emoji: '🏥', label: 'OPU Scheduled', text: 'OPU scheduled for [date] at [time], NPO after midnight.' },
    { emoji: '🧬', label: 'Await Embryo Report', text: 'Await fertilization report, transfer planned for Day [n].' },
    { emoji: '📞', label: 'Follow-up Call', text: 'Nurse to call patient with updates.' },
  ],
};

export default function MiddleColumn_ClinicalLogging({ patientId, activeCycle, onEventCreated }) {
  const [clinicalNote, setClinicalNote] = useState('');
  const [generating, setGenerating] = useState(false);

  const addChipText = (text) => {
    const newNote = clinicalNote ? `${clinicalNote} ${text}` : text;
    setClinicalNote(newNote);
  };

  const clearNote = () => {
    setClinicalNote('');
  };

  const generateEvent = async () => {
    if (!clinicalNote.trim()) {
      alert('Please add clinical notes by clicking chips or typing');
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch('http://localhost:3000/api/timeline-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId,
          eventType: 'monitoring_scan', // Auto-detect based on content
          eventDate: new Date().toISOString(),
          cycleDay: activeCycle?.cycleDay || null,
          patientRecordText: clinicalNote,
          summaryText: clinicalNote.substring(0, 200), // First 200 chars as summary
          soapNote: clinicalNote,
        }),
      });

      if (response.ok) {
        const event = await response.json();
        onEventCreated(event);
        setClinicalNote(''); // Reset
      }
    } catch (error) {
      console.error('Failed to create event:', error);
      alert('Failed to save clinical note');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="h-screen overflow-y-auto p-6" style={{ background: 'var(--bg-canvas)' }}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Stethoscope className="w-6 h-6" style={{ color: 'var(--accent-action)' }} />
            <div>
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                Clinical Note
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Click chips to build note paragraph
              </p>
            </div>
          </div>
        </div>

        {/* All Meta Prompt Chips - Organized by SOAP */}
        <div className="claude-card p-5 space-y-4">
          {/* Subjective Chips */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-tertiary)' }}>
              💭 Subjective (Patient Says)
            </p>
            <div className="flex flex-wrap gap-2">
              {META_PROMPTS.Subjective.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => addChipText(chip.text)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <span>{chip.emoji}</span>
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Objective Chips */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-tertiary)' }}>
              🔬 Objective (Clinical Findings)
            </p>
            <div className="flex flex-wrap gap-2">
              {META_PROMPTS.Objective.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => addChipText(chip.text)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <span>{chip.emoji}</span>
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Assessment Chips */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-tertiary)' }}>
              📊 Assessment (Clinical Judgment)
            </p>
            <div className="flex flex-wrap gap-2">
              {META_PROMPTS.Assessment.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => addChipText(chip.text)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <span>{chip.emoji}</span>
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Plan Chips */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-tertiary)' }}>
              📋 Plan (Next Steps)
            </p>
            <div className="flex flex-wrap gap-2">
              {META_PROMPTS.Plan.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => addChipText(chip.text)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-medium)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <span>{chip.emoji}</span>
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Single Clinical Note Editor */}
        <div className="claude-card p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Clinical Note Paragraph
            </label>
            {clinicalNote && (
              <button
                onClick={clearNote}
                className="flex items-center gap-1 px-2 py-1 rounded text-xs"
                style={{
                  background: 'var(--bg-subtle)',
                  color: 'var(--text-secondary)'
                }}
              >
                <Trash2 className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
          <textarea
            value={clinicalNote}
            onChange={(e) => setClinicalNote(e.target.value)}
            placeholder="Click chips above to build clinical note, or type manually..."
            rows={12}
            className="w-full px-4 py-3 border rounded-lg text-sm"
            style={{ 
              borderColor: 'var(--border-medium)',
              fontFamily: 'system-ui',
              lineHeight: 'var(--leading-relaxed)'
            }}
          />
        </div>

        {/* Generate Event Button */}
        <div className="sticky bottom-0 pt-4" style={{ background: 'var(--bg-canvas)' }}>
          <button
            onClick={generateEvent}
            disabled={generating || !clinicalNote.trim()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-base transition-colors"
            style={{
              background: generating || !clinicalNote.trim()
                ? 'var(--text-disabled)' 
                : 'var(--accent-success)',
              color: 'white',
              cursor: generating || !clinicalNote.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            <Plus className="w-5 h-5" />
            {generating ? 'Generating Event & Actions...' : 'Log Note → Generate Event & Actions'}
          </button>
        </div>
      </div>
    </div>
  );
}
