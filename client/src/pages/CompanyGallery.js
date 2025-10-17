import React, { useEffect, useState } from "react";
import CompanyCard from "../components/CompanyGallery/CompanyCard";
import BaseLayout from "../layouts/BaseLayout";
import { AuthProvider } from "../AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { companiesSupabase } from "../createclient";

function CompanyGallery() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function fetchCompanies() {
      const { data, error } = await companiesSupabase()
        .from("companies")
        .select("*");
      
      if (error) {
        console.error("Error fetching companies:", error);
      } else {
        setCompanies(data);
      }
    }
    
    fetchCompanies();
  }, []);

  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <BaseLayout>
          <div className="pb-20">
            <div className="flex flex-col items-center pt-12 mb-8 font-bold text-site-black">
              <div className="text-[50px]">Health Engine</div>
              <div className="text-[65px] -mt-6">Portfolio Companies</div>
            </div>

            <div className="mx-24">
              <div className="text-4xl font-bold text-site-black">
                Our Companies
              </div>
              <div className="bg-site-black h-[3px] mt-2 mb-8"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
              {companies?.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
            </div>
          </div>
        </BaseLayout>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default CompanyGallery; 