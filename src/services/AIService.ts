import { UserData } from '../types';

export class AIService {
  // Simulates IBM Watson Assistant natural language processing
  async processMessage(message: string, userData: UserData | null): Promise<string> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const lowerMessage = message.toLowerCase();
    
    // Intent recognition simulation
    if (this.matchesIntent(lowerMessage, ['workout', 'exercise', 'train'])) {
      return this.handleWorkoutIntent(lowerMessage, userData);
    }
    
    if (this.matchesIntent(lowerMessage, ['nutrition', 'meal', 'eat', 'food', 'diet'])) {
      return this.handleNutritionIntent(lowerMessage, userData);
    }
    
    if (this.matchesIntent(lowerMessage, ['motivate', 'motivation', 'inspire', 'encourage'])) {
      return this.handleMotivationIntent(userData);
    }
    
    if (this.matchesIntent(lowerMessage, ['progress', 'track', 'stats', 'achievement'])) {
      return this.handleProgressIntent(userData);
    }
    
    if (this.matchesIntent(lowerMessage, ['profile', 'setup', 'personal', 'information'])) {
      return this.handleProfileIntent(userData);
    }
    
    if (this.matchesIntent(lowerMessage, ['hello', 'hi', 'hey', 'greetings'])) {
      return this.handleGreetingIntent(userData);
    }
    
    if (this.matchesIntent(lowerMessage, ['help', 'what can you do', 'features', 'commands'])) {
      return this.handleHelpIntent();
    }
    
