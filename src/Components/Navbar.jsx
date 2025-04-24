import { Link } from 'react-router-dom';

const Navbar = () => {
  return ( //changes to nav classname styling for this 3
    <nav className="bg-[#1e3a5f]/90 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-2xl">🧘FitTrack</Link>

        {/* made upates here */}
        <div className="space-x-2">
          <Link 
            to="/" 
            className="px-4 py-2 rounded-full bg-gray-500 hover:bg-white hover:text-gray-600 transition"
          >
            Home
          </Link>
          <Link 
            to="/dashboard" 
            className="px-4 py-2 rounded-full bg-gray-500 hover:bg-white hover:text-gray-600 transition"
          >
            Dashboard
          </Link>
          <Link 
            to="/log-workout" 
            className="px-4 py-2 rounded-full bg-gray-500 hover:bg-white hover:text-gray-600 transition"
          >
            Log Workout
          </Link>
          <Link 
            to="/history" 
            className="px-4 py-2 rounded-full bg-gray-500 hover:bg-white hover:text-gray-600 transition"
          >
            History
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
