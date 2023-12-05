import React from "react";
import "./css/WorkoutApp.css";
import "bootstrap/dist/css/bootstrap.min.css";

const workoutsData = {
  chest: [
    { exercise: "Push-ups", sets: 3, reps: 15 },
    { exercise: "Bench Press", sets: 4, reps: 10 },
  ],
  legs: [
    { exercise: "Squats", sets: 4, reps: 12 },
    { exercise: "Lunges", sets: 3, reps: 10 },
    { exercise: "Deadlifts", sets: 5, reps: 8 },
  ],
  back: [
    { exercise: "Pull-ups", sets: 3, reps: 8 },
    { exercise: "Rows", sets: 4, reps: 12 },
  ],
  shoulders: [
    { exercise: "Shoulder Press", sets: 4, reps: 10 },
    { exercise: "Lateral Raises", sets: 3, reps: 12 },
    { exercise: "Front Raises", sets: 3, reps: 12 },
  ],
  bicep: [
    { exercise: "Bicep Curls", sets: 3, reps: 12 },
    { exercise: "Hammer Curls", sets: 3, reps: 10 },
  ],
  tricep: [
    { exercise: "Tricep Dips", sets: 3, reps: 12 },
    { exercise: "Tricep Extensions", sets: 4, reps: 10 },
  ],
  abs: [
    { exercise: "Crunches", sets: 3, reps: 15 },
    { exercise: "Plank", sets: 3, reps: "30 sec hold" },
  ],
  cardio: [
    { exercise: "Running", sets: "3 times", reps: "20 min" },
    { exercise: "Cycling", sets: "2 times", reps: "30 min" },
  ],
};

const WorkoutCategory = ({ category, exercises }) => (
  <div className="col-lg-6 col-md-12 mb-4 d-flex align-items-center justify-content-center">
    <div className="card custom-card">
      <div className="card-body text-center">
        <h2 className="card-title">{category}</h2>
        <ul className="list-group">
          {exercises.map((exercise, index) => (
            <li key={index} className="list-group-item">
              <h4>{exercise.exercise}</h4>
              <p>Sets: {exercise.sets}</p>
              <p>Reps: {exercise.reps}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const App = () => (
  <div className="container d-flex justify-content-center">
    <div className="row">
      <div className="col-lg-12 col-md-12">
        <WorkoutCategory
          className="category"
          category="Chest & Triceps"
          exercises={[...workoutsData.chest, ...workoutsData.tricep]}
        />
      </div>
      <div className="col-lg-12 col-md-12">
        <WorkoutCategory
          category="Back & Biceps"
          exercises={[...workoutsData.back, ...workoutsData.bicep]}
        />
      </div>
    </div>
    <div className="row">
      <div className="col-lg-12 col-md-12">
        <WorkoutCategory
          category="Shoulders & Legs"
          exercises={[...workoutsData.shoulders, ...workoutsData.legs]}
        />
      </div>
      <div className="col-lg-12 col-md-12">
        <WorkoutCategory
          category="Abs & Cardio"
          exercises={[...workoutsData.abs, ...workoutsData.cardio]}
        />
      </div>
    </div>
  </div>
);

export default App;
