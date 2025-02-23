import React, { useState } from 'react';

const WorkoutForm = () => {
  const [workoutData, setWorkoutData] = useState({
    exercise: '',
    weight: '',
    reps: ''
  });
  
  const [exerciseList, setExerciseList] = useState([]);

  const exercises = [
    'Bench Press', 'Squat', 'Deadlift', 'Overhead Press', 'Pull-Ups', 'Dumbbell Rows',
    'Bicep Curls', 'Tricep Dips', 'Lunges', 'Leg Press'
  ];
  const [errors, setErrors] = useState({
    weight: '',
    reps: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
    
    // For number inputs, remove any '+' or '-' signs and validate
    if (name === 'weight' || name === 'reps') {
      const sanitizedValue = value.replace(/[+-]/g, '');
      if (sanitizedValue === '' || Number(sanitizedValue) > 0) {
        setWorkoutData(prev => ({
          ...prev,
          [name]: sanitizedValue
        }));
      }
    } else {
      setWorkoutData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateField = (name, value) => {

    if(name === 'weight' || name === 'reps') {
      const numValue = Number(value);
      if(numValue <= 0){
        return `${name.charAt(0).toUpperCase() + name.slice(1)} value must be greater than 0`;
      }
    }

  };

  const handleAddExercise = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      weight: validateField('weight', workoutData.weight),
      reps: validateField('reps', workoutData.reps)
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (!Object.values(newErrors).some(error => error) && 
        workoutData.exercise && workoutData.weight && workoutData.reps) {
      setExerciseList(prev => [...prev, { ...workoutData, id: Date.now() }]);
      setWorkoutData({
        exercise: '',
        weight: '',
        reps: ''
      });
      setErrors({
        weight: '',
        reps: ''
      });
    }
  }
  

  const handleRemoveExercise = (id) => {
    setExerciseList(prev => prev.filter(exercise => exercise.id !== id));
  };

  const handleSubmitWorkout = (e) => {
    e.preventDefault();
    console.log('Complete workout:', exerciseList);
    setExerciseList([]);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <form onSubmit={handleAddExercise} className="space-y-6 mb-8">
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

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Weight (kgs)</label>
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
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all shadow-md"
        >
          Add Exercise
        </button>
      </form>

      {exerciseList.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Added Exercises:</h3>
          <div className="space-y-3">
            {exerciseList.map((exercise) => (
              <div
                key={exercise.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{exercise.exercise}</p>
                  <p className="text-sm text-gray-600">
                    {exercise.weight}kg × {exercise.reps} reps
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveExercise(exercise.id)}
                  className="px-3 py-1 text-sm text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                  type="button"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmitWorkout}
            className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all shadow-md"
          >
            Complete Workout
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkoutForm;