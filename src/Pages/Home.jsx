import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative w-full h-screen">
      
      {/* Background image code here*/}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/image6.jpg')` }}
      ></div>

      {/* insert dark overlay code here */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      
      <div className="relative z-10 flex justify-center items-center w-full h-full px-4">
        <div className="bg-[#1e3a5f]/90 text-white rounded-lg shadow-lg p-10 w-full max-w-6xl text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to FitTrack</h1>
          <p className="text-xl mb-8">Track your workouts and achieve your fitness goals</p>

          <div className="grid md:grid-cols-3 gap-6">
            
            
            <Link to="/log-workout" className="block group">
              <div className="bg-white text-black p-6 rounded-lg shadow group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 group-hover:bg-blue-50 cursor-pointer">
                <h2 className="text-2xl font-semibold mb-3 group-hover:text-blue-600">Log Workouts</h2>
                <p>Record your exercise details</p>
              </div>
            </Link>

            
            <Link to="/dashboard" className="block group">
              <div className="bg-white text-black p-6 rounded-lg shadow group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 group-hover:bg-green-50 cursor-pointer">
                <h2 className="text-2xl font-semibold mb-3 group-hover:text-green-600">View Stats</h2>
                <p>See your progress on the dashboard</p>
              </div>
            </Link>

            
            <Link to="/history" className="block group">
              <div className="bg-white text-black p-6 rounded-lg shadow group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 group-hover:bg-purple-50 cursor-pointer">
                <h2 className="text-2xl font-semibold mb-3 group-hover:text-purple-600">History</h2>
                <p>Review all your past workouts</p>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
