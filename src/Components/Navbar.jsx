import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="font-bold text-xl">FitTrack</Link>
        <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/log-workout" className="hover:underline">Log Workout</Link>
          <Link to="/history" className="hover:underline">History</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;