import React, { useEffect, useState } from "react";
import "./Header.css";
import { setLocalStorage } from "../../../utils/localStorage";

const Header = ({firstName}) => {
  const [username, setUsername] = useState("admin");

  useEffect(() => {
    
    if (firstName) {
      setUsername(firstName);
    } else {
      setUsername(firstName);
    }
  }, [firstName]);

  const logOutUser = () => {
    localStorage.setItem("loggedInUser", "");

    window.location.reload();
  };

  return (
    <div className="header">
      <h2 className="greeting">
        Hello <br /> {username}
      </h2>
      <button onClick={logOutUser} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Header;
