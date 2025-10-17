import React, { useEffect, useState } from "react";
import { AuthProvider } from "../AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import BaseLayout from "../layouts/BaseLayout";

function InvestorDashboard() {
    return (
        <AuthProvider> 
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <BaseLayout>
        <div className="pb-20">
            <div>
                <div>
                    <div className="flex flex-col items-center pt-12 mb-8 font-bold text-site-black">
                    <div className="text-[50px]">Health Engine</div>
                    <div className="text-[65px] -mt-6">Investor Dashboard</div>
                    </div>
                    
                    <div className="mx-24 text-4xl font-bold text-site-black">
                        Resource List
                    </div>
                    <div className="mx-24 bg-site-black h-[3px] mt-2"></div>
                    <div className="py-5 text-2xl rounded-full flex mx-24 my-4">
                        <p>Our investor network remainds dedicated to bringing the best expertise and support to our founders. Check them out <a style={{textDecoration: "underline", color: "orange"}} href="https://airtable.com/appDKUYdh9WE3Zjhs/shrolgo8UQ4wyMNuw">here!</a></p>
                    </div>
                    <div className="flex justify-center w-full">
                        <iframe 
                            title="Airtable Network Embed"
                            className="airtable-embed"
                            src="https://airtable.com/embed/appDKUYdh9WE3Zjhs/shrolgo8UQ4wyMNuw/tblRCjLkZ825BnMoj/viwpvuDxcXgnPi2AS?viewControls=on"
                            width="85%"
                            height="533"
                            style={{
                                background: "transparent",
                                border: "1px solid #ccc"
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
      </BaseLayout>
      </GoogleOAuthProvider>
     </AuthProvider>
    );
}

export default InvestorDashboard;