import React, { useEffect, useState } from "react";
import { AuthProvider } from "../AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import BaseLayout from "../layouts/BaseLayout";

function Network() {
    return (
        <AuthProvider> 
        <GoogleOAuthProvider clientId="731231387889-jtv4doi6v3asmmhuf7d7537jkjcpsfta.apps.googleusercontent.com">
        <BaseLayout>
        <div className="pb-20">
            <div>
                <div>
                    <div className="flex flex-col items-center pt-12 mb-8 font-bold text-site-black">
                    <div className="text-[50px]">Health Engine</div>
                    <div className="text-[65px] -mt-6">Member Network</div>
                    </div>
                    
                    <div className="mx-24 text-4xl font-bold text-site-black">
                        Resource List
                    </div>
                    <div className="mx-24 bg-site-black h-[3px] mt-2"></div>
                    <div className="py-5 text-2xl rounded-full flex mx-24 my-4">
                        <p>Welcome to our network. Feel free to reach out to any of the founders below! If you're interested in joining the network, fill out this <a style={{textDecoration: "underline", color: "orange"}} href="https://airtable.com/appHWqWv44hqq0BBd/pagxEL3vyLVksfBTu/form">form!</a></p>
                    </div>
                    <div className="flex justify-center w-full">
                        <iframe 
                            title="Airtable Network Embed"
                            className="airtable-embed"
                            src="https://airtable.com/embed/appHWqWv44hqq0BBd/shrbxDDQ6zccyA0kX?viewControls=on"
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

export default Network;


// import React from "react";
// import { AuthProvider } from "../AuthContext";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import BaseLayout from "../layouts/BaseLayout";
// import NetworkGallery from "./NetworkGallery"; // Make sure to create this file with the component above

// function Network() {
//     return (
//         <AuthProvider> 
//             <GoogleOAuthProvider clientId="731231387889-jtv4doi6v3asmmhuf7d7537jkjcpsfta.apps.googleusercontent.com">
//                 <BaseLayout>
//                     <div>
//                         <div className="flex flex-col items-center pt-12 mb-8 font-bold text-site-black">
//                             <div className="text-[50px]">Health Engine</div>
//                             <div className="text-[65px] -mt-6">Founder Portal</div>
//                         </div>
                        
//                         <div className="mx-24 text-4xl font-bold text-site-black">
//                             Resource List
//                         </div>
//                         <div className="mx-24 bg-site-black h-[3px] mt-2"></div>
//                         <div className="py-5 text-2xl rounded-full flex mx-24 my-4">
//                             <p>Welcome to our network. Feel free to reach out to any of the founders below! If you're interested in joining the network, fill out this <a style={{textDecoration: "underline", color: "orange"}} href="https://airtable.com/appHWqWv44hqq0BBd/pagxEL3vyLVksfBTu/form">form!</a></p>
//                         </div>
                        
//                         <NetworkGallery />
//                     </div>
//                 </BaseLayout>
//             </GoogleOAuthProvider>
//         </AuthProvider>
//     );
// }

// export default Network;