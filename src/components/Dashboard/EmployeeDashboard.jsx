import React, { useContext, useEffect, useState } from "react";
import Header from "./MainEmployee/Header";
import Middle from "./MainEmployee/Middle";
import Last from "./MainEmployee/Last";
import "./EmployeeDashboard.css";
import { AuthContext } from "../../context/AuthProvide";


const EmployeeDashboard = ({data}) => {
  const { userData, setUserData } = useContext(AuthContext );
  const [currentUser, setCurrentUser] = useState(data)

  useEffect(() => {
    if (!data) return; // Prevent setting empty data
    const updatedUser = userData.find((user) => user.email === data?.email);
    setCurrentUser(updatedUser || data);
  }, [data, userData]); // ✅ Update when userData changes


  const handleTaskStatusChange = (updatedTask) => {
    // Update the task in userData
    const updatedUserData = userData.map((user) => {
      if (user.email === currentUser.email) {
        return {
          ...user,
          tasks: user.tasks.map((task) =>
            task.taskTitle === updatedTask.taskTitle ? updatedTask : task
          ),
        };
      }
      return user;
    });

    // Update state and localStorage
    setUserData(updatedUserData);
    localStorage.setItem("employees", JSON.stringify(updatedUserData));
  };

  if (!currentUser) return <p>Loading...</p>;


  return (
    <div className="dashboard-container">
   
   <Header firstName={currentUser.firstName} />
      <Middle data={currentUser} />
      <Last data={currentUser.tasks}
      handleTaskStatusChange={handleTaskStatusChange} />
     
    </div>
  );
};

export default EmployeeDashboard;
