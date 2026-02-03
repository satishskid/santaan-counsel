import { useState, useEffect } from 'react';
import { X, Loader2, AlertCircle, Send, FileText } from 'lucide-react';
import axios from 'axios';
import useAuthStore from '../../store/authStore';

const EVENT_TYPES = [
  { value: 'initial_consultation', label: 'Initial Consultation', icon: '👋' },
  { value: 'baseline_scan', label: 'Baseline Scan', icon: '🔬' },
  { value: 'medication_start', label: 'Medication Start', icon: '💊' },
  { value: 'monitoring_scan_day3', label: 'Monitoring Scan - Day 3', icon: '📊' },
  { value: 'monitoring_scan_day5', label: 'Monitoring Scan - Day 5', icon: '📊' },
  { value: 'monitoring_scan_day7', label: 'Monitoring Scan - Day 7', icon: '📊' },
  { value: 'dose_adjustment', label: 'Dose Adjustment', icon: '⚖️' },
  { value: 'fertilization_day1_report', label: 'Fertilization Day 1 Report', icon: '🧬' },
  { value: 'embryo_development_day3', label: 'Embryo Development - Day 3', icon: '🧬' },
  { value: 'embryo_development_day5', label: 'Embryo Development - Day 5', icon: '🧬' },
  { value: 'embryo_transfer_prep', label: 'Embryo Transfer Prep', icon: '🌟' },
  { value: 'patient_inquiry', label: 'Patient Inquiry', icon: '💬' },
  { value: 'counseling_session', label: 'Counseling Session', icon: '🤝' },
];

const UNDERSTANDING_LEVELS = ['clear', 'partial', 'confused'];
const EMOTIONAL_RESPONSES = ['calm', 'anxious', 'hopeful', 'worried', 'excited'];

// Clinical reference ranges for validation and visual indicators
const CLINICAL_RANGES = {
  E2: { unit: 'pg/mL', low: 200, normal: [200, 1000], high: 1000, desc: 'Estradiol' },
  P4: { unit: 'ng/mL', low: 1, normal: [0, 1], high: 2, desc: 'Progesterone' },
  FSH: { unit: 'mIU/mL', low: 3, normal: [3, 10], high: 10, desc: 'FSH' },
  LH: { unit: 'mIU/mL', low: 1, normal: [1, 12], high: 12, desc: 'LH' },
  AMH: { unit: 'ng/mL', low: 1, normal: [1, 4], high: 4, desc: 'AMH' },
  AFC: { unit: 'follicles', low: 5, normal: [5, 15], high: 15, desc: 'Antral Follicle Count' },
  Lining: { unit: 'mm', low: 7, normal: [7, 14], high: 14, desc: 'Endometrial Thickness' },
};

// Helper to determine value status
const getValueStatus = (marker, value) => {
  const range = CLINICAL_RANGES[marker];
  if (!range) return 'normal';
  const numValue = parseFloat(value);
  if (numValue < range.normal[0]) return 'low';
  if (numValue > range.normal[1]) return 'high';
  return 'normal';
};

