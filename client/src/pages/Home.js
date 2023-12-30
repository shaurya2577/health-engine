import React from "react";
import { server_url } from "../constants";

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
    <div className="text-3xl flex flex-col h-screen">
      hello world
      <br></br>- health engine
      <button
        onClick={im_a_teapot}
        className="border-black border-2 p-2 mt-3 w-64 hover:bg-lime-100"
      >
        click me :)
      </button>
    </div>
  );
}

export default Home;
