import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/ContextProvider";
import "../Styles/Login.scss";

const Login = () => {
  const { loggedInUser, whoAmI } = useContext(Context);
  const navigate = useNavigate();

  const dataPolicy = "*Policy here*";

  const [loginUsername, setLoginUsername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const [registerUsername, setRegisterUsername] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");

  const getUsers = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(loggedInUser);

    const response = await fetch("/auth/users", {});
    console.log(response);
  };

  useEffect(() => {
    getUsers({ preventDefault: () => {} });
  }, []);

  const login = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const credentials =
      "username=" +
      encodeURIComponent(loginUsername) +
      "&password=" +
      encodeURIComponent(loginPassword);

    console.log(credentials);

    let response = await fetch("/login", {
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      mode: "no-cors", //  <3
      body: credentials,
    }).then(() => {
      whoAmI();
      console.log(loginUsername);
      console.log(loggedInUser.username);
      if (loggedInUser.username === loginUsername) {
        alert("You logged in as " + loginUsername);
        navigate("/");
      } else if (loggedInUser.username !== loginUsername) {
        alert("Wrong username/password");
        console.log("Wrong!");
      }
    });
  };

  const register = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const credentials = {
      username: registerUsername,
      email: registerEmail,
      password: registerPassword,
    };

    console.log(credentials);

    if (
      window.confirm(
        "You are registering as " +
          registerUsername +
          ". By clicking on OK you agree to the following user data policies: " +
          dataPolicy
      )
    ) {
      let response = await fetch("/auth/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors", //  <3
        body: JSON.stringify(credentials),
      }).then(() => {
        whoAmI();
      });

      try {
        const response = await fetch("/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        console.log("Response", response);

        if (response.status === 200) {
          alert("Successfully registered");
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setLoginPassword(e.target.value)}
          onSubmit={login}
        />
        <button type="submit" onClick={login}>
          Login
        </button>
      </form>

      <h1>Or Register</h1>
      <form onSubmit={register}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setRegisterUsername(e.target.value)}
          onSubmit={register}
        />
        <input
          type="text"
          placeholder="E-mail"
          onChange={(e) => setRegisterEmail(e.target.value)}
          onSubmit={register}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setRegisterPassword(e.target.value)}
          onSubmit={register}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Login;
