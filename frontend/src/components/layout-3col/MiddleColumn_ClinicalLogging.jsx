import { useState } from 'react';
import { Stethoscope, Plus } from 'lucide-react';

const SOAP_SECTIONS = ['Subjective', 'Objective', 'Assessment', 'Plan'];

const META_PROMPTS = {
  Subjective: [
    { emoji: '😊', label: 'Feeling Good', text: 'Patient reports feeling well with no discomfort' },
    { emoji: '😰', label: 'Anxious', text: 'Patient expressing anxiety about treatment progress' },
    { emoji: '🤕', label: 'Pain/Discomfort', text: 'Patient reports mild abdominal discomfort' },
    { emoji: '💊', label: 'Medication Adherence', text: 'Patient confirms medication taken as prescribed' },
    { emoji: '❓', label: 'Has Questions', text: 'Patient has questions about next steps' },
  ],
  Objective: [
    { emoji: '🔬', label: 'Normal Scan', text: 'E2: [value] pg/mL | [n] follicles ([size]mm) | Lining: [value]mm' },
    { emoji: '📊', label: 'Good Response', text: 'Good ovarian response with [n] growing follicles' },
    { emoji: '⚠️', label: 'Slow Response', text: 'Slower than expected response, [n] follicles' },
    { emoji: '💉', label: 'Blood Work', text: 'E2: [value] | LH: [value] | P4: [value]' },
    { emoji: '🥚', label: 'Egg Count', text: 'Retrieved [n] eggs, [n] mature (MII)' },
  ],
  Assessment: [
    { emoji: '✅', label: 'On Track', text: 'Cycle progressing as expected' },
    { emoji: '📈', label: 'Good Progress', text: 'Excellent follicular development, ready for next phase' },
    { emoji: '⏸️', label: 'Need to Wait', text: 'Need more time for follicles to mature' },
    { emoji: '🔄', label: 'Adjust Meds', text: 'Plan to adjust medication dosage' },
    { emoji: '🎯', label: 'Ready for Trigger', text: 'Follicles ready, trigger shot tonight' },
  ],
  Plan: [
    { emoji: '📅', label: 'Next Scan', text: 'Continue current medications. Next scan in 2-3 days' },
    { emoji: '💉', label: 'Trigger Tonight', text: 'Trigger shot tonight at [time]. OPU scheduled for [date]' },
    { emoji: '🏥', label: 'OPU Scheduled', text: 'OPU scheduled for [date] at [time]. NPO after midnight' },
    { emoji: '🧬', label: 'Await Embryo Report', text: 'Await fertilization report. Transfer planned for Day [n]' },
    { emoji: '📞', label: 'Follow-up Call', text: 'Nurse to call patient with updates' },
  ],
};

export default function MiddleColumn_ClinicalLogging({ patientId, activeCycle, onEventCreated }) {
  const [soapNote, setSoapNote] = useState({
    subjective: '',
    objective: '',
    assessment: '',
    plan: '',
  });
  const [activeSection, setActiveSection] = useState('Objective');
  const [generating, setGenerating] = useState(false);

  const addChipToSection = (section, text) => {
    const sectionKey = section.toLowerCase();
    const currentText = soapNote[sectionKey];
    const newText = currentText ? `${currentText}\n• ${text}` : `• ${text}`;
    setSoapNote({ ...soapNote, [sectionKey]: newText });
  };

  const generateEvent = async () => {
    if (!soapNote.objective && !soapNote.assessment) {
      alert('Please add at least Objective and Assessment notes');
      return;
    }

    setGenerating(true);
    try {
      const clinicalNote = `SUBJECTIVE:\n${soapNote.subjective || 'N/A'}\n\nOBJECTIVE:\n${soapNote.objective}\n\nASSESSMENT:\n${soapNote.assessment}\n\nPLAN:\n${soapNote.plan || 'N/A'}`;
      
      const response = await fetch('http://localhost:3000/api/timeline-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId,
          eventType: 'monitoring_scan', // Auto-detect based on content
          eventDate: new Date().toISOString(),
          cycleDay: activeCycle?.cycleDay || null,
          patientRecordText: soapNote.objective,
          summaryText: soapNote.assessment,
          soapNote: clinicalNote,
        }),
      });

      if (response.ok) {
        const event = await response.json();
        onEventCreated(event);
        // Reset form
        setSoapNote({
          subjective: '',
          objective: '',
          assessment: '',
          plan: '',
        });
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
                SOAP format with meta-prompt chips
              </p>
            </div>
          </div>
        </div>

        {/* SOAP Section Tabs */}
        <div className="flex gap-2 border-b pb-2" style={{ borderColor: 'var(--border-light)' }}>
          {SOAP_SECTIONS.map(section => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className="px-4 py-2 rounded-t-lg text-sm font-medium transition-colors"
              style={{
                background: activeSection === section ? 'var(--accent-action)' : 'transparent',
                color: activeSection === section ? 'white' : 'var(--text-secondary)',
              }}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Meta Prompt Chips */}
        <div className="claude-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-tertiary)' }}>
            Quick Add Chips:
          </p>
          <div className="flex flex-wrap gap-2">
            {META_PROMPTS[activeSection]?.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => addChipToSection(activeSection, chip.text)}
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

        {/* SOAP Note Editor */}
        <div className="space-y-4">
          {SOAP_SECTIONS.map(section => (
            <div key={section} className="claude-card p-4">
              <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {section}
                {['Objective', 'Assessment'].includes(section) && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>
              <textarea
                value={soapNote[section.toLowerCase()]}
                onChange={(e) => setSoapNote({ 
                  ...soapNote, 
                  [section.toLowerCase()]: e.target.value 
                })}
                placeholder={`Click chips above to add ${section.toLowerCase()} notes, or type manually...`}
                rows={6}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                style={{ 
                  borderColor: 'var(--border-medium)',
                  fontFamily: 'monospace',
                  lineHeight: 'var(--leading-relaxed)'
                }}
              />
            </div>
          ))}
        </div>

        {/* Generate Event Button */}
        <div className="sticky bottom-0 pt-4" style={{ background: 'var(--bg-canvas)' }}>
          <button
            onClick={generateEvent}
            disabled={generating || (!soapNote.objective && !soapNote.assessment)}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-base transition-colors"
            style={{
              background: generating || (!soapNote.objective && !soapNote.assessment) 
                ? 'var(--text-disabled)' 
                : 'var(--accent-success)',
              color: 'white',
              cursor: generating || (!soapNote.objective && !soapNote.assessment) ? 'not-allowed' : 'pointer'
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
