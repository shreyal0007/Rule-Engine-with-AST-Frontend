import React, { useState } from "react";
import { combineRules } from "../api"; // Adjust the import path accordingly
import { toast } from "react-toastify"; // Import toast
import "./RuleCombiner.css";

const RuleCombiner = ({ onCombine }) => {
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
        onCombine(result.combinedAST); // Pass the combined AST back to the parent

        // Show success toast when rules are combined successfully
        toast.success("Rules combined successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        setError("Failed to combine rules. Please check your input.");
      }
    } catch (error) {
      setError("Error combining rules. Please try again.");
      setCombinedAST(null);
    }
  };

  return (
    <div className="rulecombinemain">
      <p className="combineruleheader">Combine Rules</p>
      <input
        className="rulecombineinput"
        placeholder="Enter rules, separated by commas..."
        onChange={(e) =>
          setRules(e.target.value.split(",").map((rule) => rule.trim()))
        }
      />
      <button onClick={handleCombineRules} className="combinerulebutton">
        Combine Rules
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default RuleCombiner;

//  {
//    /* {combinedAST && (
//         <div>
//           <h2>Combined AST:</h2>
//           <pre>{JSON.stringify(combinedAST, null, 2)}</pre>
//         </div>
//       )} */
//  }
