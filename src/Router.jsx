import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import WorkoutFormPage from './Pages/WorkoutFormPage';
import Historypage from './Pages/HistoryPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/log-workout" element={<WorkoutFormPage />} />
      <Route path="/history" element={<Historypage />} />
    </Routes>
  );
};

export default AppRoutes;