import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/WorkoutApp.css";
import { Container } from "react-bootstrap/lib/Tab";

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

const ExerciseCard = ({ exercise, sets, reps, handleClick, isSelected }) => (
  <div
    className={`card ${isSelected ? 'selected' : ''}`}
    onClick={!isSelected ? () => handleClick({ exercise, sets, reps }) : null}
  >
    <div className="card-body">
      <h5 className="card-title">{exercise}</h5>
      <p className="card-text">Sets: {sets}</p>
      <p className="card-text">Reps: {reps}</p>
    </div>
  </div>
);

const ExerciseList = ({ muscleGroup, exercises, handleExerciseSelection }) => (
  <div>
    <h2>{muscleGroup}</h2>
    {exercises.map((exercise, index) => (
      <ExerciseCard
        key={index}
        exercise={exercise.exercise}
        sets={exercise.sets}
        reps={exercise.reps}
        handleClick={handleExerciseSelection}
        isSelected={exercise.isSelected}
      />
    ))}
  </div>
);

const WorkoutApp = () => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const summaryRef = useRef(null);

  const handleExerciseSelection = (exercise) => {
    const updatedExercises = [...selectedExercises, { ...exercise, isSelected: true }];
    setSelectedExercises(updatedExercises);
  };

  const handleUndoSelection = () => {
    const updatedExercises = [...selectedExercises];
    updatedExercises.pop();
    setSelectedExercises(updatedExercises);
  };

  const handleClearAll = () => {
    setSelectedExercises([]);
  };

  const getTodayDate = () => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString(undefined, options);
  };

  const copySummaryContent = () => {
    const summaryContent = summaryRef.current.innerText;
    const textArea = document.createElement('textarea');
    textArea.value = summaryContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  };

  return (
    <div className="app-container">
            <div className="summary">
        <h2>Summary</h2>
        <div className="summary-container" ref={summaryRef}>        
          <ul>
          <p>{getTodayDate()}</p> {/* Display today's date */}
          {selectedExercises.map((exercise, index) => (
            <li key={index}>
              {exercise.exercise} - Sets: {exercise.sets}, Reps: {exercise.reps}
            </li>
          ))}
        </ul></div>
        <button onClick={handleUndoSelection}>Undo Selection</button>
        <button onClick={handleClearAll}>Clear All</button>
        <button onClick={copySummaryContent}>Copy Summary</button>
      </div>
      <h2>Exercises</h2>
      {Object.keys(workoutsData).map((muscleGroup, index) => (
        <ExerciseList
          key={index}
          muscleGroup={muscleGroup}
          exercises={workoutsData[muscleGroup].map(exercise => ({
            ...exercise,
            isSelected: selectedExercises.some(selected => selected.exercise === exercise.exercise),
          }))}
          handleExerciseSelection={handleExerciseSelection}
        />
      ))}
    </div>
  );
};

export default WorkoutApp;
