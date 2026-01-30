import { useState } from 'react';
import { Copy, Edit, Send, Phone, MessageSquare, Mail } from 'lucide-react';

const MOOD_EMOJIS = {
  calm: '😊',
  hopeful: '🙏',
  excited: '😃',
  anxious: '😟',
  worried: '😰',
  neutral: '😐',
};

export default function EventBubble({ event, templates = [] }) {
  const [expandedTemplate, setExpandedTemplate] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatEventTitle = (eventType) => {
    return eventType
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getMoodEmoji = () => {
    if (!event.reactionData?.emotional_response) return '😊';
    return MOOD_EMOJIS[event.reactionData.emotional_response] || '😊';
  };

  const getAnxietyChange = () => {
    if (!event.reactionData) return null;
    const { anxiety_before, anxiety_after } = event.reactionData;
    if (anxiety_before === undefined || anxiety_after === undefined) return null;
    return `${anxiety_before}→${anxiety_after}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
  };

  const getClinicalItems = () => {
    if (event.patientRecordText) {
      return event.patientRecordText.split('\n').filter(line => line.trim());
    }
    return [];
  };

  const getTemplateIcon = (channel) => {
    switch (channel) {
      case 'whatsapp': return <MessageSquare className="w-4 h-4" />;
      case 'call': return <Phone className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="claude-card p-6 mb-4">
      {/* Metadata Bar */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b" style={{ borderColor: 'var(--border-light)' }}>
        <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <span>📅 {formatDate(event.eventDate)}</span>
          {event.cycleDay && (
            <>
              <span>•</span>
              <span>Day {event.cycleDay}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
          {getMoodEmoji() && (
            <span className="text-base">{getMoodEmoji()}</span>
          )}
          {event.reactionData?.emotional_response && (
            <span className="capitalize">{event.reactionData.emotional_response}</span>
          )}
          {getAnxietyChange() && (
            <>
              <span>•</span>
              <span>Anxiety: {getAnxietyChange()}</span>
            </>
          )}
        </div>
      </div>

      {/* Event Title */}
      <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
        {formatEventTitle(event.eventType)}
      </h3>

      {/* Clinical Data */}
      {getClinicalItems().length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-tertiary)' }}>
            Clinical Data:
          </p>
          <ul className="space-y-1">
            {getClinicalItems().map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Summary */}
      {event.summaryText && (
        <>
          <hr className="claude-divider" />
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-tertiary)' }}>
              💬 Communication:
            </p>
            <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
              "{event.summaryText}"
            </p>
          </div>
        </>
      )}

      {/* Templated Actions */}
      {templates.length > 0 && (
        <>
          <hr className="claude-divider" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-tertiary)' }}>
              📨 Templated Actions (Copy-Ready):
            </p>
            
            <div className="space-y-3">
              {templates.slice(0, 3).map((template) => (
                <div 
                  key={template.id} 
                  className="border rounded-lg p-4 transition-all"
                  style={{ 
                    borderColor: 'var(--border-medium)',
                    background: expandedTemplate === template.id ? 'var(--bg-subtle)' : 'transparent'
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getTemplateIcon(template.channel)}
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {template.name}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded" style={{ 
                        background: 'var(--bg-subtle)', 
                        color: 'var(--text-tertiary)' 
                      }}>
                        {template.language}
                      </span>
                    </div>
                  </div>

                  {expandedTemplate === template.id && (
                    <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-light)' }}>
                      <pre className="whitespace-pre-wrap text-sm mb-3 font-sans" style={{ 
                        color: 'var(--text-primary)',
                        lineHeight: 'var(--leading-relaxed)'
                      }}>
                        {template.messageTemplate}
                      </pre>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(template.messageTemplate)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-colors"
                      style={{
                        background: 'var(--accent-action)',
                        color: 'white'
                      }}
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </button>
                    <button
                      onClick={() => setExpandedTemplate(expandedTemplate === template.id ? null : template.id)}
                      className="claude-btn-secondary text-xs px-3 py-1.5"
                    >
                      <Edit className="w-3 h-3 inline mr-1" />
                      {expandedTemplate === template.id ? 'Collapse' : 'Preview'}
                    </button>
                    <button
                      className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-colors"
                      style={{
                        background: 'var(--accent-success)',
                        color: 'white'
                      }}
                    >
                      <Send className="w-3 h-3" />
                      Send
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
