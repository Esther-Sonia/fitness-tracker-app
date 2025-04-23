import { useState, useEffect } from 'react';
import DashboardData from '../Components/DashboardData';
import ReminderCard from '../Components/ReminderCard';

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const response = await fetch('http://localhost:3001/workouts');
       
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error('Failed to fetch workout data:', error);
      }
    };

    fetchWorkoutData();
  }, []);

  return (
    <div>
      <DashboardData />
      <ReminderCard workouts={workouts} />
    </div>
  );
};

export default Dashboard;
