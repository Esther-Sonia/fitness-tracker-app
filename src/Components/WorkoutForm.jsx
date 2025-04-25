import { useState } from 'react';
//change of workout types arrays here
const workoutTypes = [
  { id: '1', type: 'Running', icon: '🏃‍♂️' },
  { id: '2', type: 'Yoga', icon: '🧘‍♀️' },
  { id: '3', type: 'Cycling', icon: '🚴‍♀️' },
  { id: '4', type: 'Weightlifting', icon: '🏋️‍♀️' },
  { id: '5', type: 'Swimming', icon: '🏊‍♂️' },
  { id: '6', type: 'Walking', icon: '🚶‍♂️' },
  { id: '8', type: 'Basketball', icon: '🏀' },
];

const WorkoutForm = () => { //additional field in the workout form 
  const [workoutData, setWorkoutData] = useState({
    type: '',
    duration: '',
    date: '',
    notes: '',
    distance: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData({
      ...workoutData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setFormSuccess(false);
    
    const formattedData = {
      ...workoutData,
      duration: Number(workoutData.duration),
      distance: workoutData.distance ? Number(workoutData.distance) : undefined,
    };

    try {
      const response = await fetch('https://fitness-json-api.onrender.com/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error('Failed to save workout');
      }

      const data = await response.json();
      console.log('Workout submitted:', data);
      setFormSuccess(true);
      
      setWorkoutData({
        type: '',
        duration: '',
        date: '',
        notes: '',
        distance: '',
      });
      
      setTimeout(() => {
        setFormSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting workout:', error);
      setFormError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedWorkout = workoutTypes.find(w => w.type === workoutData.type);

  return (  //additional styling and input fields 
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md text-gray-900">
      <h1 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
        <span className="mr-2">📝</span> Log Your Workout
      </h1>
      
      {formSuccess && ( //form submission handling
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center">
          <span className="mr-2">✅</span>
          Workout logged successfully!
        </div>
      )}
      
      {formError && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          Error: {formError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-1 text-gray-800">Workout Type</label>
          <select
            name="type"
            value={workoutData.type}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-500 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition text-gray-900"
          >
            <option value="" disabled>
              Select a workout type
            </option>
            {workoutTypes.map((workout) => ( //include icons here
              <option key={workout.id} value={workout.type}>
                {workout.icon} {workout.type}
              </option>
            ))}
          </select>
        </div>
        
        {selectedWorkout && (
          <div className="mb-5 p-3 bg-blue-50 rounded-md flex items-center">
            <span className="text-2xl mr-3">{selectedWorkout.icon}</span>
            <span>You selected <strong>{selectedWorkout.type}</strong></span>
          </div>
        )}
        


        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-800">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              value={workoutData.duration}
              onChange={handleChange}
              required
              min="1"
              placeholder="e.g., 30"
              className="w-full p-3 border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900 placeholder-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-800">Date</label>
            <input
              type="date"
              name="date"
              value={workoutData.date}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
            />
          </div>
        </div>
        
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-1 text-gray-800">Distance (optional)</label>
          <div className="flex">
            <input
              type="number"
              name="distance"
              value={workoutData.distance}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="e.g., 5.5"
              className="flex-1 p-3 border border-gray-500 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900 placeholder-gray-600"
            />
            <span className="bg-gray-100 p-3 border border-l-0 border-gray-500 rounded-r-md whitespace-nowrap">
              km
            </span>
          </div>
        </div>
        
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-1 text-gray-800">Notes (optional)</label>
          <textarea
            name="notes"
            value={workoutData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="How did it go? Any achievements worth noting?"
            className="w-full p-3 border border-gray-500 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900 placeholder-gray-600"
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          disabled={submitting}
          className={`w-full p-3 rounded-md font-medium text-white transition ${
            submitting 
              ? 'bg-gray-500 cursor-not-allowed' 
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          {submitting ? 'Saving...' : 'Log Workout'}
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;
