import "./Styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, {  useState } from "react";

import Login from "./Components/Login";
import Home from "./Components/Home";
import CreateThread from "./Components/CreateThread";
import ThreadList from "./Components/Threads/ThreadList";


function App() {
  const [threads, setThreads] = useState([{id:1,name:'Todo1', complete:false },{id:1,name:'Todo2', complete:false },{id:1,name:'Todo3', complete:false },{id:1,name:'Todo4', complete:false },])

  return (
    <div className="App">
      
        <Router>
         <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreateThread />} />
            {/* <Route path="/thread" element={<ThreadList threads={threads} />} /> */}
          
         </Routes>
        </Router>
      
    </div>
  );
}

export default App;
