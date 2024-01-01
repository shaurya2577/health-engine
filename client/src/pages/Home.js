import React from "react";
import { server_url } from "../constants";
import ResourceCard from "../Card.js" 

function Home() {
  async function im_a_teapot() {
    try {

      const response = await fetch(`${server_url}/sample-route`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }
  return (
    <div>
    <br></br>
    <div className="text-5xl flex flex-col h-screen items-center">
      Health Engine Resource Dashboard
      <br></br><br></br>
      <button onClick={event => window.location.href='/new'} className="text-2xl border-black border-2 p-2 mt-3 w-64 hover:bg-lime-100">
        Create New Resource
      </button>
    <div className="text-2xl flex flex-row p-20 mr-5">
      <ResourceCard></ResourceCard>
      <ResourceCard></ResourceCard>
      <ResourceCard></ResourceCard>
      </div>
    </div>
    </div>

  );
}

export default Home;
