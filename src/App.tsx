import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './features/auth';
import { LoginPage } from './features/auth';
import { PatientListPage, PatientDetailPage } from './features/patients';
import { PredictionsPage } from './features/predictions';
import { SimulationsPage } from './features/simulations';
import { ProtectedRoute } from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route
              path="/patients"
              element={
                <ProtectedRoute>
                  <PatientListPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/patients/:id"
              element={
                <ProtectedRoute>
                  <PatientDetailPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/predictions"
              element={
                <ProtectedRoute>
                  <PredictionsPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/simulations"
              element={
                <ProtectedRoute>
                  <SimulationsPage />
                </ProtectedRoute>
              }
            />
            
            <Route path="/" element={<Navigate to="/patients" replace />} />
            <Route path="*" element={<Navigate to="/patients" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
