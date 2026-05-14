import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
// 👇 CORRECCIÓN: La ruta correcta es ./context/AuthContext
import { AuthProvider } from './context/AuthContext'; 
import './App.css'; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;