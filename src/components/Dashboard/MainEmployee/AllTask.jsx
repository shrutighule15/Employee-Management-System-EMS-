import React, { useContext } from "react";
import "./AllTask.css";
import { AuthContext } from "../../../context/AuthProvide";

const AllTask = () => {
  const { userData } = useContext(AuthContext);

  // Ensure userData is an array before mapping
  if (!userData || userData.length === 0) {
    return null; // Render nothing if no data
  }

  return (
    <div className="task-container">
      <h1>Employee Dashboard</h1>
      <div className="heading-task">
        <h4>Employee Name</h4>
        <h4>New Task</h4>
        <h4>Active Task</h4>
        <h4>Completed</h4>
        <h4>Failed</h4>
      </div>
      <div>
        {userData.map((employee) => (
          <div className="task-list" key={employee.id}>
            <h3>{employee.firstName}</h3>
            <h4>{employee.taskNumber?.newTask || 0}</h4>
            <h4>{employee.taskNumber?.active || 0}</h4>
            <h4>{employee.taskNumber?.completed || 0}</h4>
            <h4>{employee.taskNumber?.failed || 0}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;
