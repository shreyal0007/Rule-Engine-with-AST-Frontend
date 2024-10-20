import React, { useState } from "react";

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
    const result = await onEvaluateRule(data , combinedAST);
    setEvaluationResult(result);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Evaluate Rule</h3>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={data.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={data.department}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={data.salary}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="experience"
          placeholder="Experience"
          value={data.experience}
          onChange={handleChange}
          required
        />
        <button type="submit">Evaluate</button>
      </form>

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

export default EvaluateRuleForm;
