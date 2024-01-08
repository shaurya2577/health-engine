import React from "react";
import { GoogleLogout } from "react-google-login";

function SignOutButton() {
    const onSuccess = (res) => {
        alert('Logout was successful');
    };
    return (
        <div>
            <GoogleLogout></GoogleLogout>
        </div>
    );
};

export default SignOutButton;
