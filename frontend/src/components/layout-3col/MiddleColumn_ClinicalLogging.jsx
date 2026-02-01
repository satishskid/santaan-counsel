import { useState } from 'react';
import { Stethoscope, Plus, Trash2, ChevronDown } from 'lucide-react';
import ProtocolScheduleEditor from '../protocols/ProtocolScheduleEditor';
import api from '../../utils/api';

// Event types that drive the entire system
const EVENT_TYPES = [
  { value: 'consultation', label: '👨‍⚕️ Consultation' },
  { value: 'baseline_scan', label: '📊 Baseline Scan' },
  { value: 'monitoring_scan', label: '🔬 Monitoring Scan' },
  { value: 'trigger_administration', label: '💉 Trigger Shot' },
  { value: 'opu_pre', label: '🏥 Pre-OPU' },
  { value: 'opu', label: '🥚 OPU (Egg Retrieval)' },
  { value: 'fertilization_report', label: '🧬 Fertilization Report' },
  { value: 'embryo_update', label: '🔬 Embryo Update' },
  { value: 'embryo_transfer', label: '🌱 Embryo Transfer' },
  { value: 'consent_signing', label: '📝 Consent Signing' },
  { value: 'payment', label: '💰 Payment' },
  { value: 'counseling_clinical', label: '🗣️ Clinical Counseling' },
  { value: 'counseling_emotional', label: '💭 Emotional Counseling' },
  { value: 'counseling_financial', label: '💵 Financial Counseling' },
];

