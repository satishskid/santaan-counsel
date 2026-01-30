import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { usePatientStore } from '../store/patientStore';
import api from '../utils/api';
import TimelineView from '../components/timeline/TimelineView';
import AddEventModal from '../components/timeline/AddEventModal';
import ActionPanel from '../components/timeline/ActionPanel';

export default function PatientView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { currentPatient, setCurrentPatient, timeline, setTimeline } = usePatientStore();
  
  const [loading, setLoading] = useState(true);
  const [showAddEvent, setShowAddEvent] = useState(false);
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

  const handleEventAdded = () => {
    fetchPatientData();
    setShowAddEvent(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading patient data...</p>
        </div>
      </div>
    );
  }

  if (!currentPatient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Patient not found</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900 font-semibold"
              >
                ← Back
              </button>
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-xl font-bold text-gray-900">
                  PATIENT: {currentPatient.firstName} {currentPatient.lastName}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <span>MR: {currentPatient.mrNumber}</span>
                  {activeCycle && (
                    <>
                      <span>•</span>
                      <span>Cycle #{activeCycle.cycleNumber}</span>
                      <span>•</span>
                      <span>Day {activeCycle.currentDay}</span>
                      <span>•</span>
                      <span className="capitalize font-semibold text-blue-600">
                        {activeCycle.currentPhase}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Timeline - Takes 8 columns */}
          <div className="lg:col-span-8">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-900">Clinical & Psychological Journey</h2>
              <button
                onClick={() => setShowAddEvent(true)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition shadow-sm"
              >
                + Add Event
              </button>
            </div>

            <TimelineView
              timeline={timeline}
              patient={currentPatient}
              onRefresh={fetchPatientData}
            />
          </div>

          {/* Right: Actions & Context - Takes 4 columns */}
          <div className="lg:col-span-4">
            <div className="sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Current Situation & Actions</h2>
              <ActionPanel
                patient={currentPatient}
                timeline={timeline}
                activeCycle={activeCycle}
                onAddEvent={(eventType) => setShowAddEvent(true)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Add Event Modal */}
      {showAddEvent && (
        <AddEventModal
          isOpen={showAddEvent}
          patient={currentPatient}
          cycleId={activeCycle?.id}
          onClose={() => setShowAddEvent(false)}
          onSuccess={handleEventAdded}
        />
      )}
    </div>
  );
}
