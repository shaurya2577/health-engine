import React, { useEffect, useState } from "react";
import BaseLayout from "../layouts/BaseLayout";
import { AuthProvider, useAuth } from "../AuthContext";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { analyticsSupabase } from "../createclient";
import ReportCard from "../components/AnalyticsDashboard/ReportCard";

function AnalyticsContent() {
  const { isSignedIn } = useAuth();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function fetchReports() {
      if (isSignedIn) {
        const { data, error } = await analyticsSupabase
          .from("reports")
          .select("*");
        if (error) {
          console.error("Error fetching reports:", error);
        } else {
          setReports(data);
        }
      }
    }
    fetchReports();
  }, [isSignedIn]);

  return (
    <div>
      <div className="flex flex-col items-center pt-12 mb-8 font-bold text-site-black">
        <div className="text-[50px]">Health Engine</div>
        <div className="text-[65px] -mt-6">Analytics Engine</div>
      </div>
      
      {!isSignedIn && (
        <div className="text-3xl justify-center items-center flex">
          Welcome to Health Engine's Analytics Engine! To access these
          reports, please sign in.
        </div>
      )}
      {isSignedIn && (
        <div>
          <div className="mx-24 text-4xl font-bold text-site-black">
            Venture Reports
          </div>
          <div className="mx-24 bg-site-black h-[3px] mt-2"></div>
          <div className="mx-24 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
            <ReportCard
                key={report.id}
                title={report.title}
                description={report.description}
                cohort={report.cohort}
                link={report.link}
            />
            ))}
        </div>
        </div>
      )}
    </div>
  );
}

function Analytics() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="731231387889-jtv4doi6v3asmmhuf7d7537jkjcpsfta.apps.googleusercontent.com">
        <BaseLayout>
          <AnalyticsContent />
        </BaseLayout>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default Analytics;