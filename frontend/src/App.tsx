import "./Styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ViewBlockedThreads from "./Components/ViewBlockedThreads"
import ViewThread from "./Components/ViewThread";
import MyThreads from "./Components/MyThreads";
import NotFound from "./Components/NotFound";
import { useEffect, useState } from "react";
import CreateThread from "./Components/CreateThread";
import ContextProvider from "./Context/ContextProvider";
import BannedUsers from "./Components/BannedUsers";
import BannedFromWeb from "./Components/BannedFromWeb"

function App() {

  return (
    <div className="App">
      <ContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/viewThread" element={<ViewThread/>}>
            <Route path="/viewThread/:threadId" element={<ViewThread />} />
            </Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="/thread/bannedusers/:threadId" element={<BannedUsers />} />
            <Route path="/admin/banned" element={<BannedFromWeb />} />
            <Route path="/admin/blockedThreads" element={<ViewBlockedThreads/>} />
            <Route path="/myThread" element={<MyThreads />} />
            <Route path="/create" element={<CreateThread />} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Router>
      </ContextProvider>
     
    </div>
  );
}

export default App;
