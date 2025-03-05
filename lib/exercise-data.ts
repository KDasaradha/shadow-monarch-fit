import { Dumbbell, Heart, Zap, Brain, Activity } from 'lucide-react'

export const muscleGroups = [
  {
    id: 'chest',
    name: 'Chest',
    icon: Dumbbell
  },
  {
    id: 'back',
    name: 'Back',
    icon: Dumbbell
  },
  {
    id: 'legs',
    name: 'Legs',
    icon: Dumbbell
  },
  {
    id: 'arms',
    name: 'Arms',
    icon: Dumbbell
  },
  {
    id: 'shoulders',
    name: 'Shoulders',
    icon: Dumbbell
  },
  {
    id: 'core',
    name: 'Core',
    icon: Dumbbell
  },
  {
    id: 'cardio',
    name: 'Cardio',
    icon: Heart
  },
  {
    id: 'agility',
    name: 'Agility',
    icon: Zap
  }
]

export const exercises = [
  // Chest Exercises
  {
    id: 'pushups',
    name: 'Push-Ups',
    description: 'Basic bodyweight exercise for chest, shoulders, and triceps',
    muscleGroup: 'chest',
    difficulty: 1,
    requiredRank: 'E-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    sets: 3,
    reps: 15
  },
  {
    id: 'bench-press',
    name: 'Bench Press',
    description: 'Compound exercise targeting the chest, shoulders, and triceps',
    muscleGroup: 'chest',
    difficulty: 2,
    requiredRank: 'D-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    sets: 4,
    reps: 10
  },
  {
    id: 'incline-press',
    name: 'Incline Press',
    description: 'Targets the upper chest and front deltoids',
    muscleGroup: 'chest',
    difficulty: 2,
    requiredRank: 'D-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    sets: 3,
    reps: 12
  },
  {
    id: 'dips',
    name: 'Chest Dips',
    description: 'Advanced bodyweight exercise for lower chest and triceps',
    muscleGroup: 'chest',
    difficulty: 3,
    requiredRank: 'C-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    sets: 3,
    reps: 12
  },
  
  // Back Exercises
  {
    id: 'pullups',
    name: 'Pull-Ups',
    description: 'Bodyweight exercise targeting the back, biceps, and shoulders',
    muscleGroup: 'back',
    difficulty: 2,
    requiredRank: 'E-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80',
    sets: 3,
    reps: 8
  },
  {
    id: 'rows',
    name: 'Bent-Over Rows',
    description: 'Compound exercise for back thickness and biceps',
    muscleGroup: 'back',
    difficulty: 2,
    requiredRank: 'D-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    sets: 4,
    reps: 10
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    description: 'Machine exercise targeting the latissimus dorsi',
    muscleGroup: 'back',
    difficulty: 2,
    requiredRank: 'D-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    sets: 3,
    reps: 12
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    description: 'Compound exercise for overall back, legs, and core strength',
    muscleGroup: 'back',
    difficulty: 3,
    requiredRank: 'C-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    sets: 4,
    reps: 6
  },
  
  // Leg Exercises
  {
    id: 'squats',
    name: 'Squats',
    description: 'Fundamental compound exercise for overall leg development',
    muscleGroup: 'legs',
    difficulty: 2,
    requiredRank: 'E-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
    sets: 4,
    reps: 12
  },
  {
    id: 'lunges',
    name: 'Lunges',
    description: 'Unilateral exercise for legs and balance',
    muscleGroup: 'legs',
    difficulty: 2,
    requiredRank: 'E-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
    sets: 3,
    reps: 10
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    description: 'Machine exercise targeting quadriceps, hamstrings, and glutes',
    muscleGroup: 'legs',
    difficulty: 2,
    requiredRank: 'D-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
    sets: 4,
    reps: 12
  },
  {
    id: 'calf-raises',
    name: 'Calf Raises',
    description: 'Isolation exercise for calf development',
    muscleGroup: 'legs',
    difficulty: 1,
    requiredRank: 'E-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
    sets: 3,
    reps: 20
  },
  
  // Arm Exercises
  {
    id: 'bicep-curls',
    name: 'Bicep Curls',
    description: 'Isolation exercise for bicep development',
    muscleGroup: 'arms',
    difficulty: 1,
    requiredRank: 'E-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    sets: 3,
    reps: 12
  },
  {
    id: 'tricep-extensions',
    name: 'Tricep Extensions',
    description: 'Isolation exercise for tricep development',
    muscleGroup: 'arms',
    difficulty: 1,
    requiredRank: 'E-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    sets: 3,
    reps: 12
  },
  {
    id: 'hammer-curls',
    name: 'Hammer Curls',
    description: 'Variation of bicep curls targeting the brachialis and forearms',
    muscleGroup: 'arms',
    difficulty: 2,
    requiredRank: 'D-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    sets: 3,
    reps: 12
  },
  {
    id: 'skull-crushers',
    name: 'Skull Crushers',
    description: 'Lying tricep extension exercise for tricep development',
    muscleGroup: 'arms',
    difficulty: 2,
    requiredRank: 'D-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    sets: 3,
    reps: 12
  },
  
  // Shoulder Exercises
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    description: 'Compound exercise for shoulder development',
    muscleGroup: 'shoulders',
    difficulty: 2,
    requiredRank: 'E-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    sets: 4,
    reps: 10
  },
  {
    id: 'lateral-raises',
    name: 'Lateral Raises',
    description: 'Isolation exercise for lateral deltoid development',
    muscleGroup: 'shoulders',
    difficulty: 1,
    requiredRank: 'E-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    sets: 3,
    reps: 15
  },
  {
    id: 'face-pulls',
    name: 'Face Pulls',
    description: 'Exercise for rear deltoids and upper back',
    muscleGroup: 'shoulders',
    difficulty: 2,
    requiredRank: 'D-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    sets: 3,
    reps: 15
  },
  {
    id: 'arnold-press',
    name: 'Arnold Press',
    description: 'Advanced shoulder press variation for complete deltoid development',
    muscleGroup: 'shoulders',
    difficulty: 3,
    requiredRank: 'C-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    sets: 3,
    reps: 12
  },
  
  // Core Exercises
  {
    id: 'crunches',
    name: 'Crunches',
    description: 'Basic abdominal exercise for rectus abdominis',
    muscleGroup: 'core',
    difficulty: 1,
    requiredRank: 'E-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    sets: 3,
    reps: 20
  },
  {
    id: 'planks',
    name: 'Planks',
    description: 'Isometric core exercise for overall core stability',
    muscleGroup: 'core',
    difficulty: 1,
    requiredRank: 'E-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: 1
  },
  {
    id: 'russian-twists',
    name: 'Russian Twists',
    description: 'Rotational exercise for obliques',
    muscleGroup: 'core',
    difficulty: 2,
    requiredRank: 'D-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    sets: 3,
    reps: 20
  },
  {
    id: 'leg-raises',
    name: 'Leg Raises',
    description: 'Lower abdominal exercise',
    muscleGroup: 'core',
    difficulty: 2,
    requiredRank: 'D-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    sets: 3,
    reps: 15
  },
  
  // Cardio Exercises
  {
    id: 'jogging',
    name: 'Jogging',
    description: 'Basic cardio exercise for stamina and endurance',
    muscleGroup: 'cardio',
    difficulty: 1,
    requiredRank: 'E-Rank',
    primaryStat: 'stamina',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: 20
  },
  {
    id: 'jump-rope',
    name: 'Jump Rope',
    description: 'Effective cardio exercise for stamina and coordination',
    muscleGroup: 'cardio',
    difficulty: 2,
    requiredRank: 'E-Rank',
    primaryStat: 'stamina',
    imageUrl: 'https://images.unsplash.com/photo-1434596922112-19c563067271?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: 10
  },
  {
    id: 'hiit',
    name: 'HIIT Training',
    description: 'High-intensity interval training for maximum calorie burn',
    muscleGroup: 'cardio',
    difficulty: 3,
    requiredRank: 'D-Rank',
    primaryStat: 'stamina',
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
    duration: 20
  },
  {
    id: 'sprints',
    name: 'Sprint Training',
    description: 'High-intensity running for explosive power and speed',
    muscleGroup: 'cardio',
    difficulty: 4,
    requiredRank: 'C-Rank',
    primaryStat: 'agility',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: 15
  },
  
  // Agility Exercises
  {
    id: 'agility-ladder',
    name: 'Agility Ladder Drills',
    description: 'Improves foot speed, coordination, and agility',
    muscleGroup: 'agility',
    difficulty: 2,
    requiredRank: 'E-Rank',
    primaryStat: 'agility',
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
    duration: 10
  },
  {
    id: 'box-jumps',
    name: 'Box Jumps',
    description: 'Plyometric exercise for explosive power and coordination',
    muscleGroup: 'agility',
    difficulty: 3,
    requiredRank: 'D-Rank',
    primaryStat: 'agility',
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
    sets: 4,
    reps: 10
  },
  {
    id: 'burpees',
    name: 'Burpees',
    description: 'Full-body exercise for conditioning and agility',
    muscleGroup: 'agility',
    difficulty: 3,
    requiredRank: 'D-Rank',
    primaryStat: 'stamina',
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
    sets: 3,
    reps: 15
  },
  {
    id: 'shuttle-runs',
    name: 'Shuttle Runs',
    description: 'Improves speed, agility, and change of direction',
    muscleGroup: 'agility',
    difficulty: 2,
    requiredRank: 'E-Rank',
    primaryStat: 'agility',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    sets: 3,
    reps: 10
  },
  
  // S-Rank Special Exercises
  {
    id: 'one-arm-pullup',
    name: 'One-Arm Pull-Up',
    description: 'Elite level back and arm exercise requiring exceptional strength',
    muscleGroup: 'back',
    difficulty: 5,
    requiredRank: 'S-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80',
    sets: 3,
    reps: 3
  },
  {
    id: 'planche-pushup',
    name: 'Planche Push-Up',
    description: 'Advanced bodyweight exercise requiring immense strength and balance',
    muscleGroup: 'chest',
    difficulty: 5,
    requiredRank: 'S-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    sets: 3,
    reps: 5
  },
  {
    id: 'human-flag',
    name: 'Human Flag',
    description: 'Elite level core and shoulder exercise requiring exceptional strength',
    muscleGroup: 'core',
    difficulty: 5,
    requiredRank: 'S-Rank',
    primaryStat: 'strength',
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80',
    duration: 1
  }
]