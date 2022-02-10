import "./Styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ViewThread from "./Components/ViewThread";
import MyThreads from "./Components/MyThreads";
import CreateThread from "./Components/CreateThread";
import ContextProvider from "./Context/ContextProvider";
import BannedUsers from "./Components/BannedUsers";

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
            <Route path="/thread/bannedusers/:threadId" element={<BannedUsers />}></Route>
            <Route path="/myThread" element={<MyThreads />} />
            <Route path="/create" element={<CreateThread />} />
          </Routes>
        </Router>
      </ContextProvider>
     
    </div>
  );
}

export default App;
