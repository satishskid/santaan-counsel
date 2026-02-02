import { useState, useEffect } from 'react';
import EventBubble from './EventBubble';
import InlineEventEditor from './InlineEventEditor';
import { Plus } from 'lucide-react';
import api from '../../utils/api';

export default function ConversationalTimeline({ patientId, timeline = [] }) {
  const [showEditor, setShowEditor] = useState(false);
  const [eventType, setEventType] = useState(null);
  const [templates, setTemplates] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch templates for each event
  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const response = await api.get('/templates/all');
        const allTemplates = response.data;
        
        // Group templates by event type
        const grouped = {};
        allTemplates.forEach(template => {
          if (!grouped[template.eventType]) {
            grouped[template.eventType] = [];
          }
          grouped[template.eventType].push(template);
        });
        
        setTemplates(grouped);
      } catch (error) {
        console.error('Failed to fetch templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleAddEvent = (type) => {
    setEventType(type);
    setShowEditor(true);
  };

  const handleEventAdded = () => {
    setShowEditor(false);
    setEventType(null);
    // Refresh timeline (parent component should handle this)
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p style={{ color: 'var(--text-secondary)' }}>Loading timeline...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Timeline Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Patient Timeline
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Conversational journey from first contact to success
          </p>
        </div>
        <button
          onClick={() => handleAddEvent(null)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors"
          style={{
            background: 'var(--accent-action)',
            color: 'white'
          }}
        >
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {/* Inline Event Editor */}
      {showEditor && (
        <InlineEventEditor
          patientId={patientId}
          initialEventType={eventType}
          onCancel={() => setShowEditor(false)}
          onSave={handleEventAdded}
        />
      )}

      {/* Timeline Events */}
      {timeline.length === 0 ? (
        <div className="claude-card p-12 text-center">
          <p className="text-lg mb-2" style={{ color: 'var(--text-secondary)' }}>
            No timeline events yet
          </p>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Click &ldquo;Add Event&rdquo; to start building the patient journey
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {timeline.map((event) => (
            <EventBubble
              key={event.id}
              event={event}
              templates={templates[event.eventType] || []}
            />
          ))}
        </div>
      )}
    </div>
  );
}
