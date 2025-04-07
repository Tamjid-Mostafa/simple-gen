import { Exercise } from "@/components/workout/types";


export const exercises: Exercise[] = [
  // Chest Workout
  { id: 'chest1', name: 'Barbell Bench Press', category: 'Chest', defaultSets: 3, defaultReps: 10 },
  { id: 'chest2', name: 'Incline Bench Press', category: 'Chest', defaultSets: 3, defaultReps: 10 },
  { id: 'chest3', name: 'Decline Press', category: 'Chest', defaultSets: 3, defaultReps: 10 },
  { id: 'chest4', name: 'Dumbbell Bench Press', category: 'Chest', defaultSets: 3, defaultReps: 10 },
  { id: 'chest5', name: 'Dumbbell Incline Press', category: 'Chest', defaultSets: 3, defaultReps: 10 },
  { id: 'chest6', name: 'Crossover Fly', category: 'Chest', defaultSets: 3, defaultReps: 12 },
  { id: 'chest7', name: 'Butterfly Machine', category: 'Chest', defaultSets: 3, defaultReps: 12 },
  { id: 'chest8', name: 'Dumbbell Pull Over', category: 'Chest', defaultSets: 3, defaultReps: 12 },
  { id: 'chest9', name: 'Parallel Bar Dips', category: 'Chest', defaultSets: 3, defaultReps: 10 },
  { id: 'chest10', name: 'Push-ups', category: 'Chest', defaultSets: 3, defaultReps: 15 },
  { id: 'chest11', name: 'Incline Dumbbell Fly', category: 'Chest', defaultSets: 3, defaultReps: 12 },
  { id: 'chest12', name: 'Chest Press Machine', category: 'Chest', defaultSets: 3, defaultReps: 12 },

  // Tricep Workout
  { id: 'tricep1', name: 'EZ Bar Tricep', category: 'Triceps', defaultSets: 3, defaultReps: 12 },
  { id: 'tricep2', name: 'Dumbbell Tricep', category: 'Triceps', defaultSets: 3, defaultReps: 12 },
  { id: 'tricep3', name: 'One-Arm Dumbbell Tricep', category: 'Triceps', defaultSets: 3, defaultReps: 12 },
  { id: 'tricep4', name: 'Cable Tricep Pushdown', category: 'Triceps', defaultSets: 3, defaultReps: 12 },
  { id: 'tricep5', name: 'Push Tricep', category: 'Triceps', defaultSets: 3, defaultReps: 12 },
  { id: 'tricep6', name: 'Rope Tricep', category: 'Triceps', defaultSets: 3, defaultReps: 12 },
  { id: 'tricep7', name: 'Barbell Laying Tricep', category: 'Triceps', defaultSets: 3, defaultReps: 12 },
  { id: 'tricep8', name: 'Close Grip Bench Press', category: 'Triceps', defaultSets: 3, defaultReps: 10 },
  { id: 'tricep9', name: 'Kick Back', category: 'Triceps', defaultSets: 3, defaultReps: 12 },
  { id: 'tricep10', name: 'Overhead Tricep Extension', category: 'Triceps', defaultSets: 3, defaultReps: 12 },
  { id: 'tricep11', name: 'Skull Crushers', category: 'Triceps', defaultSets: 3, defaultReps: 12 },

  // Back Workout
  { id: 'back1', name: 'Pull Up', category: 'Back', defaultSets: 3, defaultReps: 10 },
  { id: 'back2', name: 'T-Bar Row', category: 'Back', defaultSets: 3, defaultReps: 12 },
  { id: 'back3', name: 'Machine Seated Row', category: 'Back', defaultSets: 3, defaultReps: 12 },
  { id: 'back4', name: 'Cable Lat Pulldown Front', category: 'Back', defaultSets: 3, defaultReps: 12 },
  { id: 'back5', name: 'Seated Cable Row', category: 'Back', defaultSets: 3, defaultReps: 12 },
  { id: 'back6', name: 'Wide Grip Cable Pulldown', category: 'Back', defaultSets: 3, defaultReps: 12 },
  { id: 'back7', name: 'Wide Grip Pull Up', category: 'Back', defaultSets: 3, defaultReps: 10 },
  { id: 'back8', name: 'Bent Barbell Row', category: 'Back', defaultSets: 3, defaultReps: 12 },
  { id: 'back9', name: 'One-Arm Dumbbell Row', category: 'Back', defaultSets: 3, defaultReps: 12 },
  { id: 'back10', name: 'Deadlift', category: 'Back', defaultSets: 3, defaultReps: 8 },
  { id: 'back11', name: 'Hyperextension (Back Extension)', category: 'Back', defaultSets: 3, defaultReps: 12 },
  { id: 'back12', name: 'Chin-ups', category: 'Back', defaultSets: 3, defaultReps: 10 },

  // Bicep Workout
  { id: 'bicep1', name: 'Olympic Barbell Curl', category: 'Biceps', defaultSets: 3, defaultReps: 12 },
  { id: 'bicep2', name: 'Barbell Curl', category: 'Biceps', defaultSets: 3, defaultReps: 12 },
  { id: 'bicep3', name: 'Dumbbell Curl', category: 'Biceps', defaultSets: 3, defaultReps: 12 },
  { id: 'bicep4', name: 'Machine Cable Curl', category: 'Biceps', defaultSets: 3, defaultReps: 12 },
  { id: 'bicep5', name: 'Preacher Curl', category: 'Biceps', defaultSets: 3, defaultReps: 12 },
  { id: 'bicep6', name: 'Incline Bench Curl', category: 'Biceps', defaultSets: 3, defaultReps: 12 },
  { id: 'bicep7', name: 'Rope Hammer Curl', category: 'Biceps', defaultSets: 3, defaultReps: 12 },
  { id: 'bicep8', name: 'One-Arm Preacher Curl', category: 'Biceps', defaultSets: 3, defaultReps: 12 },
  { id: 'bicep9', name: 'Concentration Curl', category: 'Biceps', defaultSets: 3, defaultReps: 12 },
  { id: 'bicep10', name: 'Zottman Curl', category: 'Biceps', defaultSets: 3, defaultReps: 12 },

  // Shoulder Workout
  { id: 'shoulder1', name: 'Barbell Shoulder Press', category: 'Shoulders', defaultSets: 3, defaultReps: 10 },
  { id: 'shoulder2', name: 'Dumbbell Shoulder Press', category: 'Shoulders', defaultSets: 3, defaultReps: 10 },
  { id: 'shoulder3', name: 'Smith Machine Press', category: 'Shoulders', defaultSets: 3, defaultReps: 10 },
  { id: 'shoulder4', name: 'Cable Front Raise', category: 'Shoulders', defaultSets: 3, defaultReps: 12 },
  { id: 'shoulder5', name: 'Dumbbell Lateral Raise', category: 'Shoulders', defaultSets: 3, defaultReps: 12 },
  { id: 'shoulder6', name: 'Rear Delt Fly', category: 'Shoulders', defaultSets: 3, defaultReps: 12 },
  { id: 'shoulder7', name: 'Arnold Press', category: 'Shoulders', defaultSets: 3, defaultReps: 10 },
  { id: 'shoulder8', name: 'Shrugs', category: 'Shoulders', defaultSets: 3, defaultReps: 12 },

  // Leg Workout
  { id: 'leg1', name: 'Free Thigh Squat', category: 'Legs', defaultSets: 3, defaultReps: 12 },
  { id: 'leg2', name: 'Barbell Squat', category: 'Legs', defaultSets: 3, defaultReps: 10 },
  { id: 'leg3', name: 'Front Squat', category: 'Legs', defaultSets: 3, defaultReps: 10 },
  { id: 'leg4', name: 'Leg Press', category: 'Legs', defaultSets: 3, defaultReps: 12 },
  { id: 'leg5', name: 'Leg Extension', category: 'Legs', defaultSets: 3, defaultReps: 12 },
  { id: 'leg6', name: 'Leg Curl', category: 'Legs', defaultSets: 3, defaultReps: 12 },
  { id: 'leg7', name: 'Calves Standing Raise', category: 'Legs', defaultSets: 3, defaultReps: 15 },
  { id: 'leg8', name: 'Seated Calves Raise', category: 'Legs', defaultSets: 3, defaultReps: 15 },
  { id: 'leg9', name: 'Bulgarian Split Squat', category: 'Legs', defaultSets: 3, defaultReps: 10 },
  { id: 'leg10', name: 'Deadlift (Sumo and Romanian)', category: 'Legs', defaultSets: 3, defaultReps: 8 },

  // Core/Abs Workout
  { id: 'core1', name: 'Plank', category: 'Core', defaultDuration: 60 },
  { id: 'core2', name: 'Side Plank', category: 'Core', defaultDuration: 30 },
  { id: 'core3', name: 'Bicycle Crunch', category: 'Core', defaultSets: 3, defaultReps: 20 },
  { id: 'core4', name: 'Hanging Leg Raise', category: 'Core', defaultSets: 3, defaultReps: 12 },
  { id: 'core5', name: 'Russian Twist', category: 'Core', defaultSets: 3, defaultReps: 20 },
  { id: 'core6', name: 'Mountain Climbers', category: 'Core', defaultDuration: 30 },
  { id: 'core7', name: 'Weighted Sit-ups', category: 'Core', defaultSets: 3, defaultReps: 15 },
  { id: 'core8', name: 'Ab Rollout', category: 'Core', defaultSets: 3, defaultReps: 10 },
];

