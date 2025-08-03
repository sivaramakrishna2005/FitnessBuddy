import React, { useState } from 'react';
import { Save, User, Target, Clock, Dumbbell } from 'lucide-react';
import { UserData } from '../types';

interface UserProfileProps {
  userData: UserData | null;
  onUpdateUserData: (data: UserData) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ userData, onUpdateUserData }) => {
  const [formData, setFormData] = useState<UserData>(userData || {
    name: '',
    age: null,
    gender: '',
    weight: null,
    height: null,
    fitnessGoal: '',
    fitnessLevel: '',
    workoutTime: null,
    equipment: [],
    dietaryPreferences: [],
    allergies: []
  });

  const [popup, setPopup] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleInputChange = (field: keyof UserData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: 'equipment' | 'dietaryPreferences' | 'allergies', value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      if (!formData.name) {
      setPopup({ message: '❌ Name is required!', type: 'error' });
    } else {
      onUpdateUserData(formData);
      setPopup({ message: '✅ Profile saved successfully!', type: 'success' });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setPopup(null), 3000);
  };

  const equipmentOptions = [
    'None (Bodyweight only)',
    'Dumbbells',
    'Resistance Bands',
    'Pull-up Bar',
    'Kettlebell',
    'Yoga Mat',
    'Stability Ball'
  ];

  const dietaryOptions = [
    'None',
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Keto',
    'Paleo',
    'Mediterranean',
    'Low-Carb'
  ];

  const allergyOptions = [
    'None',
    'Nuts',
    'Dairy',
    'Eggs',
    'Shellfish',
    'Soy',
    'Gluten',
    'Fish'
  ];

  return (
    <div className="max-w-4xl mx-auto animate-slideInUp">
            {/* ✅ Popup */}
      {popup && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 text-white transition-opacity duration-300 ${
            popup.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          <span className="text-xl">{popup.type === 'success' ? '✅' : '❌'}</span>
          <span>{popup.message}</span>
        </div>
      )}
      <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 px-6 py-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-white" />
            <h2 className="text-xl font-semibold text-white">Your Fitness Profile</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8 bg-gray-900">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-600" />
              <span>Basic Information</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  placeholder='Enter  your name'
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  placeholder='Enter Your Age'
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  min="13" max="100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value="">Select Your Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  placeholder='Enter Your Weight'
                  onChange={(e) => handleInputChange('weight', parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  min="30" max="300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Height (cms)</label>
                <input
                  type="number"
                  value={formData.height}
                  placeholder='Enter Your Height'
                  onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  min="150" max="200"
                  required
                />
              </div>
            </div>
          </div>

          {/* Fitness Goals */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-emerald-600" />
              <span>Fitness Goals & Preferences</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Primary Goal</label>
                <select
                  value={formData.fitnessGoal}
                  onChange={(e) => handleInputChange('fitnessGoal', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value="">Select your Goal</option>
                  <option value="weight-loss">Weight Loss</option>
                  <option value="muscle-gain">Muscle Gain</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="endurance">Endurance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Fitness Level</label>
                <select
                  value={formData.fitnessLevel}
                  onChange={(e) => handleInputChange('fitnessLevel', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value="">Select your Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Workout Duration (minutes)</span>
                </label>
                <select
                  value={formData.workoutTime}
                  onChange={(e) => handleInputChange('workoutTime', parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value="">Select your Workout Time</option>
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                  <option value={90}>90 minutes</option>
                  <option value={120}>120 minutes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Equipment */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Dumbbell className="w-5 h-5 text-orange-600" />
              <span>Available Equipment</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {equipmentOptions.map((equipment) => (
                <label key={equipment} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.equipment.includes(equipment)}
                    onChange={(e) => handleArrayChange('equipment', equipment, e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">{equipment}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Dietary Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Dietary Preferences</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {dietaryOptions.map((diet) => (
                <label key={diet} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.dietaryPreferences.includes(diet)}
                    onChange={(e) => handleArrayChange('dietaryPreferences', diet, e.target.checked)}
                    className="w-4 h-4 text-emerald-600 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-300">{diet}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Allergies */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Allergies & Restrictions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {allergyOptions.map((allergy) => (
                <label key={allergy} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.allergies.includes(allergy)}
                    onChange={(e) => handleArrayChange('allergies', allergy, e.target.checked)}
                    className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-300">{allergy}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 flex items-center space-x-2 transform hover:scale-105 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;