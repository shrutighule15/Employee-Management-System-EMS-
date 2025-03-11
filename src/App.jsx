import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthProvide";


const App = () => {
 const [user, setUser] = useState(null)
 const [loggedInUserData, setLoggedInUserData] = useState(null)
 const {userData,SetUserData} =useContext(AuthContext)
 
  useEffect(()=>{
    const loggedInUser = localStorage.getItem('loggedInUser')
    if(loggedInUser){
      const userData = JSON.parse(loggedInUser)
      
      setUser(userData.role)
      setLoggedInUserData(userData.data)
    }
  }, []); 

  const handleLogin = (email, password) => {
    if (email === 'admin@.com' && password === '123') {
      setUser('admin');
      localStorage.setItem('loggedInUser', JSON.stringify({ role: "admin" }));
    } else if (userData && Array.isArray(userData)) {
      const employeeData = userData.find((e) => email === e.email && e.password === password);
      if (employeeData) {
        setLoggedInUserData(employeeData); // ✅ Update employee data
        setUser("employee");
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employeeData }));
      }
    } else {
      alert('Invalid Credentials');
    }
  };
  

 

  return (
    <>
    {!user ? (<Login handleLogin={handleLogin} /> ): null}

    

    {user === "admin" ?(<AdminDashboard  />) : user === "employee" ? (<EmployeeDashboard  data={loggedInUserData}/>) : null}
  </>
  );
 
 };

export default App;
