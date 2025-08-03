import { UserData, MealSuggestion } from '../types';

export class NutritionService {
  private meals: MealSuggestion[] = [
    {
      id: '1',
      name: 'Protein Power Bowl',
      type: 'breakfast',
      ingredients: ['Greek yogurt', 'Berries', 'Granola', 'Honey', 'Nuts'],
      instructions: ['Mix yogurt with honey', 'Top with berries and granola', 'Sprinkle nuts on top'],
      nutritionInfo: { calories: 320, protein: 25, carbs: 35, fat: 8 },
      dietaryTags: ['Vegetarian', 'High-Protein']
    },
    {
      id: '2',
      name: 'Avocado Toast Deluxe',
      type: 'breakfast',
      ingredients: ['Whole grain bread', 'Avocado', 'Eggs', 'Tomato', 'Feta cheese'],
      instructions: ['Toast bread', 'Mash avocado', 'Add toppings', 'Season with salt and pepper'],
      nutritionInfo: { calories: 380, protein: 18, carbs: 28, fat: 22 },
      dietaryTags: ['Vegetarian', 'High-Fiber']
    },
    {
      id: '3',
      name: 'Quinoa Buddha Bowl',
      type: 'lunch',
      ingredients: ['Quinoa', 'Chickpeas', 'Sweet potato', 'Spinach', 'Tahini dressing'],
      instructions: ['Cook quinoa', 'Roast sweet potato', 'Combine with chickpeas and spinach', 'Drizzle with tahini'],
      nutritionInfo: { calories: 450, protein: 18, carbs: 62, fat: 16 },
      dietaryTags: ['Vegan', 'Gluten-Free', 'High-Fiber']
    },
    {
      id: '4',
      name: 'Grilled Chicken Salad',
      type: 'lunch',
      ingredients: ['Chicken breast', 'Mixed greens', 'Cherry tomatoes', 'Cucumber', 'Olive oil vinaigrette'],
      instructions: ['Grill chicken', 'Prepare salad', 'Slice chicken on top', 'Add vinaigrette'],
      nutritionInfo: { calories: 380, protein: 35, carbs: 12, fat: 18 },
      dietaryTags: ['High-Protein', 'Low-Carb', 'Gluten-Free']
    },
    {
      id: '5',
      name: 'Salmon with Sweet Potato',
      type: 'dinner',
      ingredients: ['Salmon fillet', 'Sweet potato', 'Broccoli', 'Lemon', 'Herbs'],
      instructions: ['Bake salmon with lemon', 'Roast sweet potato', 'Steam broccoli', 'Season with herbs'],
      nutritionInfo: { calories: 520, protein: 40, carbs: 35, fat: 22 },
      dietaryTags: ['High-Protein', 'Omega-3', 'Gluten-Free']
    },
    {
      id: '6',
      name: 'Veggie Stir-Fry',
      type: 'dinner',
      ingredients: ['Brown rice', 'Mixed vegetables', 'Tofu', 'Soy sauce', 'Ginger'],
      instructions: ['Cook brown rice', 'Stir-fry vegetables', 'Add tofu', 'Season with soy sauce and ginger'],
      nutritionInfo: { calories: 420, protein: 16, carbs: 55, fat: 14 },
      dietaryTags: ['Vegan', 'High-Fiber']
    },
    {
      id: '7',
      name: 'Apple Almond Butter',
      type: 'snack',
      ingredients: ['Apple', 'Almond butter', 'Cinnamon'],
      instructions: ['Slice apple', 'Spread almond butter', 'Sprinkle cinnamon'],
      nutritionInfo: { calories: 180, protein: 6, carbs: 22, fat: 8 },
      dietaryTags: ['Vegan', 'Gluten-Free']
    },
    {
      id: '8',
      name: 'Greek Yogurt Parfait',
      type: 'snack',
      ingredients: ['Greek yogurt', 'Berries', 'Honey', 'Granola'],
      instructions: ['Layer yogurt', 'Add berries', 'Drizzle honey', 'Top with granola'],
      nutritionInfo: { calories: 220, protein: 15, carbs: 28, fat: 6 },
      dietaryTags: ['Vegetarian', 'High-Protein']
    }
  ];

  async getMealRecommendations(userData: UserData | null): Promise<MealSuggestion[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!userData) {
      return this.meals;
    }

    return this.filterMealsByUserData(userData);
  }

  private filterMealsByUserData(userData: UserData): MealSuggestion[] {
    let filteredMeals = [...this.meals];

    // Filter by dietary preferences
    if (userData.dietaryPreferences.length > 0) {
      filteredMeals = filteredMeals.filter(meal => 
        userData.dietaryPreferences.some(pref => 
          meal.dietaryTags.includes(pref)
        )
      );
    }

    // Filter by allergies
    if (userData.allergies.length > 0) {
      filteredMeals = filteredMeals.filter(meal => 
        !userData.allergies.some(allergy => 
          meal.ingredients.some(ingredient => 
            ingredient.toLowerCase().includes(allergy.toLowerCase()) ||
            (allergy === 'Dairy' && (ingredient.includes('cheese') || ingredient.includes('yogurt'))) ||
            (allergy === 'Nuts' && ingredient.includes('almond'))
          )
        )
      );
    }

    // Adjust for fitness goals
    if (userData.fitnessGoal === 'muscle-gain') {
      // Prioritize high-protein meals
      filteredMeals = filteredMeals.sort((a, b) => b.nutritionInfo.protein - a.nutritionInfo.protein);
    } else if (userData.fitnessGoal === 'weight-loss') {
      // Prioritize lower calorie, high-fiber meals
      filteredMeals = filteredMeals.sort((a, b) => a.nutritionInfo.calories - b.nutritionInfo.calories);
    }

    // Ensure we have meals for each type
    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
    const balancedMeals = [];

    mealTypes.forEach(type => {
      const mealsOfType = filteredMeals.filter(meal => meal.type === type);
      if (mealsOfType.length > 0) {
        // Add 2-3 meals of each type
        balancedMeals.push(...mealsOfType.slice(0, Math.min(3, mealsOfType.length)));
      }
    });

    return balancedMeals.length > 0 ? balancedMeals : this.meals;
  }
}