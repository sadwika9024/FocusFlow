// src/components/TimerImplementationLogic.jsx
import axios from "axios";
import React, { useState, useEffect } from "react";
import './timer.css'

function TimerImplementationLogic({ selectedTask, setAutoReload ,setSelectedTask}) {

  // 10-second test timer
  const [timer, setTimer] = useState(10);
  const [isActive, setIsActive] = useState(false);

  // Reset timer when new task selected
  useEffect(() => {
    setTimer(10);
    setIsActive(false);
  }, [selectedTask]);

  // Countdown effect
  useEffect(() => {
    if (!isActive) return;
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isActive]);

  // When timer hits 0 — mark task completed
  useEffect(() => {
  if (timer !== 0) return;
  if (!isActive) return;
  if (!selectedTask) return;

  const completeTask = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/task/${selectedTask.id}`,
        {
          title: selectedTask.title,
          completed: true,
        }
      );

      setAutoReload(prev => !prev);

      alert(`🎉 Task "${selectedTask.title}" completed!`);
    } catch (error) {
      alert("Unable to update task status.");
    } finally {
      setIsActive(false);
      setTimer(10);
      setSelectedTask(null);
    }
  };

  completeTask();
}, [timer, isActive, selectedTask]);
if (!selectedTask) {
    return (
      <div className="timer-empty-state">
        <h3>FocusFlow ⏱️</h3>
        <p>click on focus flow button to begin.</p>
      </div>
    );
  }

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  return (
    <div className="timer-container">
      <h1>Timer started for: {selectedTask.title}</h1>
      <h2>{minutes}:{seconds}</h2>

      <div className="timer-button-group">
        <button onClick={() => setIsActive(true)}>START</button>
        <button onClick={() => setIsActive(false)}>PAUSE</button>
        <button onClick={() => {
          setIsActive(false);
          setTimer(10);
        }}>
          RESET
        </button>
      </div>
    </div>
  );
}

export default TimerImplementationLogic;