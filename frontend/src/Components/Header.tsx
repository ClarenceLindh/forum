import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Context } from "../Context/ContextProvider";

function Header() {
  const navigate = useNavigate();

  const { logout, loggedInUser } = useContext(Context);

  return (
    <div className="header">
      <img className="logo" src="../assets/Logo2.png" alt="" />
      <div>
        {Object.keys(loggedInUser).length === 0 &&
        loggedInUser.constructor === Object ? (
          <h2
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign in
          </h2>
        ) : (
          <div className="loginLogoutContainer">
            <h3>Welcome back {loggedInUser.username}!</h3>
            <button className="logoutButton noButtonCss" onClick={logout}>logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
