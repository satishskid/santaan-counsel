import { useState } from 'react';
import { MessageSquare, Phone, Send, Copy, Smile } from 'lucide-react';
import EmojiReactionPicker from '../reactions/EmojiReactionPicker';

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

export default function RightColumn_Actions({ actionCards = [], templates = [], onActionCompleted }) {
  const [showReactionCapture, setShowReactionCapture] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [completedActions, setCompletedActions] = useState([]);

  const handleActionClick = (actionType, actionCard, template) => {
    setCurrentAction({ actionType, actionCard, template });
    setShowReactionCapture(true);
  };

  const handleReactionSelect = async (reaction) => {
    if (!currentAction) return;

    const completedAction = {
      id: Date.now(),
      actionCard: currentAction.actionCard,
      actionType: currentAction.actionType,
      template: currentAction.template,
      reaction: reaction.emoji,
      reactionLabel: reaction.label,
      timestamp: new Date().toISOString(),
    };

    setCompletedActions(prev => [...prev, completedAction]);
    
    try {
      // Save action + reaction to backend
      await fetch('http://localhost:3000/api/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completedAction),
      });

      onActionCompleted?.();
    } catch (error) {
      console.error('Failed to save action:', error);
    }

    setShowReactionCapture(false);
    setCurrentAction(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (actionCards.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg-canvas)' }}>
        <div className="text-center">
          <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
            No action cards yet
          </p>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            Click chips in middle column to generate action cards
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto p-4 space-y-4" style={{ background: 'var(--bg-canvas)' }}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>
          📨 Action Cards ({actionCards.length})
        </h3>
      </div>

      {/* Action Cards - Live Generated */}
      {actionCards.map((actionCard, idx) => {
        const cardTemplates = templates.filter(t => t.eventType === actionCard.eventType);
        
        return (
          <div key={actionCard.id} className="claude-card p-4 space-y-3">
            {/* Card Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{actionCard.chipEmoji}</span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {actionCard.chipLabel}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    {new Date(actionCard.timestamp).toLocaleTimeString('en-IN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
              
              {completedActions.some(a => a.actionCard.id === actionCard.id) && (
                <span className="text-lg">✅</span>
              )}
            </div>

            {/* Note Preview */}
            <div className="p-2 rounded text-xs" style={{ 
              background: 'var(--bg-subtle)',
              color: 'var(--text-secondary)'
            }}>
              {actionCard.noteText}
            </div>

            {/* Templates for this action */}
            {cardTemplates.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>
                  Communication Templates:
                </p>
                {cardTemplates.slice(0, 2).map((template) => (
                  <div key={template.id} className="border rounded p-2" style={{ borderColor: 'var(--border-light)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                        {template.channel} • {template.language}
                      </span>
                      <button
                        onClick={() => copyToClipboard(template.messageTemplate)}
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          background: 'var(--bg-subtle)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        📋 Copy
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-1">
                      {ACTION_TYPES.map(action => (
                        <button
                          key={action.id}
                          onClick={() => handleActionClick(action.id, actionCard, template)}
                          disabled={completedActions.some(a => a.actionCard.id === actionCard.id)}
                          className="flex items-center gap-1 px-2 py-1.5 rounded text-xs font-medium transition-all"
                          style={{
                            background: completedActions.some(a => a.actionCard.id === actionCard.id) 
                              ? 'var(--text-disabled)' 
                              : action.color,
                            color: 'white',
                            opacity: completedActions.some(a => a.actionCard.id === actionCard.id) ? 0.5 : 1,
                            cursor: completedActions.some(a => a.actionCard.id === actionCard.id) ? 'not-allowed' : 'pointer'
                          }}
                        >
                          <action.icon className="w-3 h-3" />
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Completed Action for this card */}
            {completedActions.filter(a => a.actionCard.id === actionCard.id).map(action => (
              <div key={action.id} className="flex items-center justify-between p-2 rounded" style={{
                background: 'var(--mood-calm)',
                borderLeft: '3px solid var(--accent-success)'
              }}>
                <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                  {action.actionType.toUpperCase()} completed
                </span>
                <span className="text-2xl">{action.reaction}</span>
              </div>
            ))}
          </div>
        );
      })}

      {/* Reaction Capture Modal - Using EmojiReactionPicker */}
      {showReactionCapture && currentAction && (
        <EmojiReactionPicker
          onSelect={handleReactionSelect}
          onCancel={() => setShowReactionCapture(false)}
        />
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
