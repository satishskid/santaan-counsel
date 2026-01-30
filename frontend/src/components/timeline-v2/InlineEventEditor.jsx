import { useState } from 'react';
import { X, Save } from 'lucide-react';

const EVENT_TYPES = [
  { value: 'patient_inquiry', label: 'Patient Inquiry' },
  { value: 'consultation', label: 'Consultation' },
  { value: 'baseline_scan', label: 'Baseline Scan' },
  { value: 'monitoring_scan', label: 'Monitoring Scan' },
  { value: 'trigger_administration', label: 'Trigger Shot' },
  { value: 'opu', label: 'OPU (Egg Retrieval)' },
  { value: 'fertilization_report', label: 'Fertilization Report' },
  { value: 'embryo_update', label: 'Embryo Update' },
  { value: 'embryo_transfer', label: 'Embryo Transfer' },
  { value: 'counseling_session', label: 'Counseling Session' },
];

const MOOD_OPTIONS = ['calm', 'hopeful', 'excited', 'anxious', 'worried', 'neutral'];

export default function InlineEventEditor({ patientId, initialEventType, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    eventType: initialEventType || 'patient_inquiry',
    eventDate: new Date().toISOString().slice(0, 16),
    cycleDay: '',
    patientRecordText: '',
    summaryText: '',
    emotionalResponse: 'calm',
    anxietyBefore: 5,
    anxietyAfter: 5,
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('http://localhost:3000/api/timeline-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId,
          eventType: formData.eventType,
          eventDate: new Date(formData.eventDate).toISOString(),
          cycleDay: formData.cycleDay ? parseInt(formData.cycleDay) : null,
          patientRecordText: formData.patientRecordText,
          summaryText: formData.summaryText,
          reactionData: {
            emotional_response: formData.emotionalResponse,
            anxiety_before: parseInt(formData.anxietyBefore),
            anxiety_after: parseInt(formData.anxietyAfter),
          },
        }),
      });

      if (response.ok) {
        onSave();
      } else {
        console.error('Failed to save event');
      }
    } catch (error) {
      console.error('Error saving event:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="claude-card p-6 mb-4 border-2" style={{ borderColor: 'var(--accent-action)' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          Add New Event
        </h3>
        <button
          onClick={onCancel}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Event Type
          </label>
          <select
            value={formData.eventType}
            onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
            style={{ borderColor: 'var(--border-medium)' }}
          >
            {EVENT_TYPES.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date & Cycle Day */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Date & Time
            </label>
            <input
              type="datetime-local"
              value={formData.eventDate}
              onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              style={{ borderColor: 'var(--border-medium)' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Cycle Day
            </label>
            <input
              type="number"
              value={formData.cycleDay}
              onChange={(e) => setFormData({ ...formData, cycleDay: e.target.value })}
              placeholder="Optional"
              className="w-full px-3 py-2 border rounded-lg"
              style={{ borderColor: 'var(--border-medium)' }}
            />
          </div>
        </div>

        {/* Clinical Data */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Clinical Data (one per line)
          </label>
          <textarea
            value={formData.patientRecordText}
            onChange={(e) => setFormData({ ...formData, patientRecordText: e.target.value })}
            placeholder="E2: 520 pg/mL&#10;7 follicles (12-14mm)&#10;Lining: 8mm"
            rows={4}
            className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
            style={{ borderColor: 'var(--border-medium)' }}
          />
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
            Communication Summary
          </label>
          <textarea
            value={formData.summaryText}
            onChange={(e) => setFormData({ ...formData, summaryText: e.target.value })}
            placeholder="What was communicated to the patient..."
            rows={3}
            className="w-full px-3 py-2 border rounded-lg"
            style={{ borderColor: 'var(--border-medium)' }}
          />
        </div>

        {/* Emotional Response */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Mood
            </label>
            <select
              value={formData.emotionalResponse}
              onChange={(e) => setFormData({ ...formData, emotionalResponse: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              style={{ borderColor: 'var(--border-medium)' }}
            >
              {MOOD_OPTIONS.map(mood => (
                <option key={mood} value={mood}>
                  {mood.charAt(0).toUpperCase() + mood.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Anxiety Before
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={formData.anxietyBefore}
              onChange={(e) => setFormData({ ...formData, anxietyBefore: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              style={{ borderColor: 'var(--border-medium)' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
              Anxiety After
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={formData.anxietyAfter}
              onChange={(e) => setFormData({ ...formData, anxietyAfter: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              style={{ borderColor: 'var(--border-medium)' }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
          <button
            type="button"
            onClick={onCancel}
            className="claude-btn-secondary flex-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors"
            style={{
              background: saving ? 'var(--text-disabled)' : 'var(--accent-action)',
              color: 'white',
              cursor: saving ? 'not-allowed' : 'pointer'
            }}
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Event'}
          </button>
        </div>
      </form>
    </div>
  );
}
