import React, { useContext, useState } from "react";
import "./CompleteTask.css";
import { AuthContext } from "../../context/AuthProvide";

const CompleteTask = ({ data }) => {
  const { userData, setUserData } = useContext(AuthContext);
const [completed, setCompleted] = useState(data.completed)

  return (
    <div className="first-box">
      <div className="box-header">
        <span className="high">{data.category}</span>
        <span className="date">{data.taskDate}</span>
      </div>
      <h3 className="box-heading">{data.taskTitle}</h3>
      <p className="box-description">{data.taskDescription}</p>
     
    </div>
  );
};

export default CompleteTask;
