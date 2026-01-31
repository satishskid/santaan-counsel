import { useState } from 'react';
import { Calendar, Clock, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';

export default function ProtocolScheduleEditor({ protocol, startDate, onConfirm, onCancel }) {
  const [schedule, setSchedule] = useState(protocol.schedule);
  const [expandedDays, setExpandedDays] = useState([1, 2, 3]); // First 3 days expanded by default
  
  const toggleDay = (dayNum) => {
    setExpandedDays(prev => 
      prev.includes(dayNum) 
        ? prev.filter(d => d !== dayNum)
        : [...prev, dayNum]
    );
  };
  
  const editActionTime = (dayIdx, eventIdx, actionIdx, newTime) => {
    const newSchedule = [...schedule];
    newSchedule[dayIdx].events[eventIdx].actions[actionIdx].time = newTime;
    setSchedule(newSchedule);
  };
  
  const skipAction = (dayIdx, eventIdx, actionIdx) => {
    const newSchedule = [...schedule];
    newSchedule[dayIdx].events[eventIdx].actions.splice(actionIdx, 1);
    setSchedule(newSchedule);
  };
  
  const addAction = (dayIdx, eventIdx) => {
    const newSchedule = [...schedule];
    newSchedule[dayIdx].events[eventIdx].actions.push({
      actionType: 'whatsapp',
      templateKey: 'custom',
      time: '09:00',
      location: 'remote',
      icon: '📱'
    });
    setSchedule(newSchedule);
  };
  
  const getDateForDay = (dayNum) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + (dayNum - 1));
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  };
  
  return (
    <div className="border-t pt-4 mt-4" style={{ borderColor: 'var(--border-medium)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            📅 Protocol Schedule: {protocol.name}
          </h3>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            {protocol.duration} days • Review and customize before generating actions
          </p>
        </div>
        <button
          onClick={() => setExpandedDays(schedule.map(d => d.day))}
          className="text-xs px-2 py-1 rounded"
          style={{ background: 'var(--bg-subtle)', color: 'var(--text-secondary)' }}
        >
          {expandedDays.length === schedule.length ? 'Collapse All' : 'Expand All'}
        </button>
      </div>
      
      {/* Schedule Days */}
      <div className="space-y-2 max-h-96 overflow-y-auto" style={{ 
        background: 'var(--bg-subtle)', 
        padding: '12px',
        borderRadius: '8px'
      }}>
        {schedule.map((day, dayIdx) => (
          <div key={day.day} className="border rounded" style={{ 
            borderColor: 'var(--border-light)',
            background: 'var(--bg-surface)'
          }}>
            {/* Day Header */}
            <button
              onClick={() => toggleDay(day.day)}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-opacity-50"
              style={{ background: expandedDays.includes(day.day) ? 'var(--bg-subtle)' : 'transparent' }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-2 py-1 rounded" style={{
                  background: protocol.color || '#9333EA',
                  color: 'white'
                }}>
                  Day {day.day}
                </span>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {day.label}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    {getDateForDay(day.day)} • {day.events.length} event(s)
                  </p>
                </div>
              </div>
              {expandedDays.includes(day.day) ? (
                <ChevronUp className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              ) : (
                <ChevronDown className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              )}
            </button>
            
            {/* Day Content */}
            {expandedDays.includes(day.day) && (
              <div className="p-3 pt-0 space-y-3">
                {day.events.map((event, eventIdx) => (
                  <div key={eventIdx} className="border-l-2 pl-3" style={{ borderColor: protocol.color }}>
                    {/* Event */}
                    <div className="mb-2">
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {event.type === 'medication' ? '💊' : '🏥'} {event.name}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <Clock className="w-3 h-3 inline mr-1" />
                        {event.time}
                      </p>
                    </div>
                    
                    {/* Actions */}
                    {event.actions && event.actions.length > 0 && (
                      <div className="space-y-2">
                        {event.actions.map((action, actionIdx) => (
                          <div key={actionIdx} className="flex items-center justify-between p-2 rounded" style={{
                            background: 'var(--bg-subtle)'
                          }}>
                            <div className="flex items-center gap-2">
                              <span>{action.icon}</span>
                              <div>
                                <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                                  {action.actionType.toUpperCase()}
                                </p>
                                <input
                                  type="time"
                                  value={action.time}
                                  onChange={(e) => editActionTime(dayIdx, eventIdx, actionIdx, e.target.value)}
                                  className="text-xs border rounded px-1"
                                  style={{ borderColor: 'var(--border-light)' }}
                                />
                              </div>
                            </div>
                            <button
                              onClick={() => skipAction(dayIdx, eventIdx, actionIdx)}
                              className="text-xs px-2 py-1 rounded"
                              style={{ color: 'var(--text-danger)' }}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        
                        <button
                          onClick={() => addAction(dayIdx, eventIdx)}
                          className="text-xs flex items-center gap-1 px-2 py-1 rounded w-full justify-center"
                          style={{ 
                            border: '1px dashed var(--border-medium)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          <Plus className="w-3 h-3" />
                          Add Action
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm rounded"
          style={{ 
            border: '1px solid var(--border-medium)',
            color: 'var(--text-secondary)'
          }}
        >
          Cancel
        </button>
        
        <button
          onClick={() => onConfirm(schedule)}
          className="px-4 py-2 text-sm rounded font-medium"
          style={{ 
            background: protocol.color || '#9333EA',
            color: 'white'
          }}
        >
          Confirm & Generate Actions
        </button>
      </div>
    </div>
  );
}
