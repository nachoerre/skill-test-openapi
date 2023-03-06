import "./LeadsList.css";
import React, { useState, useEffect, useContext } from "react";
import { fetchConsultantTypes, fetchProjectTypes } from "../lib/api";
import axios from "axios";
import { AuthContext } from "../store/AuthContext";
import LeadCard from "../UI/LeadCard";

function LeadsList() {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [consultantTypes, setConsultantTypes] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const { token } = useContext(AuthContext);

  const url = `https://staging-api.expertplans.co.uk/admins/leads/getAll/${currentPage}`;

  const fetchLeads = async () => {
    const consultantTypes = await fetchConsultantTypes();
    const projectTypes = await fetchProjectTypes();
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });

      if (!response.status === 200) {
        throw new Error("Failed to fetch leads data");
      }

      const data = response;
      setLeads(data.data.rows);
      setTotalPages(data.data.count);
      setConsultantTypes(consultantTypes);
      setProjectTypes(projectTypes);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    fetchLeads();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > totalPages) {
      setCurrentPage(1);
    } else {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="leads-container">
      <h2>Leads</h2>
      {isLoading ? (
        <p>Loading leads...</p>
      ) : (
        <>
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              consultantType={consultantTypes[lead.consultantTypeId - 1].name}
              projectType={projectTypes[lead.projectTypeId - 1].name}
            />
          ))}
          <div className="leads-pagination">
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Page {currentPage}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default LeadsList;
