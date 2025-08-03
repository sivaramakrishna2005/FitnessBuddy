import React, { useState, useEffect } from 'react';
import { Target, Clock, Zap, Play, CheckCircle } from 'lucide-react';
import { UserData, WorkoutPlan } from '../types';
import { WorkoutService } from '../services/WorkoutService';

interface WorkoutRecommendationsProps {
  userData: UserData | null;
}

const WorkoutRecommendations: React.FC<WorkoutRecommendationsProps> = ({ userData }) => {
  const [workouts, setWorkouts] = useState<WorkoutPlan[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const workoutService = new WorkoutService();

  useEffect(() => {
    const fetchWorkouts = async () => {
      setIsLoading(true);
      const recommendedWorkouts = await workoutService.getRecommendedWorkouts(userData);
      setWorkouts(recommendedWorkouts);
      setIsLoading(false);
    };

    fetchWorkouts();
  }, [userData]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  if (!userData) {
    return (
      <div className="max-w-4xl mx-auto animate-slideInUp">
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8 text-center">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Complete Your Profile First</h3>
          <p className="text-gray-300">Please fill out your profile to get personalized workout recommendations.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto animate-slideInUp">
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-600 rounded w-1/3"></div>
            <div className="space-y-3">
              <div className="h-24 bg-gray-600 rounded"></div>
              <div className="h-24 bg-gray-600 rounded"></div>
              <div className="h-24 bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-slideInUp">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Personalized Workouts</h2>
        <p className="text-gray-300">
          Tailored for your {userData.fitnessLevel} level • {userData.workoutTime} minute sessions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workout List */}
        <div className="space-y-4">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className={`bg-gray-800 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-2xl transform hover:scale-105 ${
                selectedWorkout?.id === workout.id
                  ? 'border-blue-500 shadow-2xl shadow-blue-500/20'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setSelectedWorkout(workout)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{workout.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{workout.duration} min</span>
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}>
                        {workout.difficulty}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 bg-blue-600/20 text-blue-400 rounded-full hover:bg-blue-600/30 transition-all duration-200 transform hover:scale-110">
                    <Play className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {workout.targetMuscles.map((muscle) => (
                    <span
                      key={muscle}
                      className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {workout.exercises.length} exercises
                  </span>
                  <div className="flex space-x-1">
                    {workout.equipment.map((eq) => (
                      <span key={eq} className="text-xs text-gray-500">
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Workout Details */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 sticky top-4 shadow-2xl">
          {selectedWorkout ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">{selectedWorkout.name}</h3>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2 transform hover:scale-105 shadow-lg">
                  <Play className="w-4 h-4" />
                  <span>Start Workout</span>
                </button>
              </div>

              <div className="space-y-4">
                {selectedWorkout.exercises.map((exercise, index) => (
                  <div key={exercise.id} className="flex items-start space-x-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white mb-1">{exercise.name}</h4>
                      <p className="text-sm text-gray-300 mb-2">
                        {exercise.reps && <span>{exercise.reps} • </span>}
                        {exercise.duration && <span>{exercise.duration}</span>}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {exercise.targetMuscles.map((muscle) => (
                          <span key={muscle} className="px-2 py-0.5 bg-gray-800 text-gray-300 text-xs rounded">
                            {muscle}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-emerald-400 transition-colors duration-200 transform hover:scale-110">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <Target className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Select a Workout</h3>
              <p className="text-gray-300">Choose a workout from the list to see detailed exercises.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutRecommendations;