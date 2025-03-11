import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

export const AuthContext = createContext();

const AuthProvide = ({ children }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const { employees } = getLocalStorage(); // Get employees from localStorage
    if (employees.length > 0) {
      setUserData(employees); // Set to state
    }
  }, []);

  useEffect(() => {
    if (userData.length > 0) {
      setLocalStorage("employees", userData); // Save to localStorage when updated
    }
  }, [userData]);

  // ✅ Update Task Status Function
  const updateTaskStatus = (userEmail, taskTitle, newStatus) => {
    console.log("🛠️ updateTaskStatus called for:", { userEmail, taskTitle, newStatus });

    setUserData((prevUserData) => {
      const updatedUsers = prevUserData.map((user) => {
        if (user.email === userEmail) {
          const updatedTasks = user.tasks.map((task) =>
            task.taskTitle === taskTitle
              ? { 
                  ...task, 
                  active: false, 
                  newTask: false, 
                  completed: newStatus === "completed", 
                  failed: newStatus === "failed" 
                }
              : task
          );

          return {
            ...user,
            tasks: updatedTasks,
            taskNumber: {
              active: updatedTasks.filter((task) => task.active).length,
              newTask: updatedTasks.filter((task) => task.newTask).length,
              completed: updatedTasks.filter((task) => task.completed).length,
              failed: updatedTasks.filter((task) => task.failed).length,
            },
          };
        }
        return user;
      });

      setLocalStorage("employees", updatedUsers); // Save to localStorage
      return updatedUsers;
    });
  };


  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvide;
