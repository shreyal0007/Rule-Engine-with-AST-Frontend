import React, { useState } from "react";
import { createRule } from "../api";

const RuleForm = ({ onRuleCreated }) => {
  const [ruleString, setRuleString] = useState("");
  const [ast, setAst] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from submitting and refreshing the page

    try {
      // Call the createRule function from the API file
      const response = await createRule(ruleString);

      // Check if the response and response.data exist
      if (response && response.data) {
        console.log("Rule created:", response.data);
        setAst(response.data.ast)
        // If the API returns the rule, update the parent component (App.js)
        onRuleCreated(response.data);
        // Reset form input
        setRuleString("");
      } else {
        console.error("Unexpected response structure", response);
      }
    } catch (error) {
      console.error("Error during rule creation:", error.message || error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={ruleString}
        onChange={(e) => setRuleString(e.target.value)}
        placeholder="Enter rule"
        required
      />
      <button type="submit">Create Rule</button>
      {
          ast!==null?<div>{JSON.stringify(ast, null, 2)}</div>:<div>No tree</div>
        }
    </form>
  );
};

export default RuleForm;
