import React from "react";
import "./AdminDashboard.css";
import Header from "./MainEmployee/Header";
import CreateTask from "./MainEmployee/CreateTask";
import AllTask from "./MainEmployee/AllTask";

const AdminDashboard = (props) => {
  return (
    <div className="dashboard-container">
      <Header firstName="Admin" />
      <div className="content">
        <div className="create-task-container">
          <CreateTask />
        </div>
        <div className="all-task-container">
          <AllTask />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
