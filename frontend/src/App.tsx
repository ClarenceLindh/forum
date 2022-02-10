import "./Styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ViewThread from "./Components/ViewThread";
import MyThreads from "./Components/MyThreads";
import { useEffect, useState } from "react";
import CreateThread from "./Components/CreateThread";
import ContextProvider, { Context } from "./Context/ContextProvider";
import Footer from "./Components/Footer";

function App() {

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
            <Route path="/myThread" element={<MyThreads />} />
            <Route path="/create" element={<CreateThread />} />
          </Routes>
        </Router>
      </ContextProvider>
     
    </div>
  );
}

export default App;
