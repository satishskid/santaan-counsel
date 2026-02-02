import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { usePatientStore } from '../store/patientStore';
import api from '../utils/api';
import LeftColumn_PatientProfile from '../components/layout-3col/LeftColumn_PatientProfile';
import MiddleColumn_ClinicalLogging from '../components/layout-3col/MiddleColumn_ClinicalLogging';
import RightColumn_Actions from '../components/layout-3col/RightColumn_Actions';
import '../styles/claude-theme.css';

export default function PatientView3Col() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { currentPatient, setCurrentPatient, timeline, setTimeline } = usePatientStore();
  
  const [loading, setLoading] = useState(true);
  const [activeCycle, setActiveCycle] = useState(null);
  const [latestEvent, setLatestEvent] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [liveActionCards, setLiveActionCards] = useState([]);

  useEffect(() => {
    fetchPatientData();
    fetchTemplates();
  }, [id]);

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      
      const patientResponse = await api.get(`/patients/${id}`);
      setCurrentPatient(patientResponse.data);
      
      const timelineResponse = await api.get(`/timeline/patient/${id}`);
      setTimeline(timelineResponse.data);
      
      if (timelineResponse.data.length > 0) {
        setLatestEvent(timelineResponse.data[0]);
      }
      
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

  const fetchTemplates = async () => {
    try {
      const response = await api.get('/templates/all');
      const allTemplates = response.data;
      setTemplates(allTemplates);
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    }
  };

  const handleEventCreated = async (event) => {
    await fetchPatientData();
    setLatestEvent(event);
    setLiveActionCards([]); // Clear action cards after event is saved
  };

  const handleActionGenerated = (actionCard) => {
    setLiveActionCards(prev => [...prev, actionCard]);
  };

  const handleActionCompleted = async () => {
    await fetchPatientData();
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

  const eventTemplates = latestEvent 
    ? templates.filter(t => t.eventType === latestEvent.eventType)
    : [];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-canvas)' }}>
      {/* Top Navigation */}
      <nav className="border-b sticky top-0 z-10" style={{ 
        background: 'var(--bg-surface)', 
        borderColor: 'var(--border-light)' 
      }}>
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              ← Dashboard
            </button>
            
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
                className="text-sm font-medium"
                style={{ color: 'var(--accent-action)' }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-12 h-[calc(100vh-57px)]">
        {/* LEFT: Patient Profile & Journey (25%) */}
        <div className="col-span-3 border-r" style={{ borderColor: 'var(--border-light)' }}>
          <LeftColumn_PatientProfile
            patient={currentPatient}
            activeCycle={activeCycle}
            timeline={timeline}
          />
        </div>

        {/* MIDDLE: Clinical Logging (40%) */}
        <div className="col-span-5 border-r" style={{ borderColor: 'var(--border-light)' }}>
          <MiddleColumn_ClinicalLogging
            patientId={id}
            activeCycle={activeCycle}
            onEventCreated={handleEventCreated}
            onActionGenerated={handleActionGenerated}
          />
        </div>

        {/* RIGHT: Actions & Templates (35%) */}
        <div className="col-span-4">
          <RightColumn_Actions
            actionCards={liveActionCards}
            templates={templates}
            onActionCompleted={handleActionCompleted}
          />
        </div>
      </div>
    </div>
  );
}
