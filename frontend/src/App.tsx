import "./Styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, {   } from "react";

import Login from "./Components/Login";
import Home from "./Components/Home";
import ViewThread from "./Components/ViewThread";
import { useEffect, useState } from "react";
import CreateThread from "./Components/CreateThread";


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
            <Route path="/viewThread/:threadId" element={<ViewThread />} />
            <Route path="/create" element={<CreateThread />} />
         </Routes>
        </Router>
    </div>
  );
}

export default App;
