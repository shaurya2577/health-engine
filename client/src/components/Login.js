import React from "react";
import { GoogleLogin } from "react-google-login";

function SignInButton() {
    const onSuccess = (res) => {
        console.log('Login was successful. Welcome ', res.profileObj);
    };
    const onFailure = (res) => {
        console.log('Login failed. Response: [$1] ', [res.profileObj]);
    };
    return (
        <div>
        <GoogleLogin
            clientId="855901742522-e6qf5djrm28p9ad6meins9b7233eu21d.apps.googleusercontent.com"
            buttonText = "Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy = {"single_host_origin"}
            isSignedIn={true}> </GoogleLogin> </div>
    );
};

export default SignInButton;
