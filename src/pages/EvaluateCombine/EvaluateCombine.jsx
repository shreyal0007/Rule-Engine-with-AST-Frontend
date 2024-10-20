import React, { useState, useEffect } from "react";
import "./EvaluateCombine.css";
import RuleCombiner from "../../components/RuleCombiner"; // Adjust the import path
import EvaluateRuleForm from "../../components/EvaluateRuleForm"; // Adjust the import path
import { fetchRules, evaluateRule } from "../../api"; // Adjust the import path
import RuleList from "../../components/RuleList"; // Adjust the import path
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify styles

const EvaluateCombine = () => {
  const [rules, setRules] = useState([]); // State for fetched rules
  const [evaluationResult, setEvaluationResult] = useState(null); // State for the evaluation result
  const [ast, setAst] = useState(null); // State for the combined rule (AST)

  const fetchAndSetRules = async () => {
    try {
      const response = await fetchRules();
      if (response && Array.isArray(response)) {
        setRules(response);
      } else {
        setRules([]);
      }
    } catch (error) {
      console.error("Error fetching rules:", error.message);
      setRules([]);
    }
  };

  useEffect(() => {
    fetchAndSetRules();
  }, []);

  // Handle evaluating the rule by calling the evaluateRule API
  const handleEvaluateRule = async (data, combinedAST) => {
    if (!combinedAST) {
      alert("Please combine the rules first.");
      return;
    }
    try {
      // Pass user data and the combined AST to evaluateRule
      const result = await evaluateRule(data, combinedAST);
      setEvaluationResult(result); // Set the evaluation result
      return result; // Return the result for the EvaluateRuleForm
    } catch (error) {
      console.error("Error evaluating rule:", error.message);
    }
  };

  // Handle the combined AST from RuleCombiner
  const handleCombinedAST = (combinedAST) => {
    setAst(combinedAST);
  };

  return (
    <div className="evaluatecombinemain">
      <div className="evaluate-combine-div1">
        <RuleCombiner onCombine={handleCombinedAST} />
        <RuleList rules={rules} />
      </div>
      <EvaluateRuleForm onEvaluateRule={handleEvaluateRule} combinedAST={ast} />
      
      {/* ToastContainer renders the toast notifications */}
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

export default EvaluateCombine;
