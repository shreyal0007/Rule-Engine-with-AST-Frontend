import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./TitleBar.css"; // Make sure this CSS file handles styling

const TitleBar = ({ onSelectTab }) => {
  const navigate = useNavigate(); // For navigation
  const location = useLocation(); // To get the current path
  const [activeTab, setActiveTab] = useState("create");

  // Sync the active tab with the current route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/create") {
      setActiveTab("create");
    } else if (path === "/evaluate") {
      setActiveTab("combine");
    }
  }, [location.pathname]);

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
