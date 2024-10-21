import React, { useState } from "react";
import "./RuleList.css";
import { combineRules } from "../api"; // Adjust the import path accordingly
import { toast } from "react-toastify"; // Import the toast library

const RuleList = ({ rules = [], onCombine }) => {
  const sortedRules = [...rules].reverse();
  const [indrules, setIndrules] = useState([]); // State for selected rules
  const [error, setError] = useState(null);

  // Handle checkbox selection
  const handleCheckboxChange = (rule, isChecked) => {
    if (isChecked) {
      setIndrules((prev) => [...prev, rule.ruleString]);
    } else {
      setIndrules((prev) => prev.filter((r) => r !== rule.ruleString));
    }
  };

  const handleCombineRules = async () => {
    if (indrules.length === 0) {
      setError("Please select at least one rule to combine.");
      return;
    }

    try {
      const combinedRules = indrules.join(", ");
      const result = await combineRules([combinedRules]);

      if (result && result.combinedAST) {
        setError(null);
        onCombine(result.combinedAST); // Pass combinedAST to parent via callback
        toast.success("Rules combined successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        setError("Failed to combine rules. Please check your input.");
      }
    } catch (error) {
      setError("Error combining rules. Please try again.");
    }
  };

  return (
    <div className="existingrulediv">
      <div className="existingruleheader">
        <p className="existingruleheader">Existing Rules</p>
        <button onClick={handleCombineRules} className="combinerulebutton">
          Combine Selected Rules
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {sortedRules.length > 0 ? (
          sortedRules.map((rule, index) => (
            <li key={rule._id || `${rule.ruleString}-${index}`}>
              <input
                type="checkbox"
                className="rulecheckbox"
                id={`rule-${index}`}
                onChange={(e) => handleCheckboxChange(rule, e.target.checked)}
              />
              <label htmlFor={`rule-${index}`}>{rule.ruleString}</label>
            </li>
          ))
        ) : (
          <li>No rules available</li>
        )}
      </ul>
    </div>
  );
};

export default RuleList;
