import { UserData, WorkoutPlan, Exercise } from '../types';

export class WorkoutService {
  private exercises: Exercise[] = [
    {
      id: '1',
      name: 'Push-ups',
      targetMuscles: ['Chest', 'Triceps', 'Shoulders'],
      equipment: 'None',
      difficulty: 'beginner',
      instructions: ['Start in plank position', 'Lower body to ground', 'Push back up'],
      reps: '10-15 reps'
    },
    {
      id: '2',
      name: 'Squats',
      targetMuscles: ['Quadriceps', 'Glutes', 'Core'],
      equipment: 'None',
      difficulty: 'beginner',
      instructions: ['Stand with feet shoulder-width apart', 'Lower into sitting position', 'Return to standing'],
      reps: '15-20 reps'
    },
    {
      id: '3',
      name: 'Plank',
      targetMuscles: ['Core', 'Shoulders'],
      equipment: 'None',
      difficulty: 'beginner',
      instructions: ['Hold plank position', 'Keep core tight', 'Maintain straight line'],
      duration: '30-60 seconds'
    },
    {
      id: '4',
      name: 'Dumbbell Chest Press',
      targetMuscles: ['Chest', 'Triceps', 'Shoulders'],
      equipment: 'Dumbbells',
      difficulty: 'intermediate',
      instructions: ['Lie on bench or floor', 'Press dumbbells up', 'Lower with control'],
      reps: '8-12 reps'
    },
    {
      id: '5',
      name: 'Goblet Squats',
      targetMuscles: ['Quadriceps', 'Glutes', 'Core'],
      equipment: 'Dumbbells',
      difficulty: 'intermediate',
      instructions: ['Hold dumbbell at chest', 'Squat down keeping chest up', 'Drive through heels'],
      reps: '12-15 reps'
    },
    {
      id: '6',
      name: 'Burpees',
      targetMuscles: ['Full Body'],
      equipment: 'None',
      difficulty: 'advanced',
      instructions: ['Start standing', 'Drop to push-up', 'Jump feet in', 'Jump up with arms overhead'],
      reps: '5-10 reps'
    },
    {
      id: '7',
      name: 'Mountain Climbers',
      targetMuscles: ['Core', 'Cardio'],
      equipment: 'None',
      difficulty: 'intermediate',
      instructions: ['Start in plank', 'Alternate bringing knees to chest', 'Keep core engaged'],
      duration: '30-45 seconds'
    },
    {
      id: '8',
      name: 'Lunges',
      targetMuscles: ['Quadriceps', 'Glutes', 'Calves'],
      equipment: 'None',
      difficulty: 'beginner',
      instructions: ['Step forward into lunge', 'Lower back knee toward ground', 'Return to starting position'],
      reps: '10-12 per leg'
    }
  ];

  async getRecommendedWorkouts(userData: UserData | null): Promise<WorkoutPlan[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (!userData) {
      return this.getDefaultWorkouts();
    }

    return this.generatePersonalizedWorkouts(userData);
  }

  private getDefaultWorkouts(): WorkoutPlan[] {
    return [
      {
        id: '1',
        name: 'Beginner Full Body',
        duration: 20,
        difficulty: 'beginner',
        targetMuscles: ['Full Body'],
        equipment: ['None'],
        exercises: this.exercises.filter(e => e.difficulty === 'beginner' && e.equipment === 'None').slice(0, 4)
      },
      {
        id: '2',
        name: 'Quick HIIT',
        duration: 15,
        difficulty: 'intermediate',
        targetMuscles: ['Cardio', 'Core'],
        equipment: ['None'],
        exercises: [
          this.exercises.find(e => e.name === 'Burpees')!,
          this.exercises.find(e => e.name === 'Mountain Climbers')!,
          this.exercises.find(e => e.name === 'Squats')!
        ]
      }
    ];
  }

  private generatePersonalizedWorkouts(userData: UserData): WorkoutPlan[] {
    const availableExercises = this.filterExercisesByUserData(userData);
    const workouts: WorkoutPlan[] = [];

    // Generate workouts based on user preferences
    if (userData.fitnessGoal === 'weight-loss') {
      workouts.push(this.createHIITWorkout(userData, availableExercises));
      workouts.push(this.createCardioWorkout(userData, availableExercises));
    } else if (userData.fitnessGoal === 'muscle-gain') {
      workouts.push(this.createStrengthWorkout(userData, availableExercises));
      workouts.push(this.createUpperBodyWorkout(userData, availableExercises));
    } else {
      workouts.push(this.createFullBodyWorkout(userData, availableExercises));
      workouts.push(this.createCoreWorkout(userData, availableExercises));
    }

    // Add a quick workout option
    workouts.push(this.createQuickWorkout(userData, availableExercises));

    return workouts;
  }

