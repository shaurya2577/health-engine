import React from "react";
import "./CompanyCard.css";

function CompanyCard({ company }) {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl company-card gradient-border card-glow">
      {/* Image Container with Fixed Aspect Ratio */}
      <div className="relative w-full pt-[60%]">
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="absolute top-0 left-0 w-full h-full object-contain p-4 bg-gray-50"
          onError={(e) => {
            e.target.src = '/default-logo.png';
            e.target.className = "absolute top-0 left-0 w-full h-full object-contain p-4 bg-gray-50 opacity-50";
          }}
        />
      </div>

      {/* Content Container */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-[#192029] line-clamp-1">
          {company.name}
        </h3>
        <p className="text-gray-500 mb-4 text-sm">Cohort {company.cohort}</p>
        
        {company.description && (
          <p className="text-[#24292e] mb-4 text-sm description-clamp">
            {company.description}
          </p>
        )}

        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="website-button inline-block px-4 py-2 text-white text-sm rounded-md"
          >
            Visit Website
          </a>
        )}
      </div>
    </div>
  );
}

export default CompanyCard;