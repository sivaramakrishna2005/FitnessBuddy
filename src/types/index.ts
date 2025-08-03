export interface UserData {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number;
  height: number;
  fitnessGoal: 'weight-loss' | 'muscle-gain' | 'maintenance' | 'endurance';
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  workoutTime: 15 | 30 | 45 | 60 | 90 | 120;
  equipment: string[];
  dietaryPreferences: string[];
  allergies: string[];
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface Exercise {
  id: string;
  name: string;
  targetMuscles: string[];
  equipment: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  instructions: string[];
  duration?: string;
  reps?: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  targetMuscles: string[];
  exercises: Exercise[];
  equipment: string[];
}

export interface MealSuggestion {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  ingredients: string[];
  instructions: string[];
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  dietaryTags: string[];
}

export interface MotivationalTip {
  id: string;
  content: string;
  category: 'motivation' | 'habit' | 'nutrition' | 'exercise';
}