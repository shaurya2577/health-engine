import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ResourceCard from "../components/ResourceDashboard/ResourceCard";
import BaseLayout from "../layouts/BaseLayout";
import { useAuth } from "../AuthContext";

function NewResource() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("https://readysethealth.io")
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("Partnership");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isSignedIn, getAuthHeaders, loading } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    const body = { description: description, title: title, tag: tag, link: link};

    try {
      const response = await fetch("http://localhost:3002/newResource", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...getAuthHeaders()
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to create resource");
      }
    } catch (error) {
      console.error("Error creating resource:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center h-[80vh] justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <BaseLayout>
      <div className="mx-24 text-2xl">
        Add a new resource to the Health Engine resources database
      </div>
      {error && (
        <div className="mx-24 mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
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
                  className="bg-card-orange text-white font-bold py-2 px-4 rounded mt-8 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Submit"}
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