import "./Styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, {  useState } from "react";

import Login from "./Components/Login";
import Home from "./Components/Home";
import ViewThread from "./Components/ViewThread";
import CreateThread from "./Components/CreateThread";
import ThreadList from "./Components/Threads/ThreadList";


function App() {

  return (
    <div className="App">
      
        <Router>
         <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/viewThread/:threadId" element={<ViewThread />} />

            <Route path="/create" element={<CreateThread />} />
            {/* <Route path="/thread" element={<ThreadList threads={threads} />} /> */}
          
         </Routes>
        </Router>
      
    </div>
  );
}

export default App;
