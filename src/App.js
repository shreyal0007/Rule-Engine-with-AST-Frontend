import React, {  useState } from "react";
import CreateRule from "./pages/Createrule/Createrule.jsx"
import EvaluateCombine from "./pages/EvaluateCombine/EvaluateCombine.jsx"
import RuleForm from "./components/RuleForm";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import TitleBar from "./components/TitleBar/TitleBar";
const App = () => {
  const [activeTab, setActiveTab] = useState("create");
  return (
    <div className="mainclass">
      <h1 className="mainclassheader">Rule Engine</h1>
      <Router>
        <TitleBar onSelectTab={setActiveTab}></TitleBar>
        <Routes>
          <Route path="/create" element={<CreateRule></CreateRule>}></Route>
          <Route
            path="/evaluate"
            element={<EvaluateCombine></EvaluateCombine>}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
