import { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Login.scss";

const Login = () => {
  const baseURL = "http://localhost:8080";

  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const [registerUsername, setRegisterUsername] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");

  const [loggedInUser, setLoggedInUser] = useState<any>({});

  useEffect(() => {
    axios.get(baseURL + "/auth/users").then((res) => {
      console.log(res);
    });
  }, []);

  const login = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const credentials: string =
      "email=" +
      encodeURIComponent(loginEmail) +
      "&password=" +
      encodeURIComponent(loginPassword);
      console.log(credentials);
      

    axios.post(baseURL + "login", {
      method: "POST",
      headers: {'Access-Control-Allow-Origin': '*'},
      mode: "no-cors",
      body: credentials,
    }).then((res) => {
      setLoggedInUser(res.data);
      console.log(res);
    });
    
  };

  const register = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const credentials: string =
      "email=" +
      encodeURIComponent(loginEmail) +
      "&password=" +
      encodeURIComponent(loginPassword);
      console.log(credentials);
      

    axios.post(baseURL + "auth/register", {
      method: "POST",
      // headers: {'Access-Control-Allow-Origin': '*'},
      mode: "no-cors",
      body: JSON.stringify(credentials),
    }).then((res) => {
      setLoggedInUser(res.data);
      console.log(res);
    });
    
  };
  

  // const register = () => {
  //   axios.post(baseURL, {
  //     Username: registerUsername,
  //     Password: registerPassword,
  //     Email: registerEmail,
  //   });
  // };

  console.log(loginEmail);
  console.log(loginPassword);
  console.log(registerUsername);
  console.log(registerEmail);
  console.log(registerPassword);

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setLoginEmail(e.target.value)}
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
        />
        <input
          type="text"
          placeholder="E-mail"
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Login;