    // Default response
    return this.getDefaultResponse(userData);
  }
  
  private matchesIntent(message: string, keywords: string[]): boolean {
    return keywords.some(keyword => message.includes(keyword));
  }
  
  private handleGreetingIntent(userData: UserData | null): string {
    const greetings = [
      "Hello! Ready to crush your fitness goals today? 💪",
      "Hey there! What fitness adventure shall we embark on? 🚀",
      "Hi! I'm excited to help you on your fitness journey! ✨"
    ];
    
    if (userData) {
      const personalGreetings = [
        `Hello ${userData.name}! Ready for another amazing workout? 🔥`,
        `Hey ${userData.name}! How's your ${userData.fitnessGoal.replace('-', ' ')} journey going? 💪`,
        `Hi ${userData.name}! Let's make today count towards your fitness goals! ⭐`
      ];
      greetings.push(...personalGreetings);
    }
    
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  private handleHelpIntent(): string {
    return `I'm here to help you with:

🏋️ **Workouts**: Get personalized exercise routines
🥗 **Nutrition**: Healthy meal suggestions and dietary advice  
💪 **Motivation**: Daily inspiration and encouragement
📊 **Progress**: Track your fitness journey and achievements
👤 **Profile**: Set up your personal fitness preferences

Just ask me anything like "Give me a workout" or "What should I eat for breakfast?" and I'll help you out! What would you like to explore first?`;
  }
  
  private handleWorkoutIntent(message: string, userData: UserData | null): string {
    if (!userData) {
      return "I'd love to help you with a workout! But first, let's set up your profile so I can give you personalized recommendations. Click on the 'Profile' tab to get started! 💪";
    }
    
    // More specific workout responses based on message content
    if (message.includes('quick') || message.includes('short')) {
      return `Perfect! Here's a quick ${Math.min(userData.workoutTime, 15)}-minute energizer for you:

🔥 **Quick Energy Blast**
• Jumping Jacks - 30 seconds
• Push-ups - 10 reps
• Squats - 15 reps
• Plank - 30 seconds
• Mountain Climbers - 20 reps

Repeat 2-3 times with 30-second breaks. You've got this, ${userData.name}! 💪`;
    }
    
    if (message.includes('strength') || message.includes('muscle')) {
      return `Excellent choice for building strength! Based on your ${userData.fitnessLevel} level, here's a muscle-building routine:

💪 **Strength Builder Session**
• Push-ups: 3 sets of ${userData.fitnessLevel === 'beginner' ? '8-10' : userData.fitnessLevel === 'intermediate' ? '12-15' : '15-20'} reps
• Squats: 3 sets of ${userData.fitnessLevel === 'beginner' ? '10-12' : userData.fitnessLevel === 'intermediate' ? '15-18' : '20-25'} reps
• Lunges: 2 sets of 10 per leg
• Plank: Hold for ${userData.fitnessLevel === 'beginner' ? '30' : userData.fitnessLevel === 'intermediate' ? '45' : '60'} seconds

Rest 60-90 seconds between sets. Check the Workouts tab for more detailed routines! 🚀`;
    }
    
    const responses = [
      `Perfect! Based on your ${userData.fitnessLevel} level and ${userData.workoutTime}-minute preference, I recommend starting with our ${userData.fitnessGoal === 'weight-loss' ? 'HIIT Cardio Blast' : userData.fitnessGoal === 'muscle-gain' ? 'Strength Builder' : 'Balanced Full Body'} workout. Check the 'Workouts' tab! 🏋️‍♂️`,
      
      `Great choice, ${userData.name}! I've got some amazing ${userData.workoutTime}-minute workouts ready for you. Your available equipment (${userData.equipment.length > 0 ? userData.equipment.join(', ') : 'bodyweight'}) gives us plenty of options! 💪`,
      
      `Ready to crush your fitness goals? I recommend a workout that targets your ${userData.fitnessGoal.replace('-', ' ')} goal. Let's head to the Workouts section and get started! 🔥`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  private handleNutritionIntent(message: string, userData: UserData | null): string {
    if (!userData) {
      return "I'm excited to help with your nutrition! First, let's complete your profile so I can consider your dietary preferences and restrictions. Head to the 'Profile' tab! 🥗";
    }
    
    // Specific meal suggestions based on message content
    if (message.includes('breakfast')) {
      const breakfastOptions = [
        "🌅 **Power Breakfast Ideas:**\n• Greek yogurt with berries and granola\n• Avocado toast with eggs\n• Oatmeal with nuts and banana\n• Protein smoothie with spinach",
        "🥞 **Morning Fuel Options:**\n• Whole grain toast with almond butter\n• Scrambled eggs with vegetables\n• Chia seed pudding with fruits\n• Quinoa breakfast bowl"
      ];
      
      if (userData.dietaryPreferences.includes('Vegan')) {
        return "🌱 **Vegan Breakfast Ideas:**\n• Oatmeal with plant milk, berries, and nuts\n• Avocado toast with tomatoes\n• Smoothie bowl with banana and chia seeds\n• Tofu scramble with vegetables\n\nAll packed with plant-based protein and nutrients! 💚";
      }
      
      return breakfastOptions[Math.floor(Math.random() * breakfastOptions.length)];
    }
    
    if (message.includes('lunch')) {
      return `🥗 **Healthy Lunch Ideas for ${userData.fitnessGoal.replace('-', ' ')}:**
• Quinoa Buddha bowl with chickpeas
• Grilled chicken salad with mixed greens
• Lentil soup with whole grain bread
• Turkey and avocado wrap

${userData.dietaryPreferences.length > 0 ? `Tailored for your ${userData.dietaryPreferences.join(' and ')} preferences!` : 'All balanced for your fitness goals!'} 🍽️`;
    }
    
    if (message.includes('dinner')) {
      return `🌙 **Nutritious Dinner Options:**
• Baked salmon with sweet potato and broccoli
• Lean beef stir-fry with brown rice
• Vegetarian chili with quinoa
• Grilled chicken with roasted vegetables

Perfect for recovery and muscle building! Check the Nutrition tab for detailed recipes. 🍽️`;
    }
    
    const dietaryInfo = userData.dietaryPreferences.length > 0 
      ? ` keeping in mind your ${userData.dietaryPreferences.join(' and ')} preferences`
      : '';
    
    const responses = [
      `Great question! I have some fantastic meal suggestions for you${dietaryInfo}. Check out the 'Nutrition' tab for personalized meal plans that align with your ${userData.fitnessGoal.replace('-', ' ')} goals! 🍎`,
      
      `Nutrition is so important for reaching your fitness goals! I've curated meals that work perfectly with your ${userData.fitnessGoal.replace('-', ' ')} journey${dietaryInfo}. Let's explore the Nutrition section! 🥘`,
      
      `Perfect timing! Good nutrition supports your workouts beautifully. I have meal ideas ready that consider your dietary needs${dietaryInfo}. Check the 'Nutrition' tab! 🌱`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  private handleMotivationIntent(userData: UserData | null): string {
    const motivationalMessages = [
      "You're stronger than you think! Every workout brings you closer to your goals. Keep pushing forward! 💪✨",
      
      "Remember why you started! Your future self will thank you for the effort you put in today. You've got this! 🌟",
      
      "Progress isn't always perfect, but consistency is key. Every small step counts toward your big dreams! 🚀",
      
      "Your body can do it. It's your mind you need to convince. Believe in yourself - I believe in you! 💙",
      
      "Champions aren't made in comfort zones. Embrace the challenge and watch yourself grow stronger! 🏆"
    ];
    
    if (userData) {
      const personalizedMessages = [
        `${userData.name}, you're on an amazing journey toward ${userData.fitnessGoal.replace('-', ' ')}! Each ${userData.workoutTime}-minute session is building the stronger you. Keep going! 💪`,
        
        `Hey ${userData.name}! Your commitment to fitness at the ${userData.fitnessLevel} level shows real dedication. You're building habits that will transform your life! 🌟`,
        
        `${userData.name}, remember that ${userData.fitnessGoal.replace('-', ' ')} is a journey, not a sprint. You're exactly where you need to be. Trust the process! 🚀`
      ];
      
      motivationalMessages.push(...personalizedMessages);
    }
    
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
  }
  
  private handleProgressIntent(userData: UserData | null): string {
    if (!userData) {
      return "I'd love to help you track your progress! Once you set up your profile, I can provide personalized insights and celebrate your achievements. Let's get started! 📊";
    }
    
    const responses = [
      `${userData.name}, tracking progress is so motivating! Head to the 'Progress' tab to see your achievements, workout streaks, and personal records. You're doing amazing! 📈`,
      
      "Progress tracking keeps you motivated and accountable! Check out your stats in the Progress section - I think you'll be surprised by how far you've come! 🏆",
      
      "Your fitness journey deserves to be celebrated! The Progress tab shows your achievements, streaks, and milestones. Every step forward counts! ⭐"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  private handleProfileIntent(userData: UserData | null): string {
    if (!userData) {
      return "Great idea! Setting up your profile is the first step to getting personalized fitness recommendations. Click on the 'Profile' tab and let's create your fitness blueprint! 📝";
    }
    
    return `Your profile looks great, ${userData.name}! You're set up for ${userData.fitnessGoal.replace('-', ' ')} with ${userData.workoutTime}-minute workouts at the ${userData.fitnessLevel} level. Want to update anything? Head to the Profile tab! ✅`;
  }
  
  private getDefaultResponse(userData: UserData | null): string {
    const defaultResponses = [
      "I'm here to help with your fitness journey! Ask me about workouts, nutrition, motivation, or tracking your progress. What would you like to explore? 😊",
      
      "Great to chat with you! I can help with personalized workouts, healthy meal suggestions, motivation, and tracking your fitness progress. How can I assist you today? 💪",
      
      "Hello! As your Fitness Buddy, I'm ready to support your health and wellness goals. Whether you need workout ideas, nutrition guidance, or motivation - I'm here for you! 🌟"
    ];
    
    if (userData) {
      const personalizedResponses = [
        `Hi ${userData.name}! Ready for another great day of working toward your ${userData.fitnessGoal.replace('-', ' ')} goals? I'm here to help with workouts, nutrition, or motivation! 😊`,
        
        `Hey there, ${userData.name}! How's your fitness journey going? I'm here to support you with workouts, meal ideas, motivation, or progress tracking. What sounds good today? 💪`
      ];
      
      defaultResponses.push(...personalizedResponses);
    }
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
}