import { useState } from "react";
import "../../Styles/Login.scss";

const Login = () => {
  // const [Username, setUsername] = useState("");

  return (
    <div>
      <div className="login-page">

        <h1>Login</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Login</button>

        <h1>Or Register</h1>
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="E-mail" />
        <input type="password" placeholder="Password" />
        <button type="submit">Register</button>

      </div>
    </div>
  );
};

export default Login;
