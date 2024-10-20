import React, { useState, useEffect } from "react";
import RuleForm from "../../components/RuleForm";
import RuleList from "../../components/RuleList";
import { fetchRules } from "../../api"; // Adjust the import path

const CreateRule = () => {
  const [rules, setRules] = useState([]);

  const handleRuleCreated = (newRule) => {
    setRules((prevRules) => [...prevRules, newRule]);
  };

  const fetchAndSetRules = async () => {
    try {
      const response = await fetchRules();
      if (response && Array.isArray(response)) {
        setRules(response);
      } else {
        setRules([]);
      }
    } catch (error) {
      console.error("Error fetching rules:", error.message);
      setRules([]);
    }
  };

  useEffect(() => {
    fetchAndSetRules();
  }, [rules]);

  return (
    <div>
      <RuleForm onRuleCreated={handleRuleCreated} />
      <h2>Existing Rules</h2>
      <RuleList rules={rules} />
    </div>
  );
};

export default CreateRule;
