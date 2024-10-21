import React, { useState, useEffect } from "react";
import "./EvaluateCombine.css";
import RuleList from "../../components/RuleList"; // Adjust the import path
import EvaluateRuleForm from "../../components/EvaluateRuleForm"; // Adjust the import path
import { fetchRules, evaluateRule } from "../../api"; // Adjust the import path
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for the toast notifications

const EvaluateCombine = () => {
  const [rules, setRules] = useState([]);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [ast, setAst] = useState(null); // State for the combined rule (AST)

  useEffect(() => {
    const fetchAndSetRules = async () => {
      try {
        const response = await fetchRules();
        setRules(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching rules:", error.message);
        setRules([]);
      }
    };
    fetchAndSetRules();
  }, []);

  const handleEvaluateRule = async (data, combinedAST) => {
    if (!combinedAST) {
      alert("Please combine the rules first.");
      return;
    }
    try {
      const result = await evaluateRule(data, combinedAST);
      setEvaluationResult(result); // Set the evaluation result
      return result; // Return the result for the EvaluateRuleForm
    } catch (error) {
      console.error("Error evaluating rule:", error.message);
    }
  };

  const handleCombinedAST = (combinedAST) => {
    setAst(combinedAST); // Store the combined AST in the state
    // toast.success("Rules combined successfully through AST!", {
    //   position: "top-right",
    //   autoClose: 3000,
    // });
  };

  return (
    <div className="evaluatecombinemain">
      <div className="evaluate-combine-div1">
        <RuleList rules={rules} onCombine={handleCombinedAST} />
      </div>
      <EvaluateRuleForm onEvaluateRule={handleEvaluateRule} combinedAST={ast} />
      {/* {evaluationResult && (
        <div className="evaluate-combine-div2">
          <h4>
            Evaluation Result: {evaluationResult.result ? "True" : "False"}
          </h4>
        </div>
      )} */}
      <ToastContainer /> 
    </div>
  );
};

export default EvaluateCombine;
