import React, { useState } from 'react';

const WorkoutForm = () => {
  const [currentExercise, setCurrentExercise] = useState({
    name: '',
    sets: [{ weight: '', reps: '' }]  // Start with one empty set
  });
  
  const [exerciseList, setExerciseList] = useState([]);

  const exercises = [
    'Bench Press', 'Squat', 'Deadlift', 'Overhead Press', 'Pull-Ups', 'Dumbbell Rows',
    'Bicep Curls', 'Tricep Dips', 'Lunges', 'Leg Press'
  ];

  const handleExerciseChange = (e) => {
    setCurrentExercise({
      name: e.target.value,
      sets: [{ weight: '', reps: '' }]
    });
  };

  const handleSetChange = (index, field, value) => {
    // Remove any +/- characters from input
    const sanitizedValue = value.replace(/[+-]/g, '');
    
    setCurrentExercise(prev => {
      const newSets = [...prev.sets];
      newSets[index] = {
        ...newSets[index],
        [field]: sanitizedValue
      };
      return {
        ...prev,
        sets: newSets
      };
    });
  };

  const addSet = () => {
    setCurrentExercise(prev => ({
      ...prev,
      sets: [...prev.sets, { weight: '', reps: '' }]
    }));
  };

  const removeSet = (indexToRemove) => {
    setCurrentExercise(prev => ({
      ...prev,
      sets: prev.sets.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleAddExercise = (e) => {
    e.preventDefault();
    
    // Validate all sets have values and are positive numbers
    const isValid = currentExercise.name && 
                   currentExercise.sets.every(set => 
                     set.weight && Number(set.weight) > 0 && 
                     set.reps && Number(set.reps) > 0
                   );

    if (isValid) {
      setExerciseList(prev => [...prev, { 
        ...currentExercise, 
        id: Date.now() 
      }]);
      
      // Reset form
      setCurrentExercise({
        name: '',
        sets: [{ weight: '', reps: '' }]
      });
    }
  };

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
            value={currentExercise.name}
            onChange={handleExerciseChange}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            required
          >
            <option value="">Select an exercise</option>
            {exercises.map((exercise, index) => (
              <option key={index} value={exercise}>{exercise}</option>
            ))}
          </select>
        </div>

        {currentExercise.name && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium text-gray-700">Sets</h3>
              <button
                type="button"
                onClick={addSet}
                className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-200 transition-colors"
              >
                Add Set
              </button>
            </div>

            {currentExercise.sets.map((set, index) => (
            <div key={index} className="flex items-end gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-600 mb-2">Set {index + 1}</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600">Weight (kgs)</label>
                    <input
                      type="number"
                      value={set.weight}
                      onChange={(e) => handleSetChange(index, 'weight', e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === '-' || e.key === '+') {
                          e.preventDefault();
                        }
                      }}
                      className="w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      placeholder="135"
                      min="0.1"
                      step="0.1"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600">Reps</label>
                    <input
                      type="number"
                      value={set.reps}
                      onChange={(e) => handleSetChange(index, 'reps', e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === '-' || e.key === '+') {
                          e.preventDefault();
                        }
                      }}
                      className="w-full rounded-lg border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      placeholder="8"
                      min="1"
                      step="1"
                      required
                    />
                  </div>
                </div>
              </div>
              {currentExercise.sets.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSet(index)}
                  className="text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          </div>
        )}

        {currentExercise.name && (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all shadow-md"
          >
            Add Exercise
          </button>
        )}
      </form>

      {exerciseList.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Added Exercises:</h3>
          <div className="space-y-3">
            {exerciseList.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-800">{exercise.name}</h4>
                  <button
                    onClick={() => handleRemoveExercise(exercise.id)}
                    className="text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-1">
                  {exercise.sets.map((set, index) => (
                    <p key={index} className="text-sm text-gray-600">
                      Set {index + 1}: {set.weight}kg × {set.reps} reps
                    </p>
                  ))}
                </div>
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