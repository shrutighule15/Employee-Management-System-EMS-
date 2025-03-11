import React from "react";
import "./Middle.css";

const Middle = ({ data }) => {
  
  return (
    <div className="container">
      <div className="box new-task">
        <h3>New Task</h3>
        <p>{data?.taskNumber?.newTask || 0}</p>
      </div>
      <div className="box completed">
        <h3>Completed</h3>
        <p>{data?.taskNumber?.completed || 0}</p>
      </div>
      <div className="box accepted">
        <h3>Accepted</h3>
        <p>{data?.taskNumber?.active || 0}</p>
      </div>
      <div className="box failed">
        <h3>Failed</h3>
        <p>{data?.taskNumber?.failed || 0}</p>
      </div>
    </div>
  );
};

export default Middle;
