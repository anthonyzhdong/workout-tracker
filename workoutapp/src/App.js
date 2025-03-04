import React from 'react';
import WorkoutForm from './workoutform';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Workout Tracker
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-6 text-center">
            Log your workout exercises using the form below.
          </p>
          <WorkoutForm />
        </div>
      </div>
    </div>
  );
}

export default App;