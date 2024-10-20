import React, { useState } from "react";
import { createRule } from "../api"; // Adjust the import path as needed
import { toast } from "react-toastify"; // Only use toast, not ToastContainer
import "./RuleForm.css";

const RuleForm = ({ onRuleCreated }) => {
  const [ruleString, setRuleString] = useState("");
  const [ast, setAst] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createRule(ruleString);
      if (response && response.data) {
        setAst(response.data.ast);
        onRuleCreated(response.data);
        setRuleString("");

        // Show success toast
        toast.success("Rule created successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error during rule creation:", error.message || error);

      // Show error toast
      toast.error("Error creating rule. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="ruleformdiv">
      <p className="ruleformheader">Create New Rule</p>
      <form onSubmit={handleSubmit} className="formdiv">
        <input
          type="text"
          value={ruleString}
          className="ruleinput"
          onChange={(e) => setRuleString(e.target.value)}
          placeholder="Enter rule"
          required
        />
        <div className="createrulebuttondiv">
          <button type="submit" className="createrulebutton">
            Create Rule
          </button>
        </div>
      </form>
    </div>
  );
};

export default RuleForm;
