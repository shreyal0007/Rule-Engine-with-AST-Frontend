import React from "react";

const RuleList = ({ rules = [] }) => {
  return (
    <ul>
      {rules.length > 0 ? (
        rules.map((rule, index) => (
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
