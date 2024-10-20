import React from "react";
import "./RuleList.css";

const RuleList = ({ rules = [] }) => {
  // Reverse the array so the latest rules appear at the top
  const sortedRules = [...rules].reverse();

  return (
    <div className="existingrulediv">
      <p className="existingruleheader">Existing Rules</p>
      <ul>
        {sortedRules.length > 0 ? (
          sortedRules.map((rule, index) => (
            <li key={rule._id || `${rule.ruleString}-${index}`}>
              {rule.ruleString}
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