// Comprehensive chip system - organized by EVENT TYPE and ROLE
const CHIPS_BY_EVENT = {
  consultation: {
    doctor: [
      { emoji: '📋', label: 'History Taken', text: 'Detailed medical and fertility history obtained.' },
      { emoji: '🔍', label: 'Examination Done', text: 'Physical examination completed.' },
      { emoji: '📊', label: 'Reports Reviewed', text: 'Previous reports and investigations reviewed.' },
      { emoji: '💊', label: 'Protocol Decided', text: 'Treatment protocol: [protocol name].' },
      { emoji: '📅', label: 'Timeline Discussed', text: 'Treatment timeline and milestones explained to patient.' },
    ],
    counselor: [
      { emoji: '🗣️', label: 'Procedure Explained', text: 'IVF procedure steps explained in detail.' },
      { emoji: '📈', label: 'Success Rates', text: 'Success rates and realistic expectations discussed.' },
      { emoji: '⚠️', label: 'Risks Explained', text: 'Potential risks and complications explained.' },
      { emoji: '💰', label: 'Cost Discussed', text: 'Treatment costs and payment options discussed.' },
    ],
  },
  
  baseline_scan: {
    doctor: [
      { emoji: '🔬', label: 'AFC Count', text: 'AFC: [n] follicles (R: [n], L: [n]).' },
      { emoji: '📏', label: 'Lining Measured', text: 'Endometrial thickness: [value]mm.' },
      { emoji: '👀', label: 'Ovaries Normal', text: 'Both ovaries normal, no cysts.' },
      { emoji: '⚠️', label: 'Cyst Found', text: 'Cyst observed: [size]mm, [location].' },
      { emoji: '✅', label: 'Cleared to Start', text: 'Baseline scan normal, cleared to start stimulation.' },
      { emoji: '🟣', label: 'Start Antagonist 150', text: 'Starting Antagonist 150 IU protocol', isProtocol: true, protocolId: 'protocol_antagonist_150' },
      { emoji: '🟣', label: 'Start Antagonist 225', text: 'Starting Antagonist 225 IU protocol', isProtocol: true, protocolId: 'protocol_antagonist_225' },
      { emoji: '🟣', label: 'Start Agonist Long', text: 'Starting Long Agonist protocol', isProtocol: true, protocolId: 'protocol_agonist_long' },
      { emoji: '🟣', label: 'Start Natural Cycle', text: 'Starting Natural Cycle protocol', isProtocol: true, protocolId: 'protocol_natural_cycle' },
    ],
    nurse: [
      { emoji: '💉', label: 'Meds Explained', text: 'Injection technique and medication schedule explained.' },
      { emoji: '📦', label: 'Meds Dispensed', text: 'Medications dispensed: [list].' },
      { emoji: '📅', label: 'Next Visit', text: 'Next monitoring scan scheduled for [date].' },
    ],
  },
  
  monitoring_scan: {
    doctor: [
      { emoji: '🥚', label: 'Follicle Count', text: '[n] follicles: [sizes] mm.' },
      { emoji: '📊', label: 'Good Response', text: 'Good ovarian response, multiple growing follicles.' },
      { emoji: '⚠️', label: 'Slow Response', text: 'Slower response than expected, dose adjustment considered.' },
      { emoji: '📏', label: 'Lining Check', text: 'Endometrial thickness: [value]mm, [pattern].' },
      { emoji: '🎯', label: 'Ready for Trigger', text: 'Lead follicles [size]mm, ready for trigger.' },
      { emoji: '⏸️', label: 'Continue Stims', text: 'Continue stimulation, rescan in [n] days.' },
    ],
    nurse: [
      { emoji: '💉', label: 'Blood Drawn', text: 'Blood sample collected for E2, LH, P4.' },
      { emoji: '💊', label: 'Dose Adjusted', text: 'Medication dose adjusted to [dosage].' },
      { emoji: '📋', label: 'Instructions Given', text: 'Updated medication schedule provided.' },
    ],
  },
  
  trigger_administration: {
    doctor: [
      { emoji: '💉', label: 'Trigger Ordered', text: 'Trigger shot: [medication] [dosage] at [time].' },
      { emoji: '🏥', label: 'OPU Scheduled', text: 'OPU scheduled for [date] at [time].' },
      { emoji: '⏰', label: 'Timing Critical', text: 'Trigger timing: exactly [time], no delay.' },
    ],
    nurse: [
      { emoji: '📞', label: 'Patient Called', text: 'Patient called and trigger instructions confirmed.' },
      { emoji: '💉', label: 'Trigger Given', text: 'Trigger injection administered in clinic.' },
      { emoji: '📋', label: 'NPO Instructions', text: 'NPO after midnight instructions given for OPU.' },
      { emoji: '🚗', label: 'Transport Arranged', text: 'Patient confirmed transport arrangements for OPU day.' },
    ],
  },
  
  opu_pre: {
    nurse: [
      { emoji: '✅', label: 'NPO Confirmed', text: 'NPO status confirmed since midnight.' },
      { emoji: '📝', label: 'Consent Verified', text: 'OPU consent form signed and verified.' },
      { emoji: '💰', label: 'Payment Done', text: 'OPU payment cleared: ₹[amount].' },
      { emoji: '💉', label: 'IV Started', text: 'IV line established, patient prepared.' },
      { emoji: '👗', label: 'Changed to Gown', text: 'Patient changed to hospital gown.' },
      { emoji: '💊', label: 'Pre-meds Given', text: 'Pre-medications administered as per protocol.' },
      { emoji: '⏰', label: 'Ready for OT', text: 'Patient ready for OT, waiting for doctor.' },
    ],
    counselor: [
      { emoji: '😌', label: 'Anxiety Managed', text: 'Pre-procedure anxiety addressed, patient calm.' },
      { emoji: '🗣️', label: 'Post-OPU Explained', text: 'Post-OPU expectations and recovery explained.' },
    ],
  },
  
  opu: {
    doctor: [
      { emoji: '💉', label: 'Anesthesia Given', text: 'Conscious sedation administered, patient comfortable.' },
      { emoji: '🥚', label: 'Eggs Retrieved', text: 'Retrieved [n] oocytes (R: [n], L: [n]).' },
      { emoji: '✅', label: 'Procedure Smooth', text: 'OPU completed without complications.' },
      { emoji: '⚠️', label: 'Difficult Retrieval', text: 'Difficult access, [details].' },
      { emoji: '🩸', label: 'Minimal Bleeding', text: 'Minimal bleeding, good hemostasis.' },
    ],
    nurse: [
      { emoji: '💊', label: 'Recovery Meds', text: 'Post-OPU medications administered.' },
      { emoji: '📊', label: 'Vitals Stable', text: 'Vitals stable, patient recovering well.' },
      { emoji: '🍵', label: 'Fluids Given', text: 'Oral fluids started, tolerating well.' },
      { emoji: '🏠', label: 'Discharge Ready', text: 'Patient ready for discharge with instructions.' },
    ],
    embryologist: [
      { emoji: '🔬', label: 'Eggs Received', text: 'Received [n] oocytes in embryology lab.' },
      { emoji: '🥚', label: 'Maturity Assessed', text: 'Maturity: [n] MII, [n] MI, [n] GV.' },
      { emoji: '🧬', label: 'ICSI Planned', text: 'ICSI planned for [n] mature eggs.' },
      { emoji: '📞', label: 'Partner Called', text: 'Sperm sample requested from partner.' },
    ],
  },
  
  fertilization_report: {
    embryologist: [
      { emoji: '✅', label: 'Normal Fertilization', text: 'Normal fertilization: [n]/[n] eggs fertilized (2PN).' },
      { emoji: '⚠️', label: 'Low Fertilization', text: 'Lower than expected: [n]/[n] fertilized.' },
      { emoji: '🔬', label: 'Quality Good', text: 'Embryo quality: [grade], developing well.' },
      { emoji: '📅', label: 'Day 3 Update', text: 'Day 3 embryo update planned.' },
      { emoji: '🌱', label: 'Transfer Day Decided', text: 'Transfer planned for Day [3/5].' },
    ],
    counselor: [
      { emoji: '😊', label: 'Good News Shared', text: 'Fertilization results shared, patient happy.' },
      { emoji: '😟', label: 'Concerns Addressed', text: 'Lower numbers explained, expectations managed.' },
    ],
  },
  
  embryo_update: {
    embryologist: [
      { emoji: '🌱', label: 'Day 3 Update', text: 'Day 3: [n] embryos, [grades].' },
      { emoji: '🎯', label: 'Blastocyst Stage', text: 'Day 5: [n] blastocysts, [grades].' },
      { emoji: '❄️', label: 'Freezing Planned', text: '[n] embryos suitable for freezing.' },
      { emoji: '🔬', label: 'Quality Excellent', text: 'Excellent quality embryos for transfer.' },
      { emoji: '⚠️', label: 'Slow Development', text: 'Slower development, monitoring closely.' },
    ],
  },
  
  embryo_transfer: {
    doctor: [
      { emoji: '🌱', label: 'Embryo Loaded', text: 'Embryo(s) loaded: [grade] [stage].' },
      { emoji: '✅', label: 'Transfer Smooth', text: 'ET completed smoothly under ultrasound guidance.' },
      { emoji: '📏', label: 'Placement Good', text: 'Embryo placement: [distance]mm from fundus.' },
      { emoji: '🩸', label: 'No Bleeding', text: 'No bleeding, catheter clean.' },
    ],
    nurse: [
      { emoji: '💊', label: 'Progesterone Started', text: 'Luteal support started: [medication] [dose].' },
      { emoji: '🛏️', label: 'Bed Rest Given', text: 'Patient rested for [n] minutes post-transfer.' },
      { emoji: '📋', label: 'Instructions Given', text: 'Post-transfer precautions and medications explained.' },
      { emoji: '📅', label: 'Beta HCG Date', text: 'Beta HCG test scheduled for [date].' },
    ],
    counselor: [
      { emoji: '🙏', label: 'Positive Mindset', text: 'Encouraging words given, positive mindset reinforced.' },
      { emoji: '⚠️', label: 'TWW Explained', text: 'Two-week wait explained, activity restrictions discussed.' },
    ],
  },
  
  consent_signing: {
    nurse: [
      { emoji: '📝', label: 'Consent Explained', text: 'All consent forms explained in detail.' },
      { emoji: '✍️', label: 'Consent Signed', text: 'Consent forms signed by patient and partner.' },
      { emoji: '🗂️', label: 'Documents Filed', text: 'All consent documents filed in patient record.' },
    ],
  },
  
  payment: {
    receptionist: [
      { emoji: '💰', label: 'Payment Received', text: 'Payment received: ₹[amount] via [mode].' },
      { emoji: '🧾', label: 'Receipt Issued', text: 'Official receipt issued: #[receipt_no].' },
      { emoji: '📋', label: 'Balance Due', text: 'Balance due: ₹[amount], due by [date].' },
      { emoji: '💳', label: 'Insurance Claimed', text: 'Insurance claim submitted for ₹[amount].' },
    ],
  },
  
  counseling_clinical: {
    counselor: [
      { emoji: '🗣️', label: 'Procedure Steps', text: 'Detailed procedure steps and timeline explained.' },
      { emoji: '💊', label: 'Medications Explained', text: 'All medications, dosages, and side effects explained.' },
      { emoji: '📊', label: 'Success Rates', text: 'Age-specific success rates and realistic expectations discussed.' },
      { emoji: '⚠️', label: 'Risks & Complications', text: 'OHSS, multiple pregnancy, and other risks explained.' },
      { emoji: '🔄', label: 'Backup Plans', text: 'Discussed backup plans if cycle doesn\'t go as expected.' },
    ],
  },
  
  counseling_emotional: {
    counselor: [
      { emoji: '💭', label: 'Anxiety Assessed', text: 'Emotional state assessed, anxiety level: [1-10].' },
      { emoji: '🗣️', label: 'Concerns Heard', text: 'Patient concerns and fears heard and addressed.' },
      { emoji: '🤝', label: 'Support System', text: 'Family support system discussed and strengthened.' },
      { emoji: '😌', label: 'Coping Strategies', text: 'Coping strategies and relaxation techniques taught.' },
      { emoji: '📞', label: 'Follow-up Planned', text: 'Emotional support follow-up planned.' },
    ],
  },
  
  counseling_financial: {
    counselor: [
      { emoji: '💵', label: 'Cost Breakdown', text: 'Detailed cost breakdown provided: ₹[amount].' },
      { emoji: '📋', label: 'Payment Plans', text: 'Payment plan options discussed.' },
      { emoji: '🏦', label: 'Loan Options', text: 'Medical loan options and partners shared.' },
      { emoji: '💳', label: 'Insurance Coverage', text: 'Insurance coverage possibilities explored.' },
    ],
  },
};

