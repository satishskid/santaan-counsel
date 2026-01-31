export default function EmojiReactionPicker({ onSelect, onCancel }) {
  const reactions = [
    { emoji: '👍', label: 'Understood', mood: 'stable' },
    { emoji: '🤔', label: 'Confused', mood: 'confused' },
    { emoji: '😊', label: 'Happy', mood: 'stable' },
    { emoji: '😰', label: 'Anxious', mood: 'anxious' },
    { emoji: '😐', label: 'Neutral', mood: 'neutral' },
    { emoji: '⚠️', label: 'Escalate', mood: 'urgent' }
  ];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="claude-card p-6 max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          How did patient respond?
        </h3>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          {reactions.map((reaction) => (
            <button
              key={reaction.emoji}
              onClick={() => onSelect(reaction)}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all hover:scale-105"
              style={{
                borderColor: 'var(--border-light)',
                background: 'var(--bg-surface)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-action)';
                e.currentTarget.style.background = 'var(--bg-subtle)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.background = 'var(--bg-surface)';
              }}
            >
              <span className="text-3xl">{reaction.emoji}</span>
              <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                {reaction.label}
              </span>
            </button>
          ))}
        </div>
        
        {onCancel && (
          <button
            onClick={onCancel}
            className="w-full px-4 py-2 text-sm rounded"
            style={{ 
              border: '1px solid var(--border-medium)',
              color: 'var(--text-secondary)'
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
