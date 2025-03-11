import React from "react";
import "./Last.css";
import AcceptTask from "../../TaskList/AcceptTask";
import CompleteTask from "../../TaskList/CompleteTask";
import FailedTask from "../../TaskList/FailedTask";
import NewTask from "../../TaskList/NewTask";

const Last = ({ data }) => {
 if (!data || !Array.isArray(data) || data.length === 0) {
    
    return <div className="no-task">No Task Available</div>;
  }

  return (
    <div className="list-container">
      {data.map((elem, idx) => {
        
  

 // Determine status based on boolean values
 let status = "unknown";
 if (elem.newTask) status = "new";
 else if (elem.completed) status = "completed";
 else if (elem.failed) status = "failed";
 else if (elem.active) status = "accepted";

        
        if (status === "accepted") {
return <AcceptTask key={idx} data={{ ...elem, taskTitle: `Task No ${idx + 1} : ${elem.taskTitle}` }} />;
        }

        if (status === "new") {
          return <NewTask key={idx} data={{ ...elem, taskTitle: `Task No ${idx + 1} : ${elem.taskTitle}` }} />;
        }

        if (status === "completed") {
          return <CompleteTask key={idx} data={{ ...elem, taskTitle: `Task No ${idx + 1} : ${elem.taskTitle}` }} />;
        }

        if (status === "failed") {
          return <FailedTask key={idx} data={{ ...elem, taskTitle: `Task No ${idx + 1} : ${elem.taskTitle}` }} />;
        }

        return null;
      })}
    </div>
  );
  
};

export default Last;
