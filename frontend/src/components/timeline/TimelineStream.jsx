import { useState } from 'react';
import { formatDate } from '../../utils/formatters';

const eventTypeEmoji = {
  initial_consultation: '🩺',
  baseline_scan: '📊',
  medication_start: '💊',
  monitoring_scan_day3: '🔬',
  monitoring_scan_day5: '🔬',
  monitoring_scan_day7: '🔬',
  trigger_shot: '💉',
  egg_retrieval: '🥚',
  fertilization_day1_report: '🧬',
  embryo_development_day3: '🌱',
  embryo_development_day5: '🌿',
  embryo_transfer: '🌸',
  pregnancy_test: '🎯',
  patient_inquiry: '💬',
  counseling_session: '🤝',
};

export default function TimelineStream({ timeline = [], patient, onRefresh }) {
  const [expandedBeadId, setExpandedBeadId] = useState(null);
  const [showHistoryDetail, setShowHistoryDetail] = useState(false);

  if (!timeline || timeline.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem 1rem',
        color: 'var(--text-tertiary)',
        fontFamily: 'var(--font-mono)'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
        <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>No timeline events yet</p>
        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Patient journey will appear here</p>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Separate past, present, and future events
  const pastEvents = timeline.filter(e => {
    const eventDate = new Date(e.eventDate);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate < today;
  }).sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate)); // Oldest first for past

  const presentEvents = timeline.filter(e => {
    const eventDate = new Date(e.eventDate);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate.getTime() === today.getTime();
  });

  const futureEvents = timeline.filter(e => {
    const eventDate = new Date(e.eventDate);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate > today;
  }).sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate)); // Soonest first

  // Generate history summary
  const generateHistorySummary = () => {
    if (pastEvents.length === 0) return 'No history yet';
    
    const totalEvents = pastEvents.length;
    const eventTypes = {};
    pastEvents.forEach(e => {
      eventTypes[e.eventType] = (eventTypes[e.eventType] || 0) + 1;
    });

    const topEvents = Object.entries(eventTypes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([type, count]) => `${count} ${type.replace(/_/g, ' ')}`)
      .join(', ');

    const firstEvent = pastEvents[0];
    const daysSinceStart = Math.floor((today - new Date(firstEvent.eventDate)) / (1000 * 60 * 60 * 24));

    return `${totalEvents} events over ${daysSinceStart} days • ${topEvents}`;
  };

  const toggleBead = (eventId) => {
    setExpandedBeadId(expandedBeadId === eventId ? null : eventId);
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.5rem',
      border: '1px solid var(--border-color)',
      maxHeight: '85vh',
      overflow: 'auto'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        paddingBottom: '0.75rem',
        borderBottom: '2px solid var(--border-color)',
        fontFamily: 'var(--font-mono)'
      }}>
        <h3 style={{ fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
          TIMELINE STREAM
        </h3>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {patient?.firstName} {patient?.lastName} • {timeline.length} total
        </span>
      </div>

      {/* SECTION 1: History Bubble */}
      {pastEvents.length > 0 && (
        <div style={{
          marginBottom: '2rem',
          paddingLeft: '1rem',
          borderLeft: '3px solid var(--text-tertiary)'
        }}>
          <button
            onClick={() => setShowHistoryDetail(!showHistoryDetail)}
            style={{
              background: 'linear-gradient(135deg, var(--accent-blue-light), var(--accent-purple-light))',
              border: '2px solid var(--accent-blue)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.25rem' }}>📚</span>
              <strong style={{ color: 'var(--text-primary)' }}>
                PATIENT HISTORY
              </strong>
              <span style={{ 
                marginLeft: 'auto',
                backgroundColor: 'var(--accent-blue)',
                color: 'white',
                padding: '0.125rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                {pastEvents.length} events
              </span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {showHistoryDetail ? '▼' : '▶'}
              </span>
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', lineHeight: '1.4' }}>
              {generateHistorySummary()}
            </div>
          </button>

          {/* Expandable History Detail */}
          {showHistoryDetail && (
            <div style={{
              marginTop: '1rem',
              paddingLeft: '1rem',
              borderLeft: '2px dashed var(--border-color)'
            }}>
              {pastEvents.slice().reverse().map((event, idx) => (
                <BeadItem
                  key={event.id}
                  event={event}
                  isExpanded={expandedBeadId === event.id}
                  onToggle={() => toggleBead(event.id)}
                  isPast={true}
                  position={idx}
                  total={pastEvents.length}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: Vertical Beads for Recent Past (if not expanded) */}
      {!showHistoryDetail && pastEvents.length > 0 && (
        <div style={{
          marginBottom: '2rem',
          paddingLeft: '1rem',
          borderLeft: '3px solid var(--text-tertiary)'
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-tertiary)',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            Recent Past
          </div>
          {pastEvents.slice(-5).reverse().map((event, idx) => (
            <BeadItem
              key={event.id}
              event={event}
              isExpanded={expandedBeadId === event.id}
              onToggle={() => toggleBead(event.id)}
              isPast={true}
              position={idx}
              total={Math.min(5, pastEvents.length)}
            />
          ))}
        </div>
      )}

      {/* SECTION 3: Present Day Action Bar */}
      {presentEvents.length > 0 && (
        <div style={{
          marginBottom: '2rem',
          paddingLeft: '1rem',
          borderLeft: '4px solid var(--accent-green)'
        }}>
          <div style={{
            background: 'var(--accent-green-light)',
            border: '2px solid var(--accent-green)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.25rem',
            fontFamily: 'var(--font-mono)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.25rem' }}>⚡</span>
              <strong style={{ color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                TODAY - {formatDate(today)}
              </strong>
              <span style={{
                marginLeft: 'auto',
                backgroundColor: 'var(--accent-green)',
                color: 'white',
                padding: '0.125rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                {presentEvents.length} active
              </span>
            </div>
            {presentEvents.map(event => (
              <div key={event.id} style={{
                backgroundColor: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem',
                marginBottom: '0.5rem',
                fontSize: '0.875rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>{eventTypeEmoji[event.eventType] || '📌'}</span>
                  <strong style={{ color: 'var(--text-primary)' }}>
                    {event.eventType.replace(/_/g, ' ').toUpperCase()}
                  </strong>
                  {event.cycleDay && (
                    <span style={{
                      fontSize: '0.75rem',
                      color: 'var(--accent-blue)',
                      fontWeight: '600'
                    }}>
                      Day {event.cycleDay}
                    </span>
                  )}
                </div>
                {event.summaryText && (
                  <div style={{
                    marginTop: '0.5rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.8125rem',
                    fontStyle: 'italic'
                  }}>
                    {event.summaryText}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: Future Events */}
      {futureEvents.length > 0 && (
        <div style={{
          paddingLeft: '1rem',
          borderLeft: '3px dashed var(--accent-purple)'
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-tertiary)',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>🔮</span>
            <span>Important Upcoming Events</span>
          </div>
          {futureEvents.map((event, idx) => (
            <FutureEventItem
              key={event.id}
              event={event}
              position={idx}
              total={futureEvents.length}
            />
          ))}
        </div>
      )}

      {/* Empty State for Present/Future */}
      {presentEvents.length === 0 && futureEvents.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '2rem 1rem',
          color: 'var(--text-tertiary)',
          fontSize: '0.875rem',
          fontFamily: 'var(--font-mono)'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✨</div>
          <p>No current or upcoming events scheduled</p>
        </div>
      )}
    </div>
  );
}

// Bead Item Component (for past events)
function BeadItem({ event, isExpanded, onToggle, isPast, position, total }) {
  const isLast = position === total - 1;

  return (
    <div style={{
      marginBottom: isLast ? 0 : '0.75rem',
      position: 'relative'
    }}>
      {/* Connector Line */}
      {!isLast && (
        <div style={{
          position: 'absolute',
          left: '0.625rem',
          top: '2rem',
          bottom: '-0.75rem',
          width: '2px',
          backgroundColor: 'var(--border-color)'
        }} />
      )}

      {/* Bead */}
      <button
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: isExpanded ? 'var(--bg-primary)' : 'transparent',
          border: 'none',
          padding: '0',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'left',
          fontFamily: 'var(--font-mono)',
          transition: 'all 0.15s ease'
        }}
      >
        {/* Bead Circle */}
        <div style={{
          width: '1.25rem',
          height: '1.25rem',
          borderRadius: '50%',
          backgroundColor: isExpanded ? 'var(--accent-blue)' : 'var(--text-tertiary)',
          border: `2px solid ${isExpanded ? 'var(--accent-blue)' : 'var(--border-color)'}`,
          flexShrink: 0,
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.625rem'
        }}>
          {isExpanded && <span style={{ color: 'white' }}>●</span>}
        </div>

        {/* Bead Summary */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '0.8125rem',
            color: isExpanded ? 'var(--text-primary)' : 'var(--text-secondary)',
            fontWeight: isExpanded ? '600' : '400'
          }}>
            <span style={{ marginRight: '0.5rem' }}>
              {eventTypeEmoji[event.eventType] || '📌'}
            </span>
            {formatDate(event.eventDate)}
            {event.cycleDay && <span style={{ marginLeft: '0.5rem', color: 'var(--accent-blue)' }}>D{event.cycleDay}</span>}
          </div>
          {!isExpanded && (
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--text-tertiary)',
              marginTop: '0.125rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {event.eventType.replace(/_/g, ' ')}
            </div>
          )}
        </div>

        {/* Expand Icon */}
        <span style={{
          fontSize: '0.75rem',
          color: 'var(--text-tertiary)',
          flexShrink: 0
        }}>
          {isExpanded ? '▼' : '▶'}
        </span>
      </button>

      {/* Expanded Detail */}
      {isExpanded && (
        <div style={{
          marginTop: '0.75rem',
          marginLeft: '2rem',
          padding: '1rem',
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.875rem',
          fontFamily: 'var(--font-mono)'
        }}>
          <div style={{
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem'
          }}>
            {event.eventType.replace(/_/g, ' ').toUpperCase()}
          </div>
          
          {event.patientRecordText && (
            <div style={{
              color: 'var(--text-secondary)',
              fontSize: '0.8125rem',
              lineHeight: '1.5',
              marginBottom: '0.5rem',
              whiteSpace: 'pre-wrap'
            }}>
              {event.patientRecordText}
            </div>
          )}

          {event.summaryText && (
            <div style={{
              color: 'var(--text-secondary)',
              fontSize: '0.8125rem',
              fontStyle: 'italic',
              marginBottom: '0.5rem'
            }}>
              {event.summaryText}
            </div>
          )}

          {event.creator?.assignedToName && (
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--text-tertiary)',
              marginTop: '0.75rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid var(--border-color)'
            }}>
              Recorded by: {event.creator.assignedToName}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Future Event Item Component
function FutureEventItem({ event, position, total }) {
  const isLast = position === total - 1;
  const daysAway = Math.ceil((new Date(event.eventDate) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div style={{
      marginBottom: isLast ? 0 : '0.5rem',
      position: 'relative'
    }}>
      {/* Connector */}
      {!isLast && (
        <div style={{
          position: 'absolute',
          left: '0.5rem',
          top: '1.75rem',
          bottom: '-0.5rem',
          width: '2px',
          borderLeft: '2px dashed var(--border-color)'
        }} />
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        backgroundColor: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.75rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.875rem'
      }}>
        {/* Future Icon */}
        <div style={{
          width: '1rem',
          height: '1rem',
          borderRadius: '50%',
          border: '2px dashed var(--accent-purple)',
          flexShrink: 0
        }} />

        <div style={{ flex: 1 }}>
          <div style={{
            color: 'var(--text-primary)',
            fontWeight: '500'
          }}>
            <span style={{ marginRight: '0.5rem' }}>
              {eventTypeEmoji[event.eventType] || '📌'}
            </span>
            {formatDate(event.eventDate)}
            {event.cycleDay && (
              <span style={{ marginLeft: '0.5rem', color: 'var(--accent-blue)' }}>
                Day {event.cycleDay}
              </span>
            )}
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            marginTop: '0.125rem'
          }}>
            {event.eventType.replace(/_/g, ' ')}
          </div>
        </div>

        <div style={{
          fontSize: '0.75rem',
          color: 'var(--accent-purple)',
          fontWeight: '600',
          flexShrink: 0
        }}>
          in {daysAway}d
        </div>
      </div>
    </div>
  );
}
