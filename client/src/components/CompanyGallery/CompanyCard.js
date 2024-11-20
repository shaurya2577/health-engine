import React from "react";

function CompanyCard({ company }) {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Image Container with Fixed Aspect Ratio */}
      <div className="relative w-full pt-[60%]"> {/* 60% aspect ratio */}
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="absolute top-0 left-0 w-full h-full object-contain p-4 bg-white"
          onError={(e) => {
            e.target.src = '/default-logo.png'; // Add a default logo image
            e.target.className = "absolute top-0 left-0 w-full h-full object-contain p-4 bg-white opacity-50";
          }}
        />
      </div>

      {/* Content Container */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-[#192029] line-clamp-1">
          {company.name}
        </h3>
        <p className="text-gray-500 mb-4 text-sm">Cohort {company.cohort}</p>
        
        {/* Description with clamp */}
        {company.description && (
          <p className="text-[#24292e] mb-4 text-sm description-clamp">
            {company.description}
          </p>
        )}

        {/* Website Link */}
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-[#222] transition-colors duration-300"
          >
            Visit Website
          </a>
        )}
      </div>
    </div>
  );
}

export default CompanyCard;