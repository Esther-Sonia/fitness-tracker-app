import { useEffect, useState } from 'react';

const HistoryList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [editFormData, setEditFormData] = useState({
    type: '',
    duration: '',
    distance: '',
    notes: ''
  });

  // Load workouts from the server
  useEffect(() => {
    fetch('https://fitness-json-api.onrender.com/workouts')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch workouts');
        return res.json();
      })
      .then(data => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // add Icons for workout types
  const workoutIcons = {
    Running: '🏃‍♀️',
    Yoga: '🧘‍♀️',
    Cycling: '🚴‍♀️',
    Swimming: '🏊‍♀️',
    Walking: '🚶‍♀️',
    Weightlifting: '🏋️‍♀️',
    Basketball: '🏀',
    default: '💪'
  };

  // add delete a workout functionality
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Delete this workout?');
    if (confirmDelete) {
      fetch(`https://fitness-json-api.onrender.com/workouts/${id}`, { method: 'DELETE' })
        .then(() => {
          setWorkouts(workouts.filter(w => w.id !== id));
        })
        .catch(err => setError(err.message));
    }
  };

  // add edit a workout functionality
  const handleEdit = (workout) => {
    setEditingWorkout(workout);
    setEditFormData({
      type: workout.type,
      duration: workout.duration,
      distance: workout.distance || '',
      notes: workout.notes || ''
    });
  };

  // Cancel editing
  const handleCancelEdit = () => setEditingWorkout(null);

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Save updated workout
  const handleSaveEdit = () => {
    const updatedWorkout = {
      ...editingWorkout,
      ...editFormData,
      duration: parseInt(editFormData.duration),
      distance: editFormData.distance ? parseFloat(editFormData.distance) : null
    };

    fetch(`https://fitness-json-api.onrender.com/workouts/${editingWorkout.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedWorkout)
    })
      .then(res => res.json())
      .then(data => {
        setWorkouts(workouts.map(w => (w.id === data.id ? data : w)));
        setEditingWorkout(null);
      })
      .catch(err => setError(err.message));
  };

  if (loading) return <div className="text-center py-8">Loading workouts...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-white text-center mb-6">Your Workout History</h2>

      {workouts.length === 0 ? (
        <div className="text-center bg-white p-8 rounded shadow-md">
          <p className="text-lg">No workouts yet! </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...workouts]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(workout => {
              const icon = workoutIcons[workout.type] || workoutIcons.default;

              return ( //change styling
                <div key={workout.id} className="bg-white text-black rounded-lg shadow-md p-6">
                  {editingWorkout && editingWorkout.id === workout.id ? (
                    <div className="space-y-2">
                      <select name="type" value={editFormData.type} onChange={handleEditFormChange} className="w-full border p-2 rounded">
                        {Object.keys(workoutIcons).map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        name="duration"
                        placeholder="Duration (minutes)"
                        value={editFormData.duration}
                        onChange={handleEditFormChange}
                        className="w-full border p-2 rounded"
                      />
                      <input
                        type="number"
                        name="distance"
                        placeholder="Distance (km)"
                        value={editFormData.distance}
                        onChange={handleEditFormChange}
                        className="w-full border p-2 rounded"
                      />
                      <textarea
                        name="notes"
                        placeholder="Notes"
                        value={editFormData.notes}
                        onChange={handleEditFormChange}
                        className="w-full border p-2 rounded"
                      />
                      <div className="flex justify-between"> 
                        <button onClick={handleSaveEdit} className="text-green-600">Save</button>
                        <button onClick={handleCancelEdit} className="text-gray-600">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold text-black">{icon} {workout.type}</h3>
                        <span className="text-sm text-gray-600">{workout.date}</span>
                      </div>
                      <p className="text-black">Duration: {workout.duration} minutes</p>
                      {workout.distance && <p className="text-black">Distance: {workout.distance} km</p>}
                      {workout.notes && <p className="text-gray-600 text-sm mt-1">Notes: {workout.notes}</p>}

                      <div className="mt-3 space-x-3">
                        <button onClick={() => handleEdit(workout)} className="text-blue-500">Edit</button>
                        <button onClick={() => handleDelete(workout.id)} className="text-red-500">Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default HistoryList;
