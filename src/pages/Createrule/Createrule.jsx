import React, { useState } from "react";
import RuleForm from "../../components/RuleForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Createrule.css";

const CreateRule = () => {
  const [rules, setRules] = useState([]);

  const handleRuleCreated = (newRule) => {
    setRules((prevRules) => [...prevRules, newRule]);
  };

  return (
    <div className="createrulemain">
      <RuleForm onRuleCreated={handleRuleCreated} />
      {/* ToastContainer here will handle all toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default CreateRule;
