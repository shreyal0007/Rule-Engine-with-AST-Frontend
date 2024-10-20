import React from "react";

const RuleList = ({ rules = [] }) => {
  // Slice the last 5 rules from the array (or fewer if there are less than 5)
  const lastFiveRules = rules.slice(-5);

  return (
    <ul>
      {lastFiveRules.length > 0 ? (
        lastFiveRules.map((rule, index) => (
          <li key={rule._id || `${rule.ruleString}-${index}`}>
            {rule.ruleString}
          </li>
        ))
      ) : (
        <li>No rules available</li>
      )}
    </ul>
  );
};

export default RuleList;
