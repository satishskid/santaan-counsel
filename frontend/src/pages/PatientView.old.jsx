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
      const patientRes = await api.get(`/patients/${id}`);
      setCurrentPatient(patientRes.data);
      
      // Fetch timeline
      const timelineRes = await api.get(`/timeline/${id}`);
      setTimeline(timelineRes.data);
      
      // Get active cycle
      const activeCycle = patientRes.data.cycles?.find(c => c.status === 'active');
      setActiveCycle(activeCycle);
      
    } catch (error) {
      console.error('Error fetching patient:', error);
      if (error.response?.status === 404) {
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEventAdded = () => {
    setShowAddEvent(false);
    fetchPatientData(); // Refresh timeline
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading patient...</p>
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
            className="mt-4 text-primary-600 hover:text-primary-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
              <div>
                <h1 className="text-2xl font-bold text-primary-700">
                  {currentPatient.firstName} {currentPatient.lastName}
                </h1>
                <p className="text-sm text-gray-600">MR: {currentPatient.mrNumber}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
              </div>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Info</h2>
              
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500">Age</label>
                  <p className="text-sm font-medium">{currentPatient.age} years</p>
                </div>
                
                <div>
                  <label className="text-xs text-gray-500">Phone</label>
                  <p className="text-sm font-medium">{currentPatient.phone}</p>
                </div>
                
                {currentPatient.amh && (
                  <div>
                    <label className="text-xs text-gray-500">AMH</label>
                    <p className="text-sm font-medium">{currentPatient.amh} ng/mL</p>
                  </div>
                )}
                
                {currentPatient.bmi && (
                  <div>
                    <label className="text-xs text-gray-500">BMI</label>
                    <p className="text-sm font-medium">{currentPatient.bmi}</p>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <label className="text-xs text-gray-500">Current Anxiety</label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          currentPatient.currentAnxiety <= 3
                            ? 'bg-green-500'
                            : currentPatient.currentAnxiety <= 6
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${currentPatient.currentAnxiety * 10}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{currentPatient.currentAnxiety}/10</span>
                  </div>
                </div>

                {activeCycle && (
                  <div className="pt-4 border-t">
                    <label className="text-xs text-gray-500">Current Cycle</label>
                    <p className="text-sm font-medium">Cycle #{activeCycle.cycleNumber}</p>
                    <p className="text-xs text-gray-600 capitalize">{activeCycle.currentPhase?.replace('_', ' ')}</p>
                    {activeCycle.cycleDay && (
                      <p className="text-xs text-gray-600">Day {activeCycle.cycleDay}</p>
                    )}
                  </div>
                )}

                <div className="pt-4 border-t">
                  <label className="text-xs text-gray-500">Preferences</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">
                      {currentPatient.preferredLanguage.replace('_', ' + ')}
                    </span>
                    {currentPatient.visualLearner && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        Visual learner
                      </span>
                    )}
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded capitalize">
                      {currentPatient.detailPreference} detail
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Timeline</h2>
                  <p className="text-sm text-gray-600">
                    Clinical & Psychological Journey
                  </p>
                </div>
                
                <button
                  onClick={() => setShowAddEvent(true)}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition"
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
          </div>
        </div>
      </main>

      {/* Add Event Modal */}
      {showAddEvent && (
        <AddEventModal
          patient={currentPatient}
          cycle={activeCycle}
          onClose={() => setShowAddEvent(false)}
          onEventAdded={handleEventAdded}
        />
      )}
    </div>
  );
}
