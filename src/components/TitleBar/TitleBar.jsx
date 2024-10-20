import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TitleBar.css"; // Make sure this CSS file handles styling

const TitleBar = ({ onSelectTab }) => {
  const [activeTab, setActiveTab] = useState("create");
  const navigate = useNavigate(); // For navigation

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    // Call the onSelectTab prop passed from the parent component
    if (onSelectTab) {
      onSelectTab(tab);
    }

    // Navigate to the appropriate route
    if (tab === "create") {
      navigate("/create");
    } else if (tab === "combine") {
      navigate("/evaluate");
    }
  };

  return (
    <div className="navbar">
      <div
        className={`tab ${activeTab === "create" ? "active" : ""}`}
        onClick={() => handleTabClick("create")}
      >
        Create Rule
      </div>
      <div
        className={`tab ${activeTab === "combine" ? "active" : ""}`}
        onClick={() => handleTabClick("combine")}
      >
        Combine and Evaluate
      </div>
      <div
        className="active-bar"
        style={{ left: activeTab === "create" ? 0 : "50%" }}
      />
    </div>
  );
};

export default TitleBar;
