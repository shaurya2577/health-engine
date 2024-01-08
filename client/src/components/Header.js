import React from "react";
import logo from "../assets/logo-full.png";
import SignInButton from "../components/Login";
import SignOutButton from "../components/Logout";

function Header() {
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
          {/* <button href="/todo">
            <div>Log in</div>
          </button> */}
          <div>
            {/* <SignInButton></SignInButton> */}
          {/* <SignOutButton></SignOutButton> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
