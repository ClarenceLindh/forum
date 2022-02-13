import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "../Context/ContextProvider";

function Header() {
  const navigate = useNavigate();
  var [response] = useState<any>({});

  const { logout, loggedInUser } = useContext(Context);

  let deleteAccountByClick = async () => {
    const accountInfo = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            deleted: true,
        }),
    };
    if (
        window.confirm("are you sure you want to delete Your account") ==
        true
    ) {
        try {
            await fetch(`/rest/editDelete/${loggedInUser.id}`, accountInfo).then(
                async (response) => {
                    const data = await response.json();
                    logout()
                    alert("User deleted")
                }
                
            );

            
            if (response.status == 200) navigate("/");
        } catch (error) {
            alert("error, try later");
        }
    } else {
        alert("you canceled the delete");
    }
};

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
            <button onClick={deleteAccountByClick}> Delete account </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
