import React, { useState } from "react";
import "./EvaluateForm.css";
const EvaluateRuleForm = ({ onEvaluateRule, combinedAST }) => {
  const [data, setData] = useState({
    age: "",
    department: "",
    salary: "",
    experience: "",
  });

  const [evaluationResult, setEvaluationResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!combinedAST) {
      alert("Combined AST is not available for evaluation.");
      return;
    }
    const result = await onEvaluateRule(data, combinedAST);
    setEvaluationResult(result);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="evaluateformdiv">
      <form onSubmit={handleSubmit} className="evaluateform">
        <p className="evaluateheader">Evaluate Rule</p>
        <div className="evaluateinputdiv">
          <input
            className="evaluateinput"
            type="number"
            name="age"
            placeholder="Age"
            value={data.age}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="evaluateinput"
            name="department"
            placeholder="Department"
            value={data.department}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            className="evaluateinput"
            name="salary"
            placeholder="Salary"
            value={data.salary}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            className="evaluateinput"
            name="experience"
            placeholder="Experience"
            value={data.experience}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="evaluatebutton">
          Evaluate
        </button>
      </form>
      {evaluationResult && (
        <h4>
          <p className="eres">Evaluation Result:</p>
          {evaluationResult.result ? (
            <p>
              True , proceed with the candidat{"\uD83C\uDF89"}{" "}
              {"\uD83C\uDF89"}
            </p>
          ) : (
            <p>
              False , cannot proceed with the candidat{"\uD83D\uDE1F"}{" "}
              {"\uD83D\uDE1F"}
            </p>
          )}
        </h4>
      )}

      {/* {evaluationResult && (
        <div>
          <h4>
            Evaluation Result: {evaluationResult.result ? "True" : "False"}
          </h4>
          <h5>User Data:</h5>
          <pre>{JSON.stringify(evaluationResult.userData, null, 2)}</pre>
          <h5>AST:</h5>
          <pre>{JSON.stringify(evaluationResult.ast, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
};

export default EvaluateRuleForm;
