import React, { useState } from "react";
import { combineRules } from "../api"; // Adjust the import path accordingly

const RuleCombiner = () => {
  const [rules, setRules] = useState([]);
  const [combinedAST, setCombinedAST] = useState(null);
  const [error, setError] = useState(null);

  const handleCombineRules = async () => {
    if (rules.length === 0) {
      setError("Please enter at least one rule to combine.");
      return;
    }

    try {
      const result = await combineRules(rules);
      if (result && result.combinedAST) {
        setCombinedAST(result.combinedAST);
        setError(null);
      } else {
        setError("Failed to combine rules. Please check your input.");
      }
    } catch (error) {
      setError("Error combining rules. Please try again.");
      setCombinedAST(null);
    }
  };

  return (
    <div>
      <h1>Combine Rules</h1>
      <textarea
        placeholder="Enter rules, separated by commas..."
        onChange={(e) =>
          setRules(e.target.value.split(",").map((rule) => rule.trim()))
        }
      />
      <button onClick={handleCombineRules}>Combine Rules</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {combinedAST && (
        <div>
          <h2>Combined AST:</h2>
          <pre>{JSON.stringify(combinedAST, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default RuleCombiner;
