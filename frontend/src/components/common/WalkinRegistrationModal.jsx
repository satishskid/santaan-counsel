import { useState } from 'react';
import { X } from 'lucide-react';

export default function WalkinRegistrationModal({ onRegister, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    phone: '',
    email: '',
    reason: 'first_consultation'
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="claude-card p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            New Walk-in Patient
          </h3>
          <button onClick={onCancel}>
            <X className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                First Name *
              </label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded"
                style={{
                  border: '1px solid var(--border-medium)',
                  background: 'var(--bg-surface)'
                }}
              />
            </div>
            
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded"
                style={{
                  border: '1px solid var(--border-medium)',
                  background: 'var(--bg-surface)'
                }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                Age *
              </label>
              <input
                type="number"
                required
                min="18"
                max="50"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded"
                style={{
                  border: '1px solid var(--border-medium)',
                  background: 'var(--bg-surface)'
                }}
              />
            </div>
            
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>
                Phone *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded"
                style={{
                  border: '1px solid var(--border-medium)',
                  background: 'var(--bg-surface)'
                }}
              />
            </div>
          </div>
          
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded"
              style={{
                border: '1px solid var(--border-medium)',
                background: 'var(--bg-surface)'
              }}
            />
          </div>
          
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>
              Reason for Visit
            </label>
            <select
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded"
              style={{
                border: '1px solid var(--border-medium)',
                background: 'var(--bg-surface)'
              }}
            >
              <option value="first_consultation">First Consultation</option>
              <option value="follow_up">Follow-up Visit</option>
              <option value="emergency">Emergency</option>
              <option value="results">Results Review</option>
            </select>
          </div>
          
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 text-sm rounded"
              style={{
                border: '1px solid var(--border-medium)',
                color: 'var(--text-secondary)'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm rounded font-medium"
              style={{
                background: 'var(--accent-action)',
                color: 'white'
              }}
            >
              Register & Open
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
