import React, { useContext, useEffect, useState } from "react";
import "./CreateTask.css";
import { AuthContext } from "../../../context/AuthProvide";
import { getLocalStorage, setLocalStorage } from "../../../utils/localStorage"; // ✅ Import setLocalStorage

const CreateTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");

  const { userData, setUserData } = useContext(AuthContext);

  useEffect(() => {
    // ✅ Load employee data from localStorage on page refresh
    const storedEmployees = getLocalStorage().employees || [];
    if (storedEmployees.length > 0) {
      setUserData(storedEmployees);
    }
  }, [setUserData]);

  const submitHandler = (e) => {
    e.preventDefault();
  
    if (!assignTo) {
      alert("Please specify the employee to assign the task.");
      return;
    }
  
    let employees = getLocalStorage().employees;
    let employeeFound = employees.find(
      (emp) => assignTo.toLowerCase() === emp.firstName.toLowerCase()
    );
  
    if (!employeeFound) {
      alert(`No employee found with the name ${assignTo}`);
      return;
    }
  
    // Ensure tasks array exists
    if (!employeeFound.tasks) {
      employeeFound.tasks = [];
    }
  
    const newTask = {
      taskTitle,
      taskDescription,
      taskDate,
      assignedToEmail: employeeFound.email,
      category,
      active: false,
      newTask: true,
      failed: false,
      completed: false,
    };
  
    console.log("✅ New Task Created:", newTask);
  
    const updatedEmployees = employees.map((emp) => {
      if (emp.email === employeeFound.email) {
        return {
          ...emp,
          tasks: [...emp.tasks, newTask],
          taskNumber: {
            newTask: (emp.taskNumber?.newTask || 0) + 1,
            active: emp.taskNumber?.active || 0,
            failed: emp.taskNumber?.failed || 0,
            completed: emp.taskNumber?.completed || 0,
          },
        };
      }
      return emp;
    });
  
    setUserData(updatedEmployees); // ✅ Update context
    setLocalStorage("employees", updatedEmployees); // ✅ Save updated employees list
  
    // ✅ Also update logged-in user
    const updatedLoggedInUser = updatedEmployees.find(
      (emp) => emp.email === employeeFound.email
    );
    if (updatedLoggedInUser) {
      setLocalStorage("loggedInUser", { role: "employee", data: updatedLoggedInUser });
    }
  
    alert("Task created successfully!");
  
    // Clear form inputs
    setTaskTitle("");
    setTaskDescription("");
    setTaskDate("");
    setAssignTo("");
    setCategory("");
  };
  

  return (
    <form className="task-form" onSubmit={submitHandler}>
      <div className="form-group">
        <label className="taskTitle">Task Title</label>
        <input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          type="text"
          id="taskTitle"
          placeholder="Enter task title"
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="taskDate">Date</label>
        <input
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
          type="date"
          id="taskDate"
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="assignTo">Assign to</label>
        <input
          value={assignTo}
          onChange={(e) => setAssignTo(e.target.value)}
          type="text"
          id="assignTo"
          placeholder="Employee name"
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label className="category">Category</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          id="category"
          placeholder="Design, dev, etc"
          className="form-input"
          required
        />
      </div>
      <div className="last-box">
        <div className="form-group">
          <label className="description">Description</label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            id="description"
            placeholder="Enter task description"
            className="form-textarea"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="create-task-button">
            Create Task
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateTask;
