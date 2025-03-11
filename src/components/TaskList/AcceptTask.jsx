import React, { useContext, useEffect, useState } from "react";
import "./AcceptTask.css";
import { AuthContext } from "../../context/AuthProvide";

const AcceptTask = ({ data, taskTitle }) => {
  const { userData, setUserData } = useContext(AuthContext);
  const [taskStatus, setTaskStatus] = useState("active");
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [taskFailed, setTaskFailed] = useState(false);

  useEffect(() => {
    // Check the stored task statuses from localStorage to sync the status
    const completedTasks =
      JSON.parse(localStorage.getItem("completedTasks")) || {};
    const failedTasks = JSON.parse(localStorage.getItem("failedTasks")) || {};

    if (completedTasks[data.taskTitle]) {
      setTaskStatus("completed");
    } else if (failedTasks[data.taskTitle]) {
      setTaskStatus("failed");
    } else {
      setTaskStatus("active");
    }
  }, [data.taskTitle]);

  const handleCompleteTask = () => {
    const updatedUserData = userData.map((user) => {
      if (user.email === data.assignedToEmail) {
        return {
          ...user,
          tasks: user.tasks.map((task) =>
            task.taskTitle === taskTitle
              ? {
                  ...task,
                  active: false,
                  newTask: false,
                  completed: true,
                  failed: false,
                }
              : task
          ),
          taskNumber: {
            active: user.taskNumber.active || 0,
            completed: user.taskNumber.completed || 0,
            failed: user.taskNumber.failed || 0,
            newTask: user.taskNumber.newTask || 0,
          },
        };
      }
      return user;
    });

    setUserData(updatedUserData);
    localStorage.setItem("employees", JSON.stringify(updatedUserData));

    // Save task state to localStorage for persistence
    const storedTasks =
      JSON.parse(localStorage.getItem("completedTasks")) || {};
    storedTasks[data.taskTitle] = "completed"; // Mark as completed
    localStorage.setItem("completedTasks", JSON.stringify(storedTasks));

    setTaskCompleted(true);
    setTaskStatus("completed"); // Update the taskStatus to 'completed'
  };

  const handleFailTask = () => {
    const updatedUserData = userData.map((user) => {
      if (user.email === data.assignedToEmail) {
        return {
          ...user,
          tasks: user.tasks.map((task) =>
            task.taskTitle === taskTitle
              ? {
                  ...task,
                  active: false,
                  newTask: false,
                  completed: false,
                  failed: true,
                }
              : task
          ),
          taskNumber: {
            active: user.taskNumber.active || 0,
            completed: user.taskNumber.completed || 0,
            failed: user.taskNumber.failed || 0,
            newTask: user.taskNumber.newTask || 0,
          },
        };
      }
      return user;
    });

    setUserData(updatedUserData);
    localStorage.setItem("employees", JSON.stringify(updatedUserData));

    // Save task state to localStorage for persistence
    const storedTasks = JSON.parse(localStorage.getItem("failedTasks")) || {};
    storedTasks[data.taskTitle] = "failed"; // Mark as failed
    localStorage.setItem("failedTasks", JSON.stringify(storedTasks));

    setTaskFailed(true);
    setTaskStatus("failed"); // Update the taskStatus to 'failed'
  };

  return (
    <div className="first-box">
      <h3 className="box-heading">{data.taskTitle}</h3>
      <p className="box-description">{data.taskDescription}</p>

      <div className="btn-container">
        {taskStatus === "active" ? (
          <>
            <button className="btn-completed" onClick={handleCompleteTask}>
              Mark as Completed
            </button>
            <button className="fail" onClick={handleFailTask}>
              Mark as Failed
            </button>
          </>
        ) : taskStatus === "completed" ? (
          <p className="status-pass">✅ You have completed your task 🎉</p>
        ) : taskStatus === "failed" ? (
          <p className="status-fail">❌ You have failed the task</p>
        ) : (
          <p className="status-pending">⏳ Task is pending acceptance</p>
        )}
      </div>
    </div>
  );
};

export default AcceptTask;
