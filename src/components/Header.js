import React, { useState } from "react";
import "./Header.css"

function Header({ onSelectLeads, onSelectBusiness }) {
  const [activeTab, setActiveTab] = useState("leads");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "leads") {
      onSelectLeads();
    } else if (tab === "business") {
      onSelectBusiness();
    }
  };

  return (
    <div className="header">
      <button
        className={activeTab === "leads" ? "active" : ""}
        onClick={() => handleTabClick("leads")}
      >
        Leads
      </button>
      <button
        className={activeTab === "business" ? "active" : ""}
        onClick={() => handleTabClick("business")}
      >
        Business
      </button>
    </div>
  );
}

export default Header;
