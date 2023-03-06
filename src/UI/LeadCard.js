import React from 'react';
import "./LeadCard.css"

const LeadCard = ({ lead, consultantType, projectType }) => {

  return (
    <div className="lead-card">
      <h2>{lead.name}</h2>
      <p>{lead.email}</p>
      <p>{lead.phone}</p>
      <p>{lead.address}</p>
      <p>{consultantType}</p>
      <p>{projectType}</p>
    </div>
  );
};

export default LeadCard;
