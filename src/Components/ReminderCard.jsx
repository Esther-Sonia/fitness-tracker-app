import { useState, useEffect } from 'react';

const ReminderCard = ({ workouts }) => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const calculateStreak = () => {
      
      //Here you sort streak with most recent first
      const sortedWorkouts = workouts.sort((a, b) => new Date(b.date) - new Date(a.date)); 
      let streakCount = 0;
      const today = new Date();

      sortedWorkouts.forEach((workout, index) => {
        const workoutDate = new Date(workout.date);
        const diffInDays = Math.floor((today - workoutDate) / (1000 * 60 * 60 * 24));

        if (diffInDays === streakCount) {
          streakCount++;
        }
      });
      setStreak(streakCount);
    };

    calculateStreak();
  }, [workouts]);

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            Don't forget to log your workout today! You're on a {streak}-day streak.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReminderCard;
