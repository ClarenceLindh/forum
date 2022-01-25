import { useEffect, useState } from "react";
import "../Styles/Login.scss";

const Login = () => {

  const [loginUsername, setLoginUsername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const [registerUsername, setRegisterUsername] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");

  const [loggedInUser, setLoggedInUser] = useState<any>({});

  const getUsers = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const response = await fetch("/auth/users", {});
    console.log(response);
  };

  const login = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let credentials = {
      username: loginUsername,
      password: loginPassword,
    };

    let newcredentials = JSON.stringify(credentials);
    console.log(newcredentials);

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.append("Content-Type", "application/json");

    let response = await fetch("/api/login", {
      method: "post",
      headers: requestHeaders,
      body: JSON.stringify(newcredentials),
      mode: "no-cors",
    });

    if (response.url.includes("error")) {
      console.log("Wrong username/password");
    }
  };

  const register = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const credentials = {
      username: registerUsername,
      email: registerEmail,
      password: registerPassword,
    };

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    console.log(credentials);
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
        <button type="submit" onClick={getUsers}>
          getUsers
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
