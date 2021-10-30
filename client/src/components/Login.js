import React from 'react';
import { useContext } from "react";
import { GlobalStoreContext } from "../store";
import {GoogleLogin} from 'react-google-login';
const clientId = '506755665568-6jjmmjkcpuc4of62a2s5idulrbuebr69.apps.googleusercontent.com';


/*
function Login() {
    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:' , res.profileObj);
    };
    const onFailure = (res) => {
        console.log('[Login failed] res:', res);
    };
    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop:'100px'}}
                isSignedIn={true}
                />
        </div>
    )
}

//export default Login


*/


function Login() {
  const { store } = useContext(GlobalStoreContext);
  const handleLogin = async googleData => {  
        const res = await fetch("/api/v1/auth/google", {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId
            }),
    headers: {
      "Content-Type": "application/json"
    }

  });
  console.log("logged in");  
  const data = await res.json();
  console.log("message:", res.message);
  console.log("data var: ", data);
  store.logIn(data);
   
  // store returned user somehow
}
    return (
      <div>
        <GoogleLogin
          clientId="506755665568-6jjmmjkcpuc4of62a2s5idulrbuebr69.apps.googleusercontent.com"
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleLogin}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );
}

export default Login
