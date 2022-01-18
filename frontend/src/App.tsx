import "./Styles/App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Views/Login";
import Home from "./Components/Views/Home";


function App() {
  return (
    <div className="App">
      
        <Router>
         <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          
         </Routes>
        </Router>
      
    </div>
  );
}

export default App;