export default function MiddleColumn_ClinicalLogging({ patientId, activeCycle, onEventCreated, onActionGenerated, currentUser }) {
  const [selectedEventType, setSelectedEventType] = useState('monitoring_scan');
  const [clinicalNote, setClinicalNote] = useState('');
  const [actionCards, setActionCards] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [expandedRoles, setExpandedRoles] = useState([]);
  const [showProtocolEditor, setShowProtocolEditor] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [protocols, setProtocols] = useState([]);

  const addChipText = async (chip) => {
    // Check if this is a protocol chip
    if (chip.isProtocol) {
      try {
        // Fetch the specific protocol
        const response = await api.get(`/protocols/${chip.protocolId}`);
        const protocol = response.data;
        setSelectedProtocol(protocol);
        setShowProtocolEditor(true);
      } catch (error) {
        console.error('Failed to load protocol:', error);
        alert('Failed to load protocol');
      }
      return;
    }
    
    // Regular chip - add text to note
    const newNote = clinicalNote ? `${clinicalNote} ${chip.text}` : chip.text;
    setClinicalNote(newNote);
    
    // IMMEDIATELY generate action card
    const actionCard = {
      id: Date.now(),
      eventType: selectedEventType,
      chipLabel: chip.label,
      chipEmoji: chip.emoji,
      noteText: chip.text,
      timestamp: new Date().toISOString(),
    };
    
    setActionCards(prev => [...prev, actionCard]);
    
    // Notify right column to fetch templates
    if (onActionGenerated) {
      onActionGenerated(actionCard);
    }
  };

  const clearNote = () => {
    setClinicalNote('');
  };

  const toggleRole = (role) => {
    setExpandedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const handleProtocolConfirm = async (startDate, customSchedule) => {
    try {
      setGenerating(true);
      
      // Generate action series from protocol
      const response = await api.post(`/protocols/${selectedProtocol.id}/generate`, {
        patientId,
        cycleId: activeCycle?.id,
        startDate,
        customSchedule,
      });
      
      const { series, actionsGenerated } = response.data;
      
      // Add protocol text to clinical note
      const protocolNote = `${selectedProtocol.name} protocol started from ${startDate}. ${actionsGenerated} actions scheduled.`;
      const newNote = clinicalNote ? `${clinicalNote} ${protocolNote}` : protocolNote;
      setClinicalNote(newNote);
      
      // Close editor
      setShowProtocolEditor(false);
      setSelectedProtocol(null);
      
      alert(`✅ Protocol scheduled! ${actionsGenerated} actions generated over ${selectedProtocol.duration} days.`);
    } catch (error) {
      console.error('Failed to generate protocol actions:', error);
      alert('Failed to generate protocol schedule');
    } finally {
      setGenerating(false);
    }
  };

  const getChipsForEvent = () => {
    return CHIPS_BY_EVENT[selectedEventType] || {};
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
          eventType: selectedEventType,
          eventDate: new Date().toISOString(),
          cycleDay: activeCycle?.cycleDay || null,
          patientRecordText: clinicalNote,
          summaryText: clinicalNote.substring(0, 200),
          soapNote: clinicalNote,
        }),
      });

      if (response.ok) {
        const event = await response.json();
        onEventCreated(event);
        setClinicalNote('');
      }
    } catch (error) {
      console.error('Failed to create event:', error);
      alert('Failed to save clinical note');
    } finally {
      setGenerating(false);
    }
  };

  // Alias for generateEvent to match UI button reference
  const completeEvent = generateEvent;

  const chipsByRole = getChipsForEvent();
  const roles = Object.keys(chipsByRole);

  return (
    <div className="h-screen overflow-y-auto p-6" style={{ background: 'var(--bg-canvas)' }}>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Stethoscope className="w-6 h-6" style={{ color: 'var(--accent-action)' }} />
            <div>
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                Clinical Documentation
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Timeline → Event → Role-specific chips
              </p>
            </div>
          </div>
        </div>

        {/* Event Type Selector */}
        <div className="claude-card p-4">
          <label className="block text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-tertiary)' }}>
            📅 Select Event Type:
          </label>
          <select
            value={selectedEventType}
            onChange={(e) => {
              setSelectedEventType(e.target.value);
              setExpandedRoles([]);
            }}
            className="w-full px-4 py-3 border rounded-lg text-base font-medium"
            style={{ 
              borderColor: 'var(--border-medium)',
              color: 'var(--text-primary)'
            }}
          >
            {EVENT_TYPES.map(event => (
              <option key={event.value} value={event.value}>
                {event.label}
              </option>
            ))}
          </select>
        </div>

        {/* Protocol Schedule Editor - Inline Expansion */}
        {showProtocolEditor && selectedProtocol && (
          <div className="claude-card p-6 border-2" style={{ borderColor: 'var(--accent-purple)' }}>
            <ProtocolScheduleEditor
              protocol={selectedProtocol}
              startDate={new Date().toISOString().split('T')[0]}
              onConfirm={handleProtocolConfirm}
              onCancel={() => {
                setShowProtocolEditor(false);
                setSelectedProtocol(null);
              }}
            />
          </div>
        )}

        {/* Role-Specific Chips - Organized by Role */}
        <div className="claude-card p-5 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>
            👥 Documentation by Role:
          </p>
          
          {roles.map(role => (
            <div key={role} className="border-b pb-4 last:border-0" style={{ borderColor: 'var(--border-light)' }}>
              <button
                onClick={() => toggleRole(role)}
                className="flex items-center justify-between w-full mb-2 p-2 rounded hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-semibold capitalize" style={{ color: 'var(--text-primary)' }}>
                  {role === 'doctor' && '👨‍⚕️ Doctor'}
                  {role === 'nurse' && '👩‍⚕️ Nurse'}
                  {role === 'embryologist' && '🔬 Embryologist'}
                  {role === 'counselor' && '🗣️ Counselor'}
                  {role === 'receptionist' && '💼 Receptionist'}
                  {!['doctor', 'nurse', 'embryologist', 'counselor', 'receptionist'].includes(role) && `${role}`}
                  <span className="text-xs ml-2" style={{ color: 'var(--text-tertiary)' }}>
                    ({chipsByRole[role].length} chips)
                  </span>
                </span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform ${expandedRoles.includes(role) ? 'rotate-180' : ''}`}
                  style={{ color: 'var(--text-secondary)' }}
                />
              </button>

              {expandedRoles.includes(role) && (
                <div className="flex flex-wrap gap-2 pl-2">
                  {chipsByRole[role].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => addChipText(chip)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                      style={{
                        background: chip.isProtocol ? 'linear-gradient(135deg, #9333EA, #7C3AED)' : 'var(--bg-subtle)',
                        border: chip.isProtocol ? '2px solid #9333EA' : '1px solid var(--border-medium)',
                        color: chip.isProtocol ? 'white' : 'var(--text-primary)',
                      }}
                    >
                      <span>{chip.emoji}</span>
                      <span>{chip.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {roles.length === 0 && (
            <p className="text-sm text-center py-4" style={{ color: 'var(--text-secondary)' }}>
              No chips available for this event type yet.
            </p>
          )}
        </div>

        {/* Single Clinical Note Editor */}
        <div className="claude-card p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Clinical Note
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
            placeholder="Click role sections above, then click chips to build clinical note, or type manually..."
            rows={12}
            className="w-full px-4 py-3 border rounded-lg text-sm"
            style={{ 
              borderColor: 'var(--border-medium)',
              fontFamily: 'system-ui',
              lineHeight: 'var(--leading-relaxed)'
            }}
          />
        </div>

        {/* Complete Event Button */}
        <div className="sticky bottom-0 pt-4" style={{ background: 'var(--bg-canvas)' }}>
          <div className="flex items-center justify-between mb-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
            <span>{actionCards.length} action card(s) generated</span>
            <span>Ready to finalize event</span>
          </div>
          <button
            onClick={completeEvent}
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
            {generating ? 'Saving to Timeline...' : 'Complete Event → Save to Timeline'}
          </button>
        </div>
      </div>
    </div>
  );
}
