import { useState } from 'react';
import { MessageSquare, Phone, Send, Copy, Smile } from 'lucide-react';

const REACTION_EMOJIS = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😌', label: 'Relieved' },
  { emoji: '😟', label: 'Worried' },
  { emoji: '😰', label: 'Anxious' },
  { emoji: '🤔', label: 'Confused' },
  { emoji: '👍', label: 'Understood' },
];

const ACTION_TYPES = [
  { id: 'verbal', icon: MessageSquare, label: 'Verbally Conveyed', color: '#2E7D5F' },
  { id: 'call', icon: Phone, label: 'Called', color: '#2D6FDB' },
  { id: 'whatsapp', icon: Send, label: 'WhatsApped', color: '#25D366' },
  { id: 'message', icon: Send, label: 'SMS', color: '#C17D4A' },
];

export default function RightColumn_Actions({ event, templates = [], onActionCompleted }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showReactionCapture, setShowReactionCapture] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);

  const handleActionClick = (actionType, template) => {
    setCurrentAction({ actionType, template });
    setShowReactionCapture(true);
  };

  const handleReactionSelect = async (reaction) => {
    if (!currentAction) return;

    try {
      // Save action + reaction to backend
      await fetch('http://localhost:3000/api/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          templateId: currentAction.template?.id,
          actionType: currentAction.actionType,
          reaction: reaction.emoji,
          reactionLabel: reaction.label,
          timestamp: new Date().toISOString(),
        }),
      });

      onActionCompleted?.();
      setShowReactionCapture(false);
      setCurrentAction(null);
    } catch (error) {
      console.error('Failed to save action:', error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (!event) {
    return (
      <div className="h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-canvas)' }}>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Create a clinical note to generate actions
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto p-4 space-y-4" style={{ background: 'var(--bg-canvas)' }}>
      {/* Event Header */}
      <div className="claude-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">📋</span>
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            {event.eventType.replace(/_/g, ' ').toUpperCase()}
          </h3>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {new Date(event.eventDate).toLocaleString('en-IN', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>

      {/* Templates Section */}
      {templates.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide px-2" style={{ color: 'var(--text-tertiary)' }}>
            📨 Communication Templates
          </h4>
          
          {templates.map((template) => (
            <div key={template.id} className="claude-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {template.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    {template.language} • {template.channel}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTemplate(selectedTemplate === template.id ? null : template.id)}
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    background: 'var(--bg-subtle)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {selectedTemplate === template.id ? 'Collapse' : 'Preview'}
                </button>
              </div>

              {/* Template Preview */}
              {selectedTemplate === template.id && (
                <div className="pt-3 border-t" style={{ borderColor: 'var(--border-light)' }}>
                  <pre className="whitespace-pre-wrap text-xs mb-3 font-sans" style={{
                    color: 'var(--text-primary)',
                    lineHeight: 'var(--leading-relaxed)',
                    background: 'var(--bg-subtle)',
                    padding: '12px',
                    borderRadius: '8px'
                  }}>
                    {template.messageTemplate}
                  </pre>
                  
                  <button
                    onClick={() => copyToClipboard(template.messageTemplate)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium w-full justify-center"
                    style={{
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border-medium)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <Copy className="w-3 h-3" />
                    Copy to Clipboard
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>
                  Actions:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {ACTION_TYPES.map(action => (
                    <button
                      key={action.id}
                      onClick={() => handleActionClick(action.id, template)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105"
                      style={{
                        background: action.color,
                        color: 'white'
                      }}
                    >
                      <action.icon className="w-3 h-3" />
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reaction Capture Modal */}
      {showReactionCapture && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowReactionCapture(false)}>
          <div className="claude-card p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              Patient Reaction
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              How did the patient respond to: <strong>{currentAction?.actionType}</strong>
            </p>
            
            <div className="grid grid-cols-3 gap-3">
              {REACTION_EMOJIS.map(reaction => (
                <button
                  key={reaction.emoji}
                  onClick={() => handleReactionSelect(reaction)}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg transition-all hover:scale-110"
                  style={{
                    background: 'var(--bg-subtle)',
                    border: '2px solid var(--border-light)'
                  }}
                >
                  <span className="text-3xl">{reaction.emoji}</span>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {reaction.label}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowReactionCapture(false)}
              className="w-full mt-4 px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                background: 'var(--bg-subtle)',
                color: 'var(--text-secondary)'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Completed Actions Log */}
      {event.actions?.length > 0 && (
        <div className="claude-card p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--text-tertiary)' }}>
            ✅ Completed Actions
          </h4>
          <div className="space-y-2">
            {event.actions.map((action, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs" style={{
                background: 'var(--bg-subtle)',
                padding: '8px',
                borderRadius: '6px'
              }}>
                <span style={{ color: 'var(--text-primary)' }}>
                  {action.actionType}
                </span>
                <span className="text-lg">{action.reaction}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
