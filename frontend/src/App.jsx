import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientView from './pages/PatientView';
import PatientViewV2 from './pages/PatientViewV2';
import PatientView3Col from './pages/PatientView3Col';
import './index.css';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
        />
        
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/patients/:id"
          element={
            <PrivateRoute>
              <PatientView3Col />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/patients-v2/:id"
          element={
            <PrivateRoute>
              <PatientViewV2 />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/patients-old/:id"
          element={
            <PrivateRoute>
              <PatientView />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
