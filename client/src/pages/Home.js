import React, { useEffect, useState } from "react";
import Dashboard from "../pages/Dashboard";
import * as constants from "../constants";
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
      const response = await fetch(`${constants.server_url}/resources`);  
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
  console.log(resourcesAll)


  const toggleDefault = () => {
    selectAllResources(true);
    selectGuide(false);
    selectPartnership(false);
    selectDataset(false);
  };

  const [guide, selectGuide] = useState(false);
  const toggleGuides = () => {
    selectGuide(true);
    selectAllResources(false);
    selectPartnership(false);
    selectDataset(false);
  };
  const resourcesGuides = resourcesAll.filter(function(item){
    return item.class == "guide";
  });

  const [partnership, selectPartnership] = useState(false);
  const togglePartnership = () => {
    selectGuide(false);
    selectAllResources(false);
    selectPartnership(true);
    selectDataset(false);
  };
  const resourcesPartnerships = resourcesAll.filter(function(item){
    return item.class=="partnership";
  });

  const [dataset, selectDataset] = useState(false);
  const toggleDataset = () => {
    selectGuide(false);
    selectAllResources(false);
    selectPartnership(false);
    selectDataset(true);
  };
  const resourcesDatasets = resourcesAll.filter(function(item){
    return item.class=="dataset";
  });

  return (
    <div>
    <br></br>
    <div className="text-5xl flex flex-col h-screen items-center pt-20">
      Health Engine Resource Dashboard
      <br></br><br></br>
      <button onClick={event => window.location.href='/new'} className="text-2xl border-black border-2 p-2 mt-3 w-64 hover:bg-lime-100">
        Create New Resource
      </button>

  <div className="flex space-x-4 mt-10 text-2xl justify-start pl-4">
    <button onClick={ toggleDefault } className="float-left bg-orange-500 hover:bg-white-300 text-white py-2 px-4 rounded">Default</button>
    <button onClick={ toggleGuides } className="float-left bg-blue-500 hover:bg-white-300 text-white py-2 px-4 rounded">Guides</button>
    <button onClick= { togglePartnership } className="float-left bg-red-500 hover:bg-white-300 text-white py-2 px-4 rounded">Partnerships</button>
    <button onClick={ toggleDataset } className="float-left bg-purple-500 hover:bg-white-300 text-white py-2 px-4 rounded">Datasets</button>
  </div>
  
    {allresources ? (
      <Dashboard filteredResources={ resourcesAll }></Dashboard>
      ) : null}

    {partnership ? (
      <Dashboard filteredResources={ resourcesPartnerships }></Dashboard>
      ) : null}

    {dataset ? (
      <Dashboard filteredResources={ resourcesDatasets }></Dashboard>
      ) : null}

    {guide ? (
      <Dashboard filteredResources={ resourcesGuides }></Dashboard>
      ) : null}
          
    </div>


    </div>

  );
}

export default Home;
