import React, { useEffect, useState } from "react";
import RuleForm from "./components/RuleForm";
import RuleCombiner from "./components/RuleCombiner";
import EvaluateRuleForm from "./components/EvaluateRuleForm";
import RuleList from "./components/RuleList";
import { fetchRules, combineRules, evaluateRule } from "./api";

const App = () => {
  const [rules, setRules] = useState([]);
  const [combinedRule, setCombinedRule] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);

  // Function to fetch rules from the API
  const fetchAndSetRules = async () => {
    try {
      const response = await fetchRules();
      console.log("Fetched rules response:", response); // Log the response
      if (response && Array.isArray(response)) {
        setRules(response); // Set the rules if it's an array
      } else {
        setRules([]); // Fallback to an empty array
        console.error("No rules data found in the response.");
      }
    } catch (error) {
      setRules([]); // Reset to an empty array on error
      console.error("Error fetching rules:", error.message || error);
    }
  };

  // Function to handle the combination of rules
  const handleCombineRules = async () => {
    const combinedRuleData = await combineRules(rules);
    if (combinedRuleData) {
      setCombinedRule(combinedRuleData);
      alert("Rules combined successfully!");
    }
  };

  // Function to evaluate user data against the combined rule
  const handleEvaluateRule = async (data) => {
    // if (!combinedRule) {
    //   alert("Please combine rules before evaluation.");
    //   return;
    // }

    const result = await evaluateRule({ ...data, rule: combinedRule });
    setEvaluationResult(result); // Set the evaluation result
  };

  // Fetch rules on component mount
  useEffect(() => {
    fetchAndSetRules();
  }, []);

  // Function to handle new rule creation
  const handleRuleCreated = (newRule) => {
    setRules((prevRules) => {
      return Array.isArray(prevRules) ? [...prevRules, newRule] : [newRule];
    });
  };

  return (
    <div>
      <h1>Rule Engine</h1>
      <RuleForm onRuleCreated={handleRuleCreated} />
      <h2>Existing Rules</h2>
      <RuleList rules={Array.isArray(rules) ? rules : []} />
      <RuleCombiner onCombineRules={handleCombineRules} />
      <EvaluateRuleForm onEvaluateRule={handleEvaluateRule} />
      {/* Conditional rendering of the evaluation result */}
      {evaluationResult !== null && (
        <div>
          <h3>
            Evaluation Result: {evaluationResult.result ? "True" : "False"}
          </h3>
          <pre>
            User Data: {JSON.stringify(evaluationResult.userData, null, 2)}
          </pre>
          <pre>AST: {JSON.stringify(evaluationResult.ast, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
