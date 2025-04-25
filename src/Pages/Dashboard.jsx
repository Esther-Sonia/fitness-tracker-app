import { useState, useEffect } from 'react';
import DashboardData from '../Components/DashboardData';
import ReminderCard from '../Components/ReminderCard';

const Dashboard = () => {  //added error handling isloading and ser error
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkoutData = async () => { //chagnged error handling
      try {
        setIsLoading(true);
        const response = await fetch('https://fitness-json-api.onrender.com/workouts');

        if (!response.ok) {
          throw new Error('Failed to fetch workout data');
        }

        const data = await response.json();
        setWorkouts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch workout data:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchWorkoutData();
  }, []);

  return (
    <div className="relative w-full min-h-screen">
      
      {/* Background image code here*/}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/image6.jpg')` }}
      ></div>

      {/* Overlay for image here*/}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto text-white">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Fitness Dashboard</h1>
          <p className="mt-2">Track your workout progress and stay motivated</p>
        </header>

        {isLoading ? ( //ui for loading and error state
          <div className="text-center py-10">
            <p>Loading dashboard data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg">
            <p>Error loading data: {error}</p>
          </div>
        ) : ( //new grid layout
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white/90 text-black rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Workout Statistics</h2>
              <DashboardData workouts={workouts} />
            </div>

            <div className="space-y-6">
              <div className="bg-white/90 text-black rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Reminder!</h2>
                <ReminderCard workouts={workouts} /> 
              </div>

              <div className="bg-white/90 text-black rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Activity Summary</h2>
                <div className="space-y-4">
                 
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-md">
                    <span>This Week</span>
                    <span className="font-bold">
                      {workouts.filter(workout => {
                        const workoutDate = new Date(workout.date);
                        const today = new Date();
                        const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
                        return workoutDate >= weekStart;
                      }).length}
                    </span>
                  </div>

                  {workouts.length > 0 && (
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-md">
                      <span>Most Common</span>
                      <span className="font-bold capitalize">
                        {
                          Object.entries(
                            workouts.reduce((acc, workout) => {
                              acc[workout.type] = (acc[workout.type] || 0) + 1;
                              return acc;
                            }, {})
                          )
                            .sort((a, b) => b[1] - a[1])[0]?.[0] || 'None'
                        }
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
