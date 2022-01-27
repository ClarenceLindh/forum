import "./Styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { useEffect, useState } from "react";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<string>("");
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
          <Route
            path="/login"
            element={<Login  loggedInUser={loggedInUser} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
