import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import api from '../../utils/api';

export default function PatientSearchAutocomplete({ onSelect, placeholder = "Search active patients..." }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const wrapperRef = useRef(null);
  
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    
    searchPatients(query);
  }, [query]);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const searchPatients = async (q) => {
    try {
      const response = await api.get(`/patients/search?q=${q}&activeOnly=true`);
      setResults(response.data);
      setIsOpen(true);
    } catch (error) {
      console.error('Search error:', error);
    }
  };
  
  const handleKeyDown = (e) => {
    if (!isOpen) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };
  
  const handleSelect = (patient) => {
    onSelect(patient);
    setQuery('');
    setIsOpen(false);
  };
  
  const getMoodEmoji = (mood) => {
    const moodMap = {
      anxious: '🔴',
      confused: '🟡',
      stable: '🟢',
      neutral: '⚪'
    };
    return moodMap[mood] || '⚪';
  };
  
  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" 
          style={{ color: 'var(--text-tertiary)' }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 text-sm rounded"
          style={{
            border: '1px solid var(--border-medium)',
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)'
          }}
        />
      </div>
      
      {isOpen && results.length > 0 && (
        <div 
          className="absolute top-full left-0 right-0 mt-1 border rounded shadow-lg z-50 max-h-96 overflow-y-auto"
          style={{
            background: 'var(--bg-surface)',
            borderColor: 'var(--border-medium)'
          }}
        >
          {results.map((patient, idx) => (
            <button
              key={patient.id}
              onClick={() => handleSelect(patient)}
              className="w-full text-left p-3 border-b transition-colors"
              style={{
                borderColor: 'var(--border-light)',
                background: idx === selectedIndex ? 'var(--bg-subtle)' : 'transparent'
              }}
              onMouseEnter={() => setSelectedIndex(idx)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {patient.firstName} {patient.lastName} ({patient.mrNumber})
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {getMoodEmoji(patient.currentMood)} {patient.currentMood || 'Stable'}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                      Day {patient.cycleDay || 0}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                      {patient.pendingActions || 0} pending
                    </span>
                  </div>
                  {patient.lastEvent && (
                    <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                      Last: {patient.lastEvent}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
      
      {isOpen && results.length === 0 && query.length >= 2 && (
        <div 
          className="absolute top-full left-0 right-0 mt-1 border rounded shadow-lg p-3"
          style={{
            background: 'var(--bg-surface)',
            borderColor: 'var(--border-medium)'
          }}
        >
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            No active patients found
          </p>
        </div>
      )}
    </div>
  );
}
