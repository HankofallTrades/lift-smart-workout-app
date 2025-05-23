/**
 * Represents the core definition of an exercise, mirroring the Supabase 'exercises' table.
 */
export interface Exercise {
  id: string;
  name: string;
  archetype_id?: string | null; // Added for movement archetype support
  // oneRepMax?: number; // Removed - Likely stored in user_exercise_stats
  default_equipment_type?: string | null; // Renamed from equipmentType, matching DB
  created_by_user_id?: string | null; // Add the creator user ID field
  // variations?: string[]; // Removed - Likely stored in exercise_variations
  muscle_groups?: string[]; // Added: Array of muscle group names targeted
  is_static?: boolean | null; // Added is_static
}

export interface ExerciseSet {
  id: string;
  weight: number;
  reps: number | null; // Made reps nullable
  time_seconds?: number | null; // Added time_seconds
  exerciseId: string; // Links to Exercise.id
  completed: boolean;
  equipmentType?: string; // Changed to string
  variation?: string; // Variation used for *this specific set*
}

/**
 * Represents an exercise instance within a specific workout.
 */
export interface WorkoutExercise {
  id: string; // Unique ID for this instance in the workout
  workoutId?: string; // Foreign key to the workout this instance belongs to
  exerciseId: string; // Foreign key to the main Exercise definition
  exercise: Exercise; // Embed the core exercise details (using updated Exercise type)
  equipmentType?: string; // Changed to string
  variation?: string; // Variation used for *this workout instance*
  sets: ExerciseSet[];
}

export interface Workout {
  id: string;
  date: string; // Store date as ISO string
  duration: number; // in seconds
  exercises: WorkoutExercise[];
  completed: boolean;
}

export interface WorkoutHistory {
  workouts: Workout[];
}

export interface WeightSuggestion {
  percentage: number;
  weight: number;
}
