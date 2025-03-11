import React, { useContext, useEffect, useState } from "react";
import "./NewTask.css";
import { AuthContext } from "../../context/AuthProvide";
import AcceptTask from "../TaskList/AcceptTask";

const NewTask = ({ data, taskTitle }) => {
  const { userData, setUserData } = useContext(AuthContext);
  const [taskAccepted, setTaskAccepted] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("acceptedTasks")) || {};
    setTaskAccepted(storedTasks[data.taskTitle] || false);
  }, [data.taskTitle]);

  if (!data) return <p>No task available</p>;

  const handleAcceptTask = () => {
    const updatedUserData = userData.map((user) => {
      if (user.email === data.assignedToEmail) {
        console.log(taskTitle, data.assignedToEmail, user.tasks);
        return {
          ...user,
          tasks: user.tasks.map((task) =>
            task.taskTitle === taskTitle
              ? {
                  ...task,
                  active: true,
                  newTask: false,
                  completed: false,
                  failed: false,
                } // ✅ Ensure the task has a proper status
              : task
          ),
          taskNumber: {
            newTask: user.taskNumber.newTask || 0,
            active: user.taskNumber.active || 0,
            completed: user.taskNumber.completed || 0,
            failed: user.taskNumber.failed || 0,
          },
        };
      }
      return user;
    });
    console.log(updatedUserData);
    setUserData(updatedUserData);
    localStorage.setItem("employees", JSON.stringify(updatedUserData));

    // ✅ Save accepted task status to localStorage
    const storedTasks = JSON.parse(localStorage.getItem("acceptedTasks")) || {};
    storedTasks[data.taskTitle] = true;
    localStorage.setItem("acceptedTasks", JSON.stringify(storedTasks));

    setTaskAccepted(true);
  };

  return (
    <>
      {!taskAccepted ? (
        <div className="first-box">
          <div className="box-header">
            <span className="high">{data.category}</span>
            <span className="date">{data.taskDate}</span>
          </div>
          <h3 className="box-heading">{data.taskTitle}</h3>
          <p className="box-description">{data.taskDescription}</p>

          <div className="btn-container">
            <button className="btn-accept" onClick={handleAcceptTask}>
              Accept Task
            </button>
          </div>
        </div>
      ) : (
        <AcceptTask data={data} /> // Renders AcceptTask component after accepting
      )}
    </>
  );
};

export default NewTask;