// Quick-select common clinical values with range indicators
const QUICK_VALUES = {
  hormone: [
    { label: 'E2: 200', value: 'E2: 200', status: 'normal', hint: '(Normal - Early stim)' },
    { label: 'E2: 400', value: 'E2: 400', status: 'normal', hint: '(Normal - Mid stim)' },
    { label: 'E2: 650', value: 'E2: 650', status: 'normal', hint: '(Normal - Late stim)' },
    { label: 'E2: 1500', value: 'E2: 1500', status: 'high', hint: '(High - OHSS risk)' },
    { label: 'P4: 0.8', value: 'P4: 0.8', status: 'normal', hint: '(Normal - Pre-trigger)' },
    { label: 'P4: 2.5', value: 'P4: 2.5', status: 'high', hint: '(High - Early rise)' },
    { label: 'FSH: 7', value: 'FSH: 7', status: 'normal', hint: '(Normal)' },
    { label: 'FSH: 12', value: 'FSH: 12', status: 'high', hint: '(High - DOR concern)' },
    { label: 'LH: 5', value: 'LH: 5', status: 'normal', hint: '(Normal)' },
    { label: 'AMH: 2.5', value: 'AMH: 2.5', status: 'normal', hint: '(Good reserve)' },
  ],
  scan: [
    { label: 'AFC: 8', value: 'AFC: 8', status: 'normal', hint: '(Normal)' },
    { label: 'AFC: 12', value: 'AFC: 12', status: 'normal', hint: '(Good)' },
    { label: 'AFC: 18', value: 'AFC: 18', status: 'high', hint: '(High - PCOS?)' },
    { label: 'AFC: 4', value: 'AFC: 4', status: 'low', hint: '(Low - DOR)' },
    { label: 'Lining: 6mm', value: 'Lining: 6mm', status: 'low', hint: '(Thin)' },
    { label: 'Lining: 8mm', value: 'Lining: 8mm trilaminar', status: 'normal', hint: '(Optimal)' },
    { label: 'Lining: 10mm', value: 'Lining: 10mm trilaminar', status: 'normal', hint: '(Excellent)' },
    { label: 'Lead: 12mm', value: 'Lead follicle: 12mm', status: 'normal', hint: '(Growing)' },
    { label: 'Lead: 18mm', value: 'Lead follicle: 18mm', status: 'normal', hint: '(Mature)' },
    { label: '2-3 follicles', value: '2-3 follicles 14-16mm', status: 'normal', hint: '(Low response)' },
    { label: '5-7 follicles', value: '5-7 follicles 14-18mm', status: 'normal', hint: '(Good response)' },
    { label: '12+ follicles', value: '12+ follicles >14mm', status: 'high', hint: '(High - OHSS risk)' },
  ],
  medication: [
    { label: '75 IU', value: 'Dose: 75 IU daily', hint: '(Low dose)' },
    { label: '150 IU', value: 'Dose: 150 IU daily', hint: '(Standard)' },
    { label: '225 IU', value: 'Dose: 225 IU daily', hint: '(High dose)' },
    { label: '300 IU', value: 'Dose: 300 IU daily', hint: '(Very high - Poor responder)' },
    { label: 'Continue', value: 'Continue current dose', hint: '(No change)' },
    { label: 'Reduce ↓', value: 'Reduce dose by 25%', hint: '(OHSS prevention)' },
    { label: 'Increase ↑', value: 'Increase dose by 25%', hint: '(Slow response)' },
    { label: 'Trigger', value: 'Trigger planned - hCG 5000 IU', hint: '(Ready for OPU)' },
  ],
  embryo: [
    { label: '2PN', value: '2PN (normal fertilization)', hint: '(Day 1)' },
    { label: '4-cell', value: '4-cell, grade A', hint: '(Day 2 - Good)' },
    { label: '8-cell', value: '8-cell, grade A', hint: '(Day 3 - Excellent)' },
    { label: 'Morula', value: 'Morula, good quality', hint: '(Day 4)' },
    { label: 'Early Blast', value: 'Early blastocyst 3BB', hint: '(Day 5 - Good)' },
    { label: 'Blast 4AA', value: 'Blastocyst 4AA', hint: '(Day 5 - Top quality)' },
    { label: 'Blast 5AB', value: 'Expanded blast 5AB', hint: '(Day 6 - Excellent)' },
    { label: 'Arrested', value: 'Development arrested', hint: '(Stopped growing)' },
  ],
};

