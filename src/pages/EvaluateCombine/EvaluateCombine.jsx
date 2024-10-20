import React, { useState, useEffect } from "react";
import RuleCombiner from "../../components/RuleCombiner" // Adjust the import path
import EvaluateRuleForm from "../../components/EvaluateRuleForm"; // Adjust the import path
import { fetchRules, evaluateRule, combineRules } from "../../api"; // Adjust the import path

const EvaluateCombine = () => {
  const [rules, setRules] = useState([]); // State for fetched rules
  const [evaluationResult, setEvaluationResult] = useState(null); // State for the evaluation result
  const [ast, setAst] = useState(null); // State for the combined rule (AST)

  // Fetch the rules from the API and set the state
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
    }
  };

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

  // Fetch rules when the component mounts
  useEffect(() => {
    fetchAndSetRules();
  }, []);

  return (
    <div>
      {/* Component to combine rules */}
      <RuleCombiner onCombine={handleCombinedAST} />

      {/* Form to evaluate the rule */}
      <EvaluateRuleForm onEvaluateRule={handleEvaluateRule} combinedAST={ast} />

      {/* Display the evaluation result */}
      {evaluationResult && (
        <div>
          <h4>
            Evaluation Result: {evaluationResult.result ? "True" : "False"}
          </h4>
          {/* <h5>User Data:</h5>
          <pre>{JSON.stringify(evaluationResult.userData, null, 2)}</pre>
          <h5>AST:</h5>
          <pre>{JSON.stringify(evaluationResult.ast, null, 2)}</pre> */}
        </div>
      )}
    </div>
  );
};

export default EvaluateCombine;
