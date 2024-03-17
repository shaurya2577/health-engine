import React, { useState, useEffect } from "react";
import { server_url } from "../constants";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import ResourceCard from "../components/ResourceDashboard/ResourceCard";
import BaseLayout from "../layouts/BaseLayout";
import VerifyPassword from "../VerifyPassword";
import { AuthProvider } from "../AuthContext";

function NewResource() {
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("Partnership");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState("");

  const navigate = useNavigate();

  const handleSelectTag = (tag) => {
    setSelectedTag(tag);
    setTag(tag);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = { description: description, title: title, tag: tag };

    const response = await fetch("http://localhost:3002/newResource", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    navigate("/");

    if (response.ok) {
      const data = await response.json();
    } else {
      console.error("Failed to add new resource");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let login = await VerifyPassword();
        setIsLoggedIn(login);
        setIsLoading(false);
      } catch (error) {
        console.error("Error verifying login:", error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center h-[80vh] justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

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
                <div className="mb-2">Card Tag</div>
                <div>
                  <button
                    className={`px-3 rounded-md py-1 text-lg ${
                      selectedTag === "partnership"
                        ? "bg-card-orange text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleSelectTag("partnership")}
                  >
                    Partnership
                  </button>
                  <button
                    className={`ml-2 px-3 rounded-md py-1 text-lg ${
                      selectedTag === "dataset"
                        ? "bg-card-orange text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleSelectTag("dataset")}
                  >
                    Dataset
                  </button>
                  <button
                    className={`ml-2 px-2 rounded-md py-1 text-lg ${
                      selectedTag === "guide"
                        ? "bg-card-orange text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleSelectTag("guide")}
                  >
                    Guide
                  </button>
                  <button
                    className={`ml-2 px-2 rounded-md py-1 text-lg ${
                      selectedTag === "other"
                        ? "bg-card-orange text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleSelectTag("other")}
                  >
                    Other
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <div className="mb-2">Resource URL Link</div>
                <input
                  required
                  placeholder="url"
                  className="pl-2 rounded-md py-1 placeholder:italic text-lg w-full"
                  onChange={(e) => {
                    setURL(e.target.value);
                  }}
                ></input>
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
              {title === "" && description === "" ? (
                <ResourceCard
                  title="Default Title"
                  description="Default Description"
                  tag={tag}
                  url={url}
                ></ResourceCard>
              ) : (
                <ResourceCard
                  title={title}
                  description={description}
                  tag={tag}
                  url={url}
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
