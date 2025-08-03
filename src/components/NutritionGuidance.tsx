import React, { useState, useEffect } from 'react';
import { Utensils, Clock, Heart, Leaf, ChefHat } from 'lucide-react';
import { UserData, MealSuggestion } from '../types';
import { NutritionService } from '../services/NutritionService';

interface NutritionGuidanceProps {
  userData: UserData | null;
}

const NutritionGuidance: React.FC<NutritionGuidanceProps> = ({ userData }) => {
  const [meals, setMeals] = useState<MealSuggestion[]>([]);
  const [selectedMealType, setSelectedMealType] = useState<'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack'>('all');
  const [isLoading, setIsLoading] = useState(true);

  const nutritionService = new NutritionService();

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const mealSuggestions = await nutritionService.getMealRecommendations(userData);
      setMeals(mealSuggestions);
      setIsLoading(false);
    };

    fetchMeals();
  }, [userData]);

  const filteredMeals = selectedMealType === 'all' 
    ? meals 
    : meals.filter(meal => meal.type === selectedMealType);

  const getMealTypeIcon = (type: string) => {
    switch (type) {
      case 'breakfast': return '🌅';
      case 'lunch': return '☀️';
      case 'dinner': return '🌙';
      case 'snack': return '🍎';
      default: return '🍽️';
    }
  };

  const getMealTypeColor = (type: string) => {
    switch (type) {
      case 'breakfast': return 'bg-yellow-100 text-yellow-800';
      case 'lunch': return 'bg-orange-100 text-orange-800';
      case 'dinner': return 'bg-purple-100 text-purple-800';
      case 'snack': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  if (!userData) {
    return (
      <div className="max-w-4xl mx-auto animate-slideInUp">
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8 text-center">
          <Utensils className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Complete Your Profile First</h3>
          <p className="text-gray-300">Please fill out your profile to get personalized nutrition recommendations.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto animate-slideInUp">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-600 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <div className="h-4 bg-gray-600 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-600 rounded w-1/2 mb-2"></div>
                <div className="h-20 bg-gray-600 rounded mb-4"></div>
                <div className="h-3 bg-gray-600 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-slideInUp">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Nutrition Guidance</h2>
        <p className="text-gray-300">
          Personalized meal suggestions based on your dietary preferences and fitness goals
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Daily Intake Targets</h2>

      </div>
      
      {/* Daily Nutrition Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Daily Calories</p>
              <p className="text-lg font-semibold text-white">
                {userData.fitnessGoal === 'weight-loss' ? '1,800' : userData.fitnessGoal === 'muscle-gain' ? '2,500' : '2,200'}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Utensils className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Protein</p>
              <p className="text-lg font-semibold text-white">
                {userData.fitnessGoal === 'muscle-gain' ? '180g' : '150g'}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Carbs</p>
              <p className="text-lg font-semibold text-white">
                {userData.fitnessGoal === 'weight-loss' ? '180g' : '275g'}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Fats</p>
              <p className="text-lg font-semibold text-white">
                {userData.fitnessGoal === 'weight-loss' ? '60g' : '73g'}
              </p>
            </div>
          </div>
        </div>
      </div>
            {/* Meal Type Filter */}
            <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Meal Suggestions</h2>
      </div>
      <div className="mb-8 bg-gray-800 rounded-xl border border-gray-700 p-4 shadow-lg">
        <div className="flex flex-wrap gap-2">
          {['all', 'breakfast', 'lunch', 'dinner', 'snack'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedMealType(type as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedMealType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {type === 'all' ? '🍽️ All Meals' : `${getMealTypeIcon(type)} ${type.charAt(0).toUpperCase() + type.slice(1)}`}
            </button>
          ))}
        </div>
      </div>

      {/* Meal Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeals.map((meal) => (
          <div key={meal.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getMealTypeIcon(meal.type)}</span>
                  <h3 className="text-lg font-semibold text-white">{meal.name}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMealTypeColor(meal.type)}`}>
                  {meal.type}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-white mb-2">Ingredients:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  {meal.ingredients.slice(0, 3).map((ingredient, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                  {meal.ingredients.length > 3 && (
                    <li className="text-xs text-gray-500">+{meal.ingredients.length - 3} more ingredients</li>
                  )}
                </ul>
              </div>

              {/* Nutrition Info */}
              <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gray-700 rounded-lg">
                <div className="text-center">
                  <p className="text-sm font-medium text-white">{meal.nutritionInfo.calories}</p>
                  <p className="text-xs text-gray-400">Calories</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-white">{meal.nutritionInfo.protein}g</p>
                  <p className="text-xs text-gray-400">Protein</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-white">{meal.nutritionInfo.carbs}g</p>
                  <p className="text-xs text-gray-400">Carbs</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-white">{meal.nutritionInfo.fat}g</p>
                  <p className="text-xs text-gray-400">Fat</p>
                </div>
              </div>

              {/* Dietary Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {meal.dietaryTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionGuidance;