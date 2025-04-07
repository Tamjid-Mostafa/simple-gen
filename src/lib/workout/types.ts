export type Exercise = {
  name: string;
  description: string;
  sets: number;
  reps: string;
  rest: number;
  intensity: string;
};

export type WorkoutDay = {
  focus: string;
  exercises: Exercise[];
};

export type WorkoutWeek = {
  days: WorkoutDay[];
  nutritionTip: string;
};

export type WorkoutPlanType = {
  name: string;
  description: string;
  goal: string;
  level: string;
  duration: number;
  weeks: WorkoutWeek[];
};