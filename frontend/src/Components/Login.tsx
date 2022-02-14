import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/ContextProvider";
import "../Styles/Login.scss";

const Login = () => {
  const { loggedInUser, whoAmI, logout } = useContext(Context);
  const navigate = useNavigate();

  const dataPolicy =
    "Your data is safe with us. We will not sell or share your data with anyone. Your username and auto generated ID will be public and your password will be encrypted. We will not store your password in plain text.  Your email-address will only be visible to our administrator. You can at any time request a deletion of your account. That will make your account invisible to other members of the forum. According to our GDPR compliance we will keep you data for 30 days before it is removed.";

    const userPolicyLink = "https://drive.google.com/file/d/1BxSRSnkNCZx3cCpFmhFpZuCErahvnaj7/view?usp=sharing";
    
  const [loginUsername, setLoginUsername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [blockedAccs, setBlockedAccs] = useState<any>([]);
  const [deletedAccs, setDeletedAccs] = useState<any>([]);

  const [registerUsername, setRegisterUsername] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");

  const getBlockedAcc = async () => {
    let response = await fetch("/auth/blockedAcc");
    
      response = await response.json();
      setBlockedAccs(response);
  };

  const getDeletedAcc = async () => {
    let response = await fetch("/auth/deletedAcc")

    response = await response.json();
    setDeletedAccs(response);
  }

  const getUsers = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(loggedInUser);

    const response = await fetch("/auth/users", {});
    console.log(response);
    
  };

  useEffect(() => {
    getUsers({ preventDefault: () => {} });
    getBlockedAcc();
    getDeletedAcc();
  }, []);

  const login = async (e: any) => {
    e.preventDefault()

    const credentials =
      "username=" +
      encodeURIComponent(loginUsername) +
      "&password=" +
      encodeURIComponent(loginPassword);

    

    let response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // mode: "no-cors", //  <3
      body: credentials
    })    
      if (response.url.includes("error")) {
        alert("Wrong username/password")
      } else if (blockedAccs.find((blockedAcc: { username: string; }) => blockedAcc.username.toLowerCase() === loginUsername.toLowerCase())) {
       alert("User is Blocked")
        logout();
      } else if(deletedAccs.find((deletedAcc: {username: string; }) => deletedAcc.username.toLowerCase() === loginUsername.toLowerCase())){
        alert("User does not exist")
        logout();
      }else {
        console.log("Successfully logged in");
        whoAmI();

        navigate("/");
      } 

      // if (loggedInUser.username === loginUsername) {
      //   console.log("right!", loggedInUser.username);
      //   console.log("right!", loginUsername);
      //   alert("You logged in as " + loginUsername);
      //   navigate("/");
      // }else if (loggedInUser.role === "ROLE_DELETED"){
      //   alert("User is deleted")
      // }else  {
      //   alert("Wrong username/password");
      //   console.log("Wrong!", loggedInUser.username);
      //   console.log("wrong!", loginUsername);

      // }
   
  };

  const register = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const credentials = {
      username: registerUsername,
      email: registerEmail,
      password: registerPassword,
      role: "ROLE_USER",
      blocked: 0,
      deleted: 0
    };

    console.log(credentials);


    if (
      window.confirm(
        "You are registering as " +
          registerUsername +
          ". By clicking on OK you agree to the following user data policies: " +
          dataPolicy + "You can download our policy here: " + userPolicyLink
      )
    ) 
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
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={login}>
        <input
          required 
          className="loginField"
          type="text"
          placeholder="Username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />

        <input
          required 
          className="loginField"
          type="password"
          placeholder="Password"
          onChange={(e) => setLoginPassword(e.target.value)}
         
        />
        <button type="submit">
          Login
        </button>
      </form>

      <h1>Or Register</h1>
      <form onSubmit={register}>
        <input
          required
          className="loginField"
          type="text"
          placeholder="Username"
          onChange={(e) => setRegisterUsername(e.target.value)}
          onSubmit={register}
        />
        <input
          required
          className="loginField"  
          type="email"
          placeholder="E-mail"
          onChange={(e) => setRegisterEmail(e.target.value)}
          onSubmit={register}
        />
        <input
          required
          className="loginField"
          type="password"
          placeholder="Password"
          onChange={(e) => setRegisterPassword(e.target.value)}
          onSubmit={register}
        />
        <button type="submit">Register</button>
      </form>
        <a href={userPolicyLink}>
        <button>User policy</button>
        </a>
    </div>
  );
};

export default Login;
