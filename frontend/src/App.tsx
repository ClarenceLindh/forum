import "./Styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ViewThread from "./Components/ViewThread";
import { useEffect, useState } from "react";
import CreateThread from "./Components/CreateThread";
import ContextProvider, { Context } from "./Context/ContextProvider";
import Footer from "./Components/Footer";

function App() {
  const { loggedInUser, setLoggedInUser } = useContext(Context);

  return (
    <div className="App">
      <ContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route
              path="/login"
              element={<Login/>}
            />
            <Route path="/viewThread/:threadId" element={<ViewThread />} />
            <Route path="/create" element={<CreateThread />} />
          </Routes>
        </Router>
      </ContextProvider>
     
    </div>
  );
}

export default App;
