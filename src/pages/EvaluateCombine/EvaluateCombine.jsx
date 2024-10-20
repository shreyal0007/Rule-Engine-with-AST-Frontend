import React, { useState, useEffect } from "react";
import RuleCombiner from "../../components/RuleCombiner";
import EvaluateRuleForm from "../../components/EvaluateRuleForm";
import { fetchRules, evaluateRule, combineRules } from "../../api"; // Adjust the import path

const EvaluateCombine = () => {
  const [rules, setRules] = useState([]);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [combinedRule, setCombinedRule] = useState(null);

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

  const handleCombineRules = async () => {
    const combinedRuleData = await combineRules(rules);
    if (combinedRuleData) {
      setCombinedRule(combinedRuleData);
      alert("Rules combined successfully!");
    }
  };

  const handleEvaluateRule = async (data) => {
    const result = await evaluateRule({ ...data, rule: combinedRule });
    setEvaluationResult(result);
  };

  useEffect(() => {
    fetchAndSetRules();
  }, []);

  return (
    <div>
      <RuleCombiner onCombineRules={handleCombineRules} />
      <EvaluateRuleForm onEvaluateRule={handleEvaluateRule} />
      {evaluationResult && (
        <div>
          <h4>
            Evaluation Result: {evaluationResult.result ? "True" : "False"}
          </h4>
          <pre>{JSON.stringify(evaluationResult.userData, null, 2)}</pre>
          <pre>{JSON.stringify(evaluationResult.ast, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default EvaluateCombine;
