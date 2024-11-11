import React, { useEffect, useState } from "react";
import logo from "../assets/logo-full.png";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../AuthContext"; // Adjust the path accordingly
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

function Header() {
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, setIsSignedIn } = useAuth();

  const loadGoogleScript = () => {
    return new Promise((resolve) => {
      if (typeof google !== "undefined") {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = () => resolve(); // Resolve promise when script is loaded
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedSignInStatus = localStorage.getItem("isSignedIn");

    if (storedUser && storedSignInStatus) {
      setUser(JSON.parse(storedUser));
      setIsSignedIn(JSON.parse(storedSignInStatus));
    }
  }, [setIsSignedIn]);

  function handleCallbackResponse(response) {
    const userObject = jwtDecode(response.credential);
    //console.log(userObject);
    setUser(userObject);
    setIsSignedIn(true);
    localStorage.setItem("user", JSON.stringify(userObject));
    localStorage.setItem("isSignedIn", JSON.stringify(true));
    // document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    localStorage.removeItem("user");
    localStorage.removeItem("isSignedIn");
    setIsSignedIn(false);
    setUser({});
    window.location.reload();
  }

  // useEffect(() => {
  //   loadGoogleScript().then(() => {
  //     /* global google */
  //     google.accounts.id.initialize({
  //       client_id:
  //         "731231387889-jtv4doi6v3asmmhuf7d7537jkjcpsfta.apps.googleusercontent.com",
  //       callback: handleCallbackResponse,
  //     });

  //     google.accounts.id.renderButton(document.getElementById("signInDiv"), {
  //       theme: "dark",
  //       width: 100,
  //       height: 50,
  //     });
  //   });
  // }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-3">
        <a href="/" className="col-span-1">
          <div className="w-64 ml-20">
            <img src={logo} />
          </div>
        </a>
        <div className="flex text-xl justify-self-end gap-7 font-medium mt-5 mr-20 text-site-black col-span-2">
          <a href="/">
            <div>Resources</div>
          
          </a>
          <a href="/investors">
            <div>Investor Database</div>
          </a>
          {/* <a href="/analytics">
            <div>Analytics</div>
          </a> */}
          <a href="/network">
            <div>Network</div>
          </a>
          {!isSignedIn && (
            <div className="-mt-1">
              {/* <div id="signInDiv" className="-mt-2"></div> */}
              <div>
              <GoogleLogin onSuccess={(credentialResponse) => {
                handleCallbackResponse(credentialResponse);
              }}
                onError={() => {
                  console.log('Login Failed');
                }}
            />
            </div>
            </div>
          )}

          {isSignedIn && (
            <div>
              <div
                className="cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                {user.name}
              </div>
              {isOpen && (
                <div className="absolute right-6 mt-2 w-48 bg-white shadow-md rounded-md py-2 hover:bg-gray-100">
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                    onClick={handleSignOut}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
