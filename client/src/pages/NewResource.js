import React, { useState, useEffect } from "react";
import { server_url } from "../constants";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';


import ResourceCard from "../components/ResourceDashboard/ResourceCard";
import BaseLayout from "../layouts/BaseLayout";
import VerifyPassword from "../VerifyPassword";
import { AuthProvider } from "../AuthContext";

function NewResource() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("https://readysethealth.io")
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("Partnership");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = { description: description, title: title, tag: tag, link: link};

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
      <GoogleOAuthProvider clientId="731231387889-jtv4doi6v3asmmhuf7d7537jkjcpsfta.apps.googleusercontent.com">
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
              </div>
                
              <div className="mt-8 mb-4">
                <div className="mb-2">Link</div>
                <input
                  required
                  placeholder="https://readysethealth.io"
                  className="pl-2 rounded-md py-1 placeholder:italic text-lg w-full"
                  onChange={(e) => {
                    setLink(e.target.value);
                  }}
                ></input>
              </div>


              <div className="mb-12">
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
                  link={link}
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
        </GoogleOAuthProvider>
      </AuthProvider>
    </div>
  );
}

export default NewResource;

// <div className="mb-2">Link to Resource</div>
//                 <input
//                   required
//                   placeholder="https://readysethealth.io"
//                   className="pl-2 rounded-md py-1 placeholder:italic text-lg w-full"
//                   onChange={(e) => {
//                     setLink(e.target.value);
//                   }}
//                 ></input>
//               </div>