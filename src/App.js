import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreateRule from "./pages/Createrule/Createrule.jsx";
import EvaluateCombine from "./pages/EvaluateCombine/EvaluateCombine.jsx";
import TitleBar from "./components/TitleBar/TitleBar";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="mainclass">
      <h1 className="mainclassheader">Rule Engine</h1>
      <Router>
        <TitleBar onSelectTab={setActiveTab} />
        <Routes>
          {/* Redirect root path to /create */}
          <Route path="/" element={<Navigate to="/create" />} />
          {/* Routes */}
          <Route path="/create" element={<CreateRule />} />
          <Route path="/evaluate" element={<EvaluateCombine />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
