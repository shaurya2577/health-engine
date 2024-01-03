import React, { useEffect, useState } from "react";
import { server_url } from "../constants";
// import ResourceCard from "../Card.js" 

function Home() {
  
    // render(
    //   <form className="text-2xl flex flex-col h-screen items-left">
    //     <label htmlFor="search_filter">Select Resource Type</label><select id="search_filter" className="form-control">
    //         <option value="all">All</option>
    //         <option value="partnership">Partnership</option>
    //         <option value="dataset">Dataset</option>
    //         <option value="guide">Guide</option>
    //     </select><br></br><br></br>
    //     <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" onClick={props.onClick}>Submit</button>
    //   </form>
    // )

  
  const [resourcesAll, setResources] = useState([]);
  // console.log(resourcesGuides)

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

  const [allresources, selectAllResources] = useState(true);
  const toggleDefault = () => {
    selectAllResources(!allresources);
    selectGuide(guide);
    selectPartnership(partnership);
    selectDataset(false);
  };

  const [guide, selectGuide] = useState(false);
  const toggleGuides = () => {
    selectGuide(!guide);
    selectAllResources(false);
    selectPartnership(false);
    selectDataset(false);
  };
  const resourcesGuides = resourcesAll.filter(function(item){
    return item.class="guide";
  });

  const [partnership, selectPartnership] = useState(false);
  const togglePartnership = () => {
    selectGuide(false);
    selectAllResources(false);
    selectPartnership(true);
    selectDataset(false);
  };
  const resourcesPartnerships = resourcesAll.filter(function(item){
    return item.class="partnership";
  });

  const [dataset, selectDataset] = useState(false);
  const toggleDataset = () => {
    selectGuide(false);
    selectAllResources(false);
    selectPartnership(false);
    selectDataset(true);
  };
  const resourceDatasets = resourcesAll.filter(function(item){
    return item.class="dataset";
  });

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
      <button onClick={ toggleDefault } className="bg-orange-500 hover:bg-white-300 text-white py-2 px-4 rounded">Default</button>
      {allresources ? (
        <div className="text-2xl p-20 mr-5 grid grid-cols-3 gap-8">
        {resourcesAll.map((resource_entry) => (
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
      ) : null}
    </div>
    <div>
      <button onClick={ toggleGuides } className="bg-blue-500 hover:bg-white-300 text-white py-2 px-4 rounded">Guides</button>
      {guide ? (
        <p>testing guides</p>
      ) : null}
    </div>
    <div>
      <button onClick= { togglePartnership } className="bg-red-500 hover:bg-white-300 text-white py-2 px-4 rounded">Partnerships</button>
      {partnership ? (
        <p>testing partnership</p>
      ) : null}
    </div>

    <div>
      <button onClick={ toggleDataset } className="bg-orange-500 hover:bg-white-300 text-white py-2 px-4 rounded">Datasets</button>
      {dataset ? (
        <p>testing dataset</p>
      ) : null}
    </div>


    </div>
    </div>

  );
}

export default Home;
