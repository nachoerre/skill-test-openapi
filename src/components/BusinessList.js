import React, { useState, useEffect } from "react";
import "./BusinessList.css"
import { fetchProjectTypes } from "../lib/api";

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBusinesses = async () => {
    const projectTypes = await fetchProjectTypes();
    setBusinesses(projectTypes);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchBusinesses();
  }, []);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="business-list">
      <h1>Businesses</h1>
      {isLoading ? (
        <p>Loading business...</p>
      ) : (
        <div className="business-item">
          <h2>{businesses[currentPage].name}</h2>
          <button onClick={handlePrevPage} disabled={currentPage === 0}>
            Prev Page
          </button>
          <button
            onClick={handleNextPage}
            disabled={businesses.length === currentPage + 1}
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
};

export default BusinessList;
