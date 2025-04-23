import { useState } from 'react';

const workoutTypes = [
  { id: '1', type: 'Running' },
  { id: '2', type: 'Yoga' },
  { id: '3', type: 'Cycling' },
  { id: '4', type: 'Weightlifting' },
];

const WorkoutForm = () => {
  const [workoutData, setWorkoutData] = useState({
    type: '',
    duration: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData({
      ...workoutData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    workoutData.duration = Number(workoutData.duration); 

    try {
      const response = await fetch('http://localhost:3001/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workoutData),
      });

      if (!response.ok) {
        throw new Error('Failed to save workout');
      }

      const data = await response.json();
      console.log('Workout submitted:', data);
      alert('Workout logged successfully!');
    } catch (error) {
      console.error('Error submitting workout:', error);
      alert('Something went wrong ');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Log Your Workout</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Workout Type</label>
          <select
            name="type"
            value={workoutData.type}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          >
            <option value="" disabled>
              Select a workout type
            </option>
            {workoutTypes.map((workout) => (
              <option key={workout.id} value={workout.type}>
                {workout.type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={workoutData.duration}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Date</label>
          <input
            type="date"
            name="date"
            value={workoutData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Log Workout
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;