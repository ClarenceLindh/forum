import "./Styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import CreateThread from "./Components/CreateThread";


function App() {
  return (
    <div className="App">
      
        <Router>
         <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreateThread />} />
          
         </Routes>
        </Router>
      
    </div>
  );
}

export default App;
