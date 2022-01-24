import { useEffect, useState } from "react";
import "../Styles/Login.scss";

const Login = () => {
  const baseURL = "http://localhost:8080";

  const [loginUsername, setLoginUsername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const [registerUsername, setRegisterUsername] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");

  const [loggedInUser, setLoggedInUser] = useState<any>({});

  const getUsers = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const response = await fetch(baseURL + "/auth/users", {});
    console.log(response);
  };

  const login = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const credentials = {
      username: loginUsername,
      password: loginPassword,
    };

    let response = await fetch(baseURL + "/login", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*",
      }),
      body: JSON.stringify(credentials),
      mode: "no-cors",
    });
    console.log(JSON.stringify(credentials));

    if (response.url.includes("error")) {
      console.log("Wrong username/password");
    }
  };

  const register = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const registerCredentials = {
      username: registerUsername,
      email: registerEmail,
      password: registerPassword,
    };

    const rawResponse = await fetch(baseURL + "/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerCredentials),
    });
    console.log(registerCredentials);
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
