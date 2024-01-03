import React, { useState } from "react";
import { server_url } from "../constants";
import { useNavigate } from "react-router-dom";


function Dashboard(props) {
    const { filteredResources } = props;
    return (
        <div className="text-2xl ml-9 p-20 grid grid-cols-3 gap-8">
        {filteredResources.map((resource_entry) => (
          <div key={resource_entry.resource_id} className="w-80 h-96 bg-white border border-gray-200 rounded-lg shadow overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            {/* <a href="#">
              <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
            </a> */}
            <div className="p-6">
              <a>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{resource_entry.title}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 whitespace-normal break-words">{resource_entry.description}</p>
              <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {resource_entry.class}
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    ) 
};

export default Dashboard;