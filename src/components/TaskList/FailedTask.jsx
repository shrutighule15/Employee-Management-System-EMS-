import React, { useContext, useState } from 'react'
import './FailedTask.css'
import { AuthContext } from '../../context/AuthProvide';

const FailedTask = ({data}) => {
  const { userData, setUserData } = useContext(AuthContext);
  const [failed, setFailed] = useState(data.failed);

  return (
    <div className="first-box">
        <div className="box-header">
        <span className="high">{data.category}</span>
          <span className="date">{data.taskDate}</span>
        </div>
        <h3 className="box-heading">{data.taskTitle}</h3>
        <p className="box-description">{data.taskDescription}</p>
        
      </div>
  )
}

export default FailedTask