  private filterExercisesByUserData(userData: UserData): Exercise[] {
    let filtered = this.exercises.filter(exercise => {
      // Filter by difficulty
      if (userData.fitnessLevel === 'beginner' && exercise.difficulty === 'advanced') {
        return false;
      }
      
      // Filter by equipment
      if (exercise.equipment !== 'None' && !userData.equipment.some(eq => exercise.equipment.includes(eq))) {
        return false;
      }

      return true;
    });

    return filtered;
  }

  private createHIITWorkout(userData: UserData, exercises: Exercise[]): WorkoutPlan {
    const hiitExercises = exercises.filter(e => 
      e.targetMuscles.includes('Cardio') || 
      e.name.includes('Burpees') || 
      e.name.includes('Mountain Climbers') ||
      e.name.includes('Squats')
    ).slice(0, 5);

    return {
      id: 'hiit-1',
      name: 'HIIT Fat Burner',
      duration: userData.workoutTime,
      difficulty: userData.fitnessLevel,
      targetMuscles: ['Cardio', 'Full Body'],
      equipment: userData.equipment,
      exercises: hiitExercises
    };
  }

  private createCardioWorkout(userData: UserData, exercises: Exercise[]): WorkoutPlan {
    const cardioExercises = exercises.filter(e => 
      e.targetMuscles.includes('Cardio') || 
      e.targetMuscles.includes('Full Body')
    ).slice(0, 4);

    return {
      id: 'cardio-1',
      name: 'Cardio Blast',
      duration: userData.workoutTime,
      difficulty: userData.fitnessLevel,
      targetMuscles: ['Cardio'],
      equipment: userData.equipment,
      exercises: cardioExercises
    };
  }

  private createStrengthWorkout(userData: UserData, exercises: Exercise[]): WorkoutPlan {
    const strengthExercises = exercises.filter(e => 
      e.targetMuscles.includes('Chest') || 
      e.targetMuscles.includes('Triceps') ||
      e.targetMuscles.includes('Quadriceps') ||
      e.targetMuscles.includes('Glutes')
    ).slice(0, 5);

    return {
      id: 'strength-1',
      name: 'Strength Builder',
      duration: userData.workoutTime,
      difficulty: userData.fitnessLevel,
      targetMuscles: ['Strength'],
      equipment: userData.equipment,
      exercises: strengthExercises
    };
  }

  private createUpperBodyWorkout(userData: UserData, exercises: Exercise[]): WorkoutPlan {
    const upperBodyExercises = exercises.filter(e => 
      e.targetMuscles.includes('Chest') || 
      e.targetMuscles.includes('Shoulders') ||
      e.targetMuscles.includes('Triceps')
    ).slice(0, 4);

    return {
      id: 'upper-1',
      name: 'Upper Body Power',
      duration: userData.workoutTime,
      difficulty: userData.fitnessLevel,
      targetMuscles: ['Upper Body'],
      equipment: userData.equipment,
      exercises: upperBodyExercises
    };
  }

  private createFullBodyWorkout(userData: UserData, exercises: Exercise[]): WorkoutPlan {
    const fullBodyExercises = exercises.slice(0, 6);

    return {
      id: 'fullbody-1',
      name: 'Balanced Full Body',
      duration: userData.workoutTime,
      difficulty: userData.fitnessLevel,
      targetMuscles: ['Full Body'],
      equipment: userData.equipment,
      exercises: fullBodyExercises
    };
  }

  private createCoreWorkout(userData: UserData, exercises: Exercise[]): WorkoutPlan {
    const coreExercises = exercises.filter(e => 
      e.targetMuscles.includes('Core')
    ).slice(0, 4);

    return {
      id: 'core-1',
      name: 'Core Crusher',
      duration: Math.min(userData.workoutTime, 30),
      difficulty: userData.fitnessLevel,
      targetMuscles: ['Core'],
      equipment: userData.equipment,
      exercises: coreExercises
    };
  }

  private createQuickWorkout(userData: UserData, exercises: Exercise[]): WorkoutPlan {
    const quickExercises = exercises.filter(e => e.equipment === 'None').slice(0, 3);

    return {
      id: 'quick-1',
      name: 'Quick Energy Boost',
      duration: 15,
      difficulty: userData.fitnessLevel,
      targetMuscles: ['Full Body'],
      equipment: ['None'],
      exercises: quickExercises
    };
  }
}