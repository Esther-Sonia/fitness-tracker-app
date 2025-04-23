import { useEffect, useState } from 'react';

const HistoryList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/workouts')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch workouts');
        }
        return res.json();
      })
      .then(data => setWorkouts(data))
      .catch(err => {
        setError(err.message);
        console.error('Error fetching workouts:', err);
      });
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      {workouts.length === 0 ? (
        <div>No workouts logged yet! 🏋️‍♂️</div>
      ) : (
        workouts.map((workout, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <h3 className="font-semibold capitalize">{workout.type}</h3> 
              <span className="text-sm text-gray-500">{workout.date}</span>
            </div>
            <p>Duration: {workout.duration} minutes</p>
          </div>
        ))
      )}
    </div>
  );
};

export default HistoryList;