export default function AddEventModal({ isOpen, onClose, patient, cycleId, onSuccess }) {
  const { token } = useAuthStore();
  
  // Form state
  const [eventType, setEventType] = useState('');
  const [cycleDay, setCycleDay] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [summaryText, setSummaryText] = useState('');
  
  // Reaction capture state
  const [understanding, setUnderstanding] = useState('clear');
  const [emotionalResponse, setEmotionalResponse] = useState('calm');
  const [anxietyBefore, setAnxietyBefore] = useState(5);
  const [anxietyAfter, setAnxietyAfter] = useState(5);
  const [reactionNotes, setReactionNotes] = useState('');
  const [visualHelped, setVisualHelped] = useState(false);
  
  // Template & expanded text state
  const [expandedText, setExpandedText] = useState('');
  const [isExpanding, setIsExpanding] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1); // 1: Event details, 2: Reaction capture

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  // Fetch templates when event type changes
  useEffect(() => {
    if (eventType) {
      fetchTemplates(eventType);
    }
  }, [eventType]);

  // Expand acronyms in real-time
  useEffect(() => {
    if (clinicalNotes.trim()) {
      const timer = setTimeout(() => {
        expandAcronyms(clinicalNotes);
        autoGenerateSummary(clinicalNotes, eventType);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setExpandedText('');
    }
  }, [clinicalNotes]);

  // Auto-generate summary from clinical notes (NOW AUTO-FILLS)
  const autoGenerateSummary = (notes, type) => {
    if (!notes.trim()) return;
    
    const eventLabel = EVENT_TYPES.find(e => e.value === type)?.label || 'Update';
    
    // Smart summary generation based on clinical content
    let summary = '';
    
    // Extract key values
    const e2Match = notes.match(/E2:\s*(\d+)/);
    const afcMatch = notes.match(/AFC:\s*(\d+)/);
    const liningMatch = notes.match(/Lining:\s*(\d+)/);
    const follicleMatch = notes.match(/(\d+)[-+]?\s*follicles?/);
    const pnMatch = notes.match(/(\d+)PN/);
    const blastMatch = notes.match(/[Bb]lastocyst\s*([0-9AB]+)/);
    
    // Generate contextual summary
    if (type.includes('monitoring_scan')) {
      const parts = [];
      if (e2Match) parts.push(`E2: ${e2Match[1]}`);
      if (afcMatch) parts.push(`${afcMatch[1]} follicles`);
      if (liningMatch) parts.push(`${liningMatch[1]}mm lining`);
      if (follicleMatch) parts.push(`${follicleMatch[1]} growing`);
      summary = parts.length > 0 ? `${eventLabel}: ${parts.join(', ')}` : `${eventLabel} - scan completed`;
    } else if (type.includes('fertilization')) {
      if (pnMatch) {
        summary = `${pnMatch[1]}PN fertilization - Day 1 report`;
      } else {
        summary = `Fertilization report - ${notes.split('\n')[0].slice(0, 50)}`;
      }
    } else if (type.includes('embryo')) {
      if (blastMatch) {
        summary = `Embryo update: Blastocyst ${blastMatch[1]}`;
      } else {
        summary = `${eventLabel} - ${notes.split('\n')[0].slice(0, 50)}`;
      }
    } else if (type.includes('dose')) {
      summary = `Medication adjusted - ${notes.split('\n')[0].slice(0, 60)}`;
    } else {
      // Default: use first line
      const firstLine = notes.split('\n')[0].trim();
      summary = firstLine.length > 60 ? `${eventLabel}: ${firstLine.slice(0, 60)}...` : `${eventLabel}: ${firstLine}`;
    }
    
    setSummaryText(summary);
  };

  // Quick-add value to clinical notes
  const addQuickValue = (value) => {
    const newNotes = clinicalNotes ? `${clinicalNotes}\n${value}` : value;
    setClinicalNotes(newNotes);
  };

  // Determine which quick values to show
  const getQuickValuesCategory = () => {
    const typeStr = eventType.toLowerCase();
    if (typeStr.includes('scan') || typeStr.includes('baseline')) return 'scan';
    if (typeStr.includes('medication') || typeStr.includes('dose')) return 'medication';
    if (typeStr.includes('embryo') || typeStr.includes('fertilization')) return 'embryo';
    return 'hormone'; // default
  };

  const resetForm = () => {
    setEventType('');
    setCycleDay('');
    setClinicalNotes('');
    setSummaryText('');
    setUnderstanding('clear');
    setEmotionalResponse('calm');
    setAnxietyBefore(5);
    setAnxietyAfter(5);
    setReactionNotes('');
    setVisualHelped(false);
    setExpandedText('');
    setTemplates([]);
    setSelectedTemplate(null);
    setError('');
    setCurrentStep(1);
  };

  const expandAcronyms = async (text) => {
    try {
      setIsExpanding(true);
      const response = await axios.post(
        '/api/acronyms/expand',
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setExpandedText(response.data.expanded);
    } catch (err) {
      console.error('Failed to expand acronyms:', err);
    } finally {
      setIsExpanding(false);
    }
  };

  const fetchTemplates = async (type) => {
    try {
      const response = await axios.get(
        `/api/templates?eventType=${type}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTemplates(response.data);
    } catch (err) {
      console.error('Failed to fetch templates:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!eventType) {
      setError('Please select an event type');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const eventData = {
        patientId: patient.id,
        cycleId: cycleId || null,
        eventType,
        cycleDay: cycleDay ? parseInt(cycleDay) : null,
        clinicalData: clinicalNotes ? { raw_notes: clinicalNotes } : {},
        patientRecordText: expandedText || clinicalNotes,
        summaryText: summaryText || expandedText || clinicalNotes,
        reactionData: {
          understanding,
          emotional_response: emotionalResponse,
          anxiety_before: anxietyBefore,
          anxiety_after: anxietyAfter,
          visual_helped: visualHelped,
          notes: reactionNotes,
        },
      };

      await axios.post('/api/timeline/events', eventData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onSuccess?.();
      onClose();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add Timeline Event</h2>
            <p className="text-sm text-gray-600 mt-1">
              Patient: {patient.name} • Cycle Day: {cycleDay || 'Not specified'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 px-6 py-4 bg-gray-50 border-b">
          <div className={`flex items-center gap-2 ${currentStep === 1 ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              1
            </div>
            <span className="text-sm">Event Details</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300"></div>
          <div className={`flex items-center gap-2 ${currentStep === 2 ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
              2
            </div>
            <span className="text-sm">Patient Reaction</span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {currentStep === 1 ? (
            // Step 1: Event Details
            <>
              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type *
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select event type...</option>
                  {EVENT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cycle Day */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cycle Day (optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={cycleDay}
                    onChange={(e) => setCycleDay(e.target.value)}
                    placeholder="e.g., 3, 5, 7..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                    max="50"
                  />
                  {/* Quick day buttons */}
                  <div className="flex gap-1">
                    {[3, 5, 7, 10].map(day => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setCycleDay(day.toString())}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition"
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Value Buttons WITH RANGE INDICATORS */}
              {eventType && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <label className="block text-xs font-semibold text-blue-900 uppercase tracking-wide mb-2">
                    ⚡ Quick Add - Click to insert (color-coded: 🟢 Normal • 🔴 High • 🔵 Low)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_VALUES[getQuickValuesCategory()].map((item, idx) => {
                      const statusColors = {
                        normal: 'bg-green-100 border-green-400 text-green-800 hover:bg-green-200',
                        high: 'bg-red-100 border-red-400 text-red-800 hover:bg-red-200',
                        low: 'bg-blue-100 border-blue-400 text-blue-800 hover:bg-blue-200',
                      };
                      const colorClass = item.status ? statusColors[item.status] : 'bg-white border-gray-300 hover:bg-gray-100';
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => addQuickValue(item.value)}
                          className={`px-3 py-1.5 text-sm border rounded-md transition font-medium ${colorClass}`}
                          title={item.hint}
                        >
                          {item.label}
                          {item.hint && <span className="ml-1 text-xs opacity-75">{item.hint}</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Clinical Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clinical Notes
                  <span className="ml-2 text-xs text-gray-500">
                    💡 Type acronyms (E2, AFC, FSH) - they auto-expand below
                  </span>
                </label>
                <textarea
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  placeholder="📝 EXAMPLES:&#10;Scan: E2: 450, AFC: 12, Lead follicle: 18mm, Lining: 8mm trilaminar&#10;Fertilization: 10 MII, 8 fertilized (2PN), ICSI done&#10;Embryo: Day 5 - 3 blastocysts (4AA, 4AB, 3BB)&#10;Medication: Dose: 150 IU - continue for 3 more days&#10;&#10;✨ Pro tip: Use Quick Add buttons above or type freely!"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  rows="4"
                />
                <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
                  <div className="text-xs text-gray-700 font-semibold mb-1">📚 Quick Reference Ranges:</div>
                  <div className="text-xs text-gray-600 space-y-0.5">
                    <div>• <strong>E2:</strong> 200-1000 pg/mL (normal), &lt;200 (low), &gt;1000 (high/OHSS risk)</div>
                    <div>• <strong>P4:</strong> &lt;1 ng/mL (pre-trigger), &gt;2 (early rise concern)</div>
                    <div>• <strong>AFC:</strong> 5-15 (normal), &lt;5 (DOR), &gt;15 (PCOS/high responder)</div>
                    <div>• <strong>Lining:</strong> 7-14mm (optimal), &gt;8mm trilaminar (ideal for transfer)</div>
                    <div>• <strong>Follicles:</strong> 5-10 mature (good), &lt;3 (low response), &gt;15 (OHSS risk)</div>
                  </div>
                </div>
              </div>

              {/* Expanded Text Preview */}
              {(expandedText || isExpanding) && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-green-600" />
                    <label className="text-xs font-semibold text-green-800 uppercase tracking-wide">
                      Patient Record (Expanded)
                    </label>
                  </div>
                  {isExpanding ? (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Expanding acronyms...</span>
                    </div>
                  ) : (
                    <pre className="text-sm text-green-900 whitespace-pre-wrap font-sans">
                      {expandedText}
                    </pre>
                  )}
                </div>
              )}

              {/* Summary Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summary for Timeline
                  <span className="ml-2 text-xs text-green-600">
                    ✨ Auto-generated (edit if needed)
                  </span>
                </label>
                <textarea
                  value={summaryText}
                  onChange={(e) => setSummaryText(e.target.value)}
                  placeholder="Auto-generates from your clinical notes..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-green-50"
                  rows="2"
                />
              </div>

              {/* Template Suggestions */}
              {templates.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Suggested Templates
                  </label>
                  <div className="space-y-2">
                    {templates.slice(0, 3).map((template) => (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => setSelectedTemplate(template)}
                        className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm text-gray-900">{template.name}</div>
                            <div className="text-xs text-gray-600 mt-1">
                              {template.channel} • {template.language}
                            </div>
                          </div>
                          <Send className="w-4 h-4 text-gray-400" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            // Step 2: Reaction Capture
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-900">
                  <strong>Capture patient&apos;s reaction</strong> after explaining this event to them.
                </p>
              </div>

              {/* Understanding Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Patient Understanding
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {UNDERSTANDING_LEVELS.map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setUnderstanding(level)}
                      className={`p-3 border-2 rounded-lg transition capitalize ${
                        understanding === level
                          ? 'border-green-500 bg-green-50 text-green-700 font-semibold'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Emotional Response */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Emotional Response
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {EMOTIONAL_RESPONSES.map((emotion) => (
                    <button
                      key={emotion}
                      type="button"
                      onClick={() => setEmotionalResponse(emotion)}
                      className={`p-2 border-2 rounded-lg transition capitalize text-sm ${
                        emotionalResponse === emotion
                          ? 'border-purple-500 bg-purple-50 text-purple-700 font-semibold'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {emotion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Anxiety Levels */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Anxiety Before: <strong className="text-lg">{anxietyBefore}/10</strong>
                    </label>
                    <div className="flex gap-1">
                      {[2, 5, 8].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAnxietyBefore(val)}
                          className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={anxietyBefore}
                    onChange={(e) => setAnxietyBefore(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>😌 Calm</span>
                    <span>😰 High</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Anxiety After: <strong className="text-lg">{anxietyAfter}/10</strong>
                    </label>
                    <div className="flex gap-1">
                      {[2, 5, 8].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAnxietyAfter(val)}
                          className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={anxietyAfter}
                    onChange={(e) => setAnxietyAfter(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>😌 Calm</span>
                    <span>😰 High</span>
                  </div>
                </div>

                {anxietyBefore !== anxietyAfter && (
                  <div className={`text-sm font-medium ${anxietyBefore > anxietyAfter ? 'text-green-600' : 'text-orange-600'}`}>
                    {anxietyBefore > anxietyAfter ? (
                      <span>✓ Anxiety reduced by {anxietyBefore - anxietyAfter} points</span>
                    ) : (
                      <span>⚠ Anxiety increased by {anxietyAfter - anxietyBefore} points</span>
                    )}
                  </div>
                )}
              </div>

              {/* Visual Aid Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="visualHelped"
                  checked={visualHelped}
                  onChange={(e) => setVisualHelped(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="visualHelped" className="text-sm text-gray-700">
                  Visual diagram/guide helped understanding
                </label>
              </div>

              {/* Reaction Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={reactionNotes}
                  onChange={(e) => setReactionNotes(e.target.value)}
                  placeholder="Any additional observations about patient's reaction..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                />
              </div>
            </>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 p-6 border-t bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition"
          >
            Cancel
          </button>
          
          <div className="flex items-center gap-3">
            {currentStep === 2 && (
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition"
              >
                ← Back
              </button>
            )}
            
            {currentStep === 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                disabled={!eventType}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                Next: Capture Reaction →
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Adding Event...</span>
                  </>
                ) : (
                  <>
                    <span>Add to Timeline</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
