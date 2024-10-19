import React, { useState } from "react";
import { combineRules } from "../api"; // Adjust the import path accordingly

const RuleCombiner = () => {
  const [rules, setRules] = useState([]); // Hold the rules to combine
  const [combinedAST, setCombinedAST] = useState(null); // Hold the combined AST
  const [error, setError] = useState(null); // Hold error messages if any

  const handleCombineRules = async () => {
    try {
      const result = await combineRules(rules);
      if (result) {
        setCombinedAST(result.combinedAST); // Set the combined AST state
        setError(null); // Reset any previous errors
      }
    } catch (error) {
      setError("Error combining rules. Please try again.");
      setCombinedAST(null); // Reset combined AST on error
    }
  };

  return (
    <div>
      <h1>Combine Rules</h1>
      <textarea
        placeholder="Enter rules, separated by commas..."
        onChange={(e) =>
          setRules(e.target.value.split(",").map((rule) => rule.trim()))
        } // Update rules from textarea input
      />
      <button onClick={handleCombineRules}>Combine Rules</button>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
      {combinedAST && (
        <div>
          <h2>Combined AST:</h2>
          <pre>{JSON.stringify(combinedAST, null, 2)}</pre>{" "}
          {/* Display combined AST */}
        </div>
      )}
    </div>
  );
};

export default RuleCombiner;
