import React, { useEffect, useState } from "react";
import logo from "../assets/logo-full.png";
import { jwtDecode } from "jwt-decode"
import { useAuth } from "../AuthContext"; // Adjust the path accordingly


function Header() {
  const [user, setUser] = useState({});
  const { isSignedIn, setIsSignedIn } = useAuth();

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
    console.log(userObject);
    setUser(userObject);
    setIsSignedIn(true);
    localStorage.setItem("user", JSON.stringify(userObject));
    localStorage.setItem("isSignedIn", JSON.stringify(true));
    document.getElementById("signInDiv").hidden= true;
  };

  function handleSignOut(event) {
    localStorage.removeItem("user");
    localStorage.removeItem("isSignedIn");
    document.getElementById("signInDiv").hidden= false;
    setIsSignedIn(false);
    setUser({});
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "731231387889-jtv4doi6v3asmmhuf7d7537jkjcpsfta.apps.googleusercontent.com", 
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "dark", width: 100, height: 50}
    )
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-2">
        <a href="/">
          <div className="w-64 ml-3">
            <img src={logo} />
          </div>
        </a>
        <div className="flex text-xl justify-self-end gap-7 font-medium mt-5 mr-4 text-site-black">
          <a href="/">
            <div>Resources</div>
          </a>
          <a href="/todo">
            <div>Investor Database</div>
          </a>
          <a href="/todo">
            <div>About</div>
          </a>
          
          <div id="signInDiv" className={`mb-5 ${isSignedIn ? 'hidden' : ''}`}></div>
          { isSignedIn && 
            <div id="userProfile" className="flex items-center">
              <img src={user.picture} className="rounded-full w-10 h-10 mr-2" alt="User" />
              <div className=" mr-5">{user.name}</div>
              <button onClick={(e) => handleSignOut(e)} className="ml-5">Sign Out</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Header;
