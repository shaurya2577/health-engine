import React, { useState } from "react";
import { server_url } from "../constants";
import { useNavigate } from "react-router-dom";
import ResourceCard from "../components/ResourceDashboard/ResourceCard";
import BaseLayout from "../layouts/BaseLayout";
import { AuthProvider } from "../AuthContext";

function NewResource() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("Partnership");
  const [link, setLink] = useState("")
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = { description: description, title: title, tag: tag, link: link};

    const response = await fetch("http://localhost:3002/newResource", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    console.log(JSON.stringify(body));
    navigate("/");

    if (response.ok) {
      const data = await response.json();
      console.log("New resource added:", data);
    } else {
      console.error("Failed to add new resource");
    }
  };

  return (
    <div>
      <AuthProvider>
        <BaseLayout>
          <div className="mx-24 text-2xl">
            Add a new resource to the Health Engine resources database
          </div>
          <div className="grid grid-cols-2 mt-16">
            <div className="mx-24 text-2xl flex flex-col ">
              <div className="">
                <div className="mb-2">Card Title</div>
                <input
                  required
                  placeholder="title"
                  className="pl-2 rounded-md py-1 placeholder:italic text-lg w-full"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                ></input>
              </div>
              <div className="mt-8">
                <div className="mb-2">Body Description</div>
                <textarea
                  rows="4"
                  cols="100"
                  name="text"
                  placeholder="description"
                  className="p-2 placeholder:italic w-full text-lg rounded-md"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mt-6">
                {/* 
                TODO: change to dropdown but from backend provided values
                TODO: allow frontend user to select "other" option and add a new custom tag
                 */}
                <div className="mb-2">
                  Card Tag (partnership, dataset, guide)
                </div>
                <input
                  required
                  placeholder="partnership"
                  className="pl-2 rounded-md py-1 placeholder:italic text-lg"
                  onChange={(e) => setTag(e.target.value.toLowerCase())}
                ></input>

            <div className="mt-8">
                <div className="mb-2">Link to Resource</div>
                <textarea
                  rows="2"
                  cols="100"
                  name="text"
                  placeholder="link"
                  className="p-2 placeholder:italic w-full text-lg rounded-md"
                  onChange={(e) => setLink(e.target.value)}
                ></textarea>
              </div>
              </div>
              <div>
                <button
                  className="bg-card-orange text-white font-bold py-2 px-4 rounded mt-8 hover:opacity-90"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="w-2/3 mt-4 ml-24">
              {title === "" && description === "" && link === "" ? (
                <ResourceCard
                  title="Default Title"
                  description="Default Description"
                  tag={tag}
                  link ="readysethealth.io"
                ></ResourceCard>
              ) : (
                <ResourceCard
                  title={title}
                  description={description}
                  tag={tag}
                  link={link}
                ></ResourceCard>
              )}
              <div className="mt-4 italic">
                Preview of what the card will look like when displayed live:
              </div>
            </div>
          </div>
        </BaseLayout>
      </AuthProvider>
    </div>
  );
}

export default NewResource;
