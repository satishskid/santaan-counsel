import { create } from 'zustand';

export const usePatientStore = create((set) => ({
  currentPatient: null,
  patients: [],
  timeline: [],
  loading: false,
  
  setCurrentPatient: (patient) => set({ currentPatient: patient }),
  
  setPatients: (patients) => set({ patients }),
  
  setTimeline: (timeline) => set({ timeline }),
  
  setLoading: (loading) => set({ loading }),
  
  addTimelineEvent: (event) => set((state) => ({
    timeline: [event, ...state.timeline],
  })),
  
  updatePatient: (updatedPatient) => set((state) => ({
    currentPatient: state.currentPatient?.id === updatedPatient.id 
      ? updatedPatient 
      : state.currentPatient,
    patients: state.patients.map(p => 
      p.id === updatedPatient.id ? updatedPatient : p
    ),
  })),
}));
