import React, { useState } from 'react';

const WorkoutForm = () => {
  const [workoutData, setWorkoutData] = useState({
    exercise: '',
    weight: '',
    reps: ''
  });

  const exercises = [
    'Bench Press', 'Squat', 'Deadlift', 'Overhead Press', 'Pull-Ups', 'Dumbbell Rows',
    'Bicep Curls', 'Tricep Dips', 'Lunges', 'Leg Press'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Workout data:', workoutData);
    setWorkoutData({
      exercise: '',
      weight: '',
      reps: ''
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-blue-700">Exercise</label>
          <select
            name="exercise"
            value={workoutData.exercise}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="" disabled>Select an exercise</option>
            {exercises.map((exercise, index) => (
              <option key={index} value={exercise}>{exercise}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Weight (lbs)</label>
          <input
            type="number"
            name="weight"
            value={workoutData.weight}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder="135"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Reps</label>
          <input
            type="number"
            name="reps"
            value={workoutData.reps}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder="8"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all shadow-md"
        >
          Log Exercise
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;
