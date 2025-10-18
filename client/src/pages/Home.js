import React, { useEffect, useState } from "react";
import BaseLayout from "../layouts/BaseLayout";
import ResourceDashboard from "../components/ResourceDashboard";
import { AuthProvider, useAuth } from "../AuthContext";
import { createClient } from "@supabase/supabase-js";
import { GoogleOAuthProvider } from '@react-oauth/google';



const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);


function Content() {
  const [allResources, setAllResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const { isSignedIn } = useAuth();
  const checkState = isSignedIn;

  const getAllResources = async () => {
    try {
      // const response = await fetch(`${server_url}/resources`);
      // const data = await response.json();

      const { data, error } = await supabase.from("resources").select();
      if (error) {
        throw error;
      }
      setAllResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error.message);
    }
  };


  function toggleFilter(filter) {
    if (filter === "*") {
      setFilteredResources(allResources);
    } else {
      const filtered = allResources.filter((item) => item.tag === filter);
      setFilteredResources(filtered);
    }
  }

  useEffect(() => {
    getAllResources();
  }, []);

  useEffect(() => {
    setFilteredResources(allResources);
  }, [allResources]);

  return (
    <div>
      <div>
        <div className="flex flex-col items-center pt-12 mb-8 font-bold text-site-black">
          <div className="text-[50px]">Health Engine</div>
          <div className="text-[65px] -mt-6">Founder Portal</div>
        </div>
        
        {!checkState && (
          <div className="text-3xl justify-center items-center flex">
            Welcome to Health Engine's Founder Portal! To access these
            resources, please sign in.
          </div>
        )}
        {checkState && (
          <div>
            <div className="mx-24 text-4xl font-bold text-site-black">
              Resource List
            </div>
            <div className="mx-24 bg-site-black h-[3px] mt-2"></div>
            <div className="flex space-x-4 mt-4 text-lg justify-start mx-24">
              <button
                onClick={() => toggleFilter("*")}
                className="bg-button-red text-white py-2 px-4 rounded-full font-semibold hover:bg-button-hover-red"
              >
                All
              </button>
              <button
                onClick={() => toggleFilter("guide")}
                className="bg-button-red text-white py-2 px-4 rounded-full font-semibold hover:bg-button-hover-red"
              >
                Guides
              </button>
              <button
                onClick={() => toggleFilter("partnership")}
                className="bg-button-red text-white py-2 px-4 rounded-full font-semibold hover:bg-button-hover-red"
              >
                Partnerships
              </button>
              <button
                onClick={() => toggleFilter("dataset")}
                className="bg-button-red text-white py-2 px-4 rounded-full font-semibold hover:bg-button-hover-red"
              >
                Datasets
              </button>
            </div>
            <div className="mx-24 mb-24">
              <ResourceDashboard
                filteredResources={filteredResources}
              ></ResourceDashboard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Home() {
  return (
    <AuthProvider> 
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <BaseLayout>
        {true && <Content />}
      </BaseLayout>
      </GoogleOAuthProvider>
     </AuthProvider>
  );
}

export default Home;
