import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { usePatientStore } from '../store/patientStore';
import api from '../utils/api';
import ConversationalTimeline from '../components/timeline-v2/ConversationalTimeline';
import PatientSidebar from '../components/timeline-v2/PatientSidebar';
import '../styles/claude-theme.css';

export default function PatientViewV2() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { currentPatient, setCurrentPatient, timeline, setTimeline } = usePatientStore();
  
  const [loading, setLoading] = useState(true);
  const [activeCycle, setActiveCycle] = useState(null);

  useEffect(() => {
    fetchPatientData();
  }, [id]);

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      
      // Fetch patient details
      const patientResponse = await api.get(`/patients/${id}`);
      setCurrentPatient(patientResponse.data);
      
      // Fetch timeline events
      const timelineResponse = await api.get(`/timeline/patient/${id}`);
      setTimeline(timelineResponse.data);
      
      // Find active cycle
      if (patientResponse.data.cycles?.length > 0) {
        const active = patientResponse.data.cycles.find(c => c.isActive);
        setActiveCycle(active);
      }
    } catch (error) {
      console.error('Failed to fetch patient data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = (eventType) => {
    // This will be handled by the ConversationalTimeline component
    console.log('Quick add event:', eventType);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-canvas)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Loading patient data...</p>
      </div>
    );
  }

  if (!currentPatient) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-canvas)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Patient not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-canvas)' }}>
      {/* Top Navigation */}
      <nav className="border-b" style={{ 
        background: 'var(--bg-surface)', 
        borderColor: 'var(--border-light)' 
      }}>
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-sm font-medium transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                ← Back to Dashboard
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {user.firstName} {user.lastName}
              </span>
              <span className="text-xs px-2 py-1 rounded" style={{ 
                background: 'var(--bg-subtle)', 
                color: 'var(--text-tertiary)' 
              }}>
                {user.role}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium transition-colors"
                style={{ color: 'var(--accent-action)' }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - 2 Column Layout */}
      <div className="max-w-screen-2xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar - 20% (3 cols) */}
          <aside className="col-span-3">
            <PatientSidebar
              patient={currentPatient}
              activeCycle={activeCycle}
              onAddEvent={handleAddEvent}
            />
          </aside>

          {/* Main Timeline - 80% (9 cols) */}
          <main className="col-span-9">
            <ConversationalTimeline
              patientId={id}
              timeline={timeline}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
