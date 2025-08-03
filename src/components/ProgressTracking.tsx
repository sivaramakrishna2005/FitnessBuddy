import React, { useState } from 'react';
import { Trophy, TrendingUp, Calendar, Award, Target, Zap, CheckCircle } from 'lucide-react';
import { UserData, WorkoutPlan } from '../types';

interface ProgressTrackingProps {
  userData: UserData | null;
  completedWorkouts: WorkoutPlan[];
}

const ProgressTracking: React.FC<ProgressTrackingProps> = ({ userData, completedWorkouts }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  // Dynamic progress data based on user profile
  const getProgressData = () => {
    if (!userData) return null;
    
    const baseWorkouts = userData.fitnessLevel === 'beginner' ? 3 : userData.fitnessLevel === 'intermediate' ? 5 : 7;
    const totalWorkouts = userData.fitnessLevel === 'beginner' ? 15 : userData.fitnessLevel === 'intermediate' ? 35 : 58;
    const streak = userData.fitnessLevel === 'beginner' ? 5 : userData.fitnessLevel === 'intermediate' ? 8 : 12;
    const calories = baseWorkouts * (userData.workoutTime * 8); // Rough calculation
    
    return {
      weeklyWorkouts: baseWorkouts,
      totalWorkouts,
      streakDays: streak,
      caloriesBurned: calories,
      favoriteWorkout: userData.fitnessGoal === 'weight-loss' ? 'HIIT Cardio' : userData.fitnessGoal === 'muscle-gain' ? 'Strength Training' : 'Full Body',
      achievements: [
        { id: 1, name: 'First Workout', icon: '🎯', earned: true },
        { id: 2, name: 'Week Warrior', icon: '💪', earned: baseWorkouts >= 3 },
        { id: 3, name: 'Consistency King', icon: '👑', earned: streak >= 7 },
        { id: 4, name: 'Month Master', icon: '🏆', earned: totalWorkouts >= 20 },
        { id: 5, name: 'Calorie Crusher', icon: '🔥', earned: calories >= 1000 },
        { id: 6, name: 'Goal Getter', icon: '⭐', earned: userData.fitnessLevel !== 'beginner' }
      ]
    };
  };
  
  const progressData = getProgressData();

  const getWeeklyData = () => {
    if (!userData || !progressData) return [];
    
    const avgCaloriesPerWorkout = userData.workoutTime * 8;
    const workoutsPerWeek = progressData.weeklyWorkouts;
    
    return [
      { day: 'Mon', workouts: Math.random() > 0.3 ? 1 : 0, calories: Math.random() > 0.3 ? avgCaloriesPerWorkout : 0 },
      { day: 'Tue', workouts: Math.random() > 0.4 ? 1 : 0, calories: Math.random() > 0.4 ? avgCaloriesPerWorkout : 0 },
      { day: 'Wed', workouts: Math.random() > 0.2 ? 1 : 0, calories: Math.random() > 0.2 ? avgCaloriesPerWorkout : 0 },
      { day: 'Thu', workouts: Math.random() > 0.3 ? 1 : 0, calories: Math.random() > 0.3 ? avgCaloriesPerWorkout : 0 },
      { day: 'Fri', workouts: Math.random() > 0.5 ? 1 : 0, calories: Math.random() > 0.5 ? avgCaloriesPerWorkout : 0 },
      { day: 'Sat', workouts: Math.random() > 0.2 ? 1 : 0, calories: Math.random() > 0.2 ? avgCaloriesPerWorkout : 0 },
      { day: 'Sun', workouts: Math.random() > 0.4 ? 1 : 0, calories: Math.random() > 0.4 ? avgCaloriesPerWorkout : 0 }
    ];
  };
  
  const weeklyData = getWeeklyData();

  if (!userData) {
    return (
      <div className="max-w-4xl mx-auto animate-slideInUp">
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8 text-center">
          <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Complete Your Profile First</h3>
          <p className="text-gray-300">Please fill out your profile to start tracking your fitness progress.</p>
        </div>
      </div>
    );
  }
  
  if (!progressData) return null;

  return (
    <div className="max-w-6xl mx-auto animate-slideInUp">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Your Progress</h2>
        <p className="text-gray-300">Track your fitness journey and celebrate your achievements, {userData.name}!</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-white">{progressData.weeklyWorkouts}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-300">This Week</h3>
          <p className="text-xs text-gray-500">Workouts completed</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-2xl font-bold text-white">{progressData.totalWorkouts}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-300">Total Workouts</h3>
          <p className="text-xs text-gray-500">All time</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-white">{progressData.streakDays}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-300">Current Streak</h3>
          <p className="text-xs text-gray-500">Days active</p>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-white">{progressData.caloriesBurned}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-300">Calories Burned</h3>
          <p className="text-xs text-gray-500">This week</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Activity Chart */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Weekly Activity</h3>
            <div className="flex space-x-2">
              {['week', 'month', 'year'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period as any)}
                  className={`px-3 py-1 text-sm rounded-lg transition-all duration-200 transform hover:scale-105 ${
                    selectedPeriod === period
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-300">{day.day}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="flex-1 bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-emerald-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(day.workouts / 2) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-300">{day.workouts}</span>
                  </div>
                  <div className="text-xs text-gray-500">{Math.round(day.calories)} calories</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6">Achievements</h3>
          <div className="space-y-4">
            {progressData.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                  achievement.earned
                    ? 'border-emerald-500 bg-emerald-900/20'
                    : 'border-gray-600 bg-gray-700/50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                  achievement.earned ? 'bg-emerald-600/20' : 'bg-gray-600/20'
                }`}>
                  {achievement.earned ? achievement.icon : '🔒'}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    achievement.earned ? 'text-emerald-400' : 'text-gray-400'
                  }`}>
                    {achievement.name}
                  </h4>
                  <p className={`text-sm ${
                    achievement.earned ? 'text-emerald-300' : 'text-gray-500'
                  }`}>
                    {achievement.earned ? 'Unlocked!' : 'Keep going to unlock'}
                  </p>
                </div>
                {achievement.earned && (
                  <Award className="w-5 h-5 text-emerald-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personal Records */}
      <div className="mt-8 bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-6">Personal Records</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-900/20 to-emerald-900/20 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-1">Longest Streak</h4>
            <p className="text-2xl font-bold text-blue-400 mb-1">{Math.max(progressData.streakDays, 14)} days</p>
            <p className="text-sm text-gray-400">Personal Best</p>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-emerald-900/20 to-blue-900/20 rounded-lg border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-1">Most Workouts</h4>
            <p className="text-2xl font-bold text-emerald-400 mb-1">{Math.max(progressData.weeklyWorkouts, 6)} per week</p>
            <p className="text-sm text-gray-400">Weekly Record</p>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-lg border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-1">Calories Burned</h4>
            <p className="text-2xl font-bold text-orange-400 mb-1">{Math.max(progressData.caloriesBurned, 2400)}</p>
            <p className="text-sm text-gray-400">Weekly Best</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;