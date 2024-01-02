import React, { useEffect, useState } from "react";
import { server_url } from "../constants";
// import ResourceCard from "../Card.js" 

function Home() {
  // async function im_a_teapot() {
  //   try {

  //     const response = await fetch(`${server_url}/sample-route`, {
  //       method: "POST",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("There was a problem with the fetch operation:", error);
  //   }
  // }

  
  const [resources, setResources] = useState([]);

  const allResources = async() => {
    try{
      const response = await fetch(`${server_url}/resources`);  
      const json_response = await response.json();
      setResources(json_response);
    } catch (error) {
        console.error(error.message);
    }
  };

  useEffect(() => {
    allResources();
  }, []);

  // console.log(resources);

  return (
    <div>
    <br></br>
    <div className="text-5xl flex flex-col h-screen items-center pt-20">
      Health Engine Resource Dashboard
      <br></br><br></br>
      <button onClick={event => window.location.href='/new'} className="text-2xl border-black border-2 p-2 mt-3 w-64 hover:bg-lime-100">
        Create New Resource
      </button>
    <div>
      <div className="text-2xl flex flex-row p-20 mr-5" style={{ display: "flex", flexDirection: "row" }}>
        {resources.map(resource_entry => (
          <div key={resource_entry.resource_id} class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
              <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
          </a>
          <div class="p-6">
              <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{resource_entry.title}</h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> {resource_entry.description} </p>
              <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {resource_entry.class}
                  <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </a>
          </div>
      </div>
        ))}
      </div>
    </div>
    </div>
    </div>

  );
}

export default Home;
