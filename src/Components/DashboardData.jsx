import { useEffect, useState } from 'react';

const DashboardData = () => {
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalMinutes: 0,
    avgDuration: 0,
  });

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const response = await fetch('http://localhost:3001/workouts');
        
         const data = await response.json();
        console.log('API Response:', data);

        const workouts = Array.isArray(data) ? data : [];
        console.log('Processed workouts:', workouts); 

        const totalMinutes = workouts.reduce(
          (sum, workout) => sum + (Number(workout.duration) || 0),
          0
        );
        
        setStats({
          totalWorkouts: workouts.length,
          totalMinutes,
          avgDuration: workouts.length > 0 
            ? (totalMinutes / workouts.length).toFixed(1) 
            : 0,
        });

      } catch (error) {
        console.error('Failed to fetch workout data:', error);
      }
    };

    fetchWorkoutData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Total Workouts</h3>
        <p className="text-2xl">{stats.totalWorkouts}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Total Minutes</h3>
        <p className="text-2xl">{stats.totalMinutes}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Avg Duration</h3>
        <p className="text-2xl">{stats.avgDuration} mins</p>
      </div>
    </div>
  );
};

export default DashboardData;