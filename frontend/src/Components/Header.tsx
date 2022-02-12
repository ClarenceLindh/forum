import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Context } from "../Context/ContextProvider";

function Header() {
  const navigate = useNavigate();

  const { logout, loggedInUser } = useContext(Context);

  return (
    <div className="header">
      <div></div>
      <h1>Forum</h1>
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
            <button onClick={logout}>logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
