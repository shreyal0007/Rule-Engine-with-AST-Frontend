import React, { useState, useEffect } from "react";
import RuleCombiner from "../../components/RuleCombiner";
import EvaluateRuleForm from "../../components/EvaluateRuleForm";
import { fetchRules, evaluateRule, combineRules } from "../../api"; // Adjust the import path

const EvaluateCombine = () => {
  const [rules, setRules] = useState([]); // State for fetched rules
  const [evaluationResult, setEvaluationResult] = useState(null); // State for the evaluation result
  const [ast, setAst] = useState(null); // State for the combined rule (AST)
  const [isCombined, setIsCombined] = useState(false); // Track if rules are combined

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
      setRules([]);
      console.error("Error fetching rules:", error.message);
    }
  };

  // Handle combining rules
  const handleCombineRules = async () => {
    try {
      const combinedRuleData = await combineRules(rules);
      console.log("combinedRuleData", combinedRuleData); // Log the full response

      // Ensure that the response contains the combined AST
      if (
        combinedRuleData &&
        combinedRuleData.data &&
        combinedRuleData.data.combinedAST
      ) {
        setAst(combinedRuleData.data.combinedAST); // Set the combined AST
        setIsCombined(true); // Mark as combined
        alert("Rules combined successfully!");
      } else {
        console.error("Failed to combine rules or AST not found.");
      }
    } catch (error) {
      console.error("Error combining rules:", error.message);
    }
  };

  // Handle evaluating the rule by calling the evaluateRule API
  const handleEvaluateRule = async (data) => {
    if (!isCombined || !ast) {
      alert("Please combine the rules first.");
      return;
    }
    try {
      // Pass user data and the combined AST to evaluateRule
      const result = await evaluateRule(data, ast);
      setEvaluationResult(result); // Set the evaluation result
    } catch (error) {
      console.error("Error evaluating rule:", error.message);
    }
  };

  // Fetch rules when the component mounts
  useEffect(() => {
    fetchAndSetRules();
  }, []);

  return (
    <div>
      {/* Component to combine rules */}
      <RuleCombiner onCombineRules={handleCombineRules} />

      {/* Form to evaluate the rule */}
      <EvaluateRuleForm onEvaluateRule={handleEvaluateRule} combinedAST={ast} />

      {/* Display the evaluation result */}
      {evaluationResult && (
        <div>
          <h4>
            Evaluation Result: {evaluationResult.result ? "True" : "False"}
          </h4>
          <h5>User Data:</h5>
          <pre>{JSON.stringify(evaluationResult.userData, null, 2)}</pre>
          <h5>AST:</h5>
          <pre>{JSON.stringify(evaluationResult.ast, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default EvaluateCombine;
