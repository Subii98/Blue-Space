import React from 'react'
import { GoogleLogout } from "react-google-login";
const clientId = '506755665568-6jjmmjkcpuc4of62a2s5idulrbuebr69.apps.googleusercontent.com';


function Logout() {

    const handleLogout = async (googleData) => {
      const res = await fetch("/api/v1/auth/logout", {
        method: "DELETE",
        body: JSON.stringify({
          token: googleData.tokenId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
    };
    return (
      <div>
        <GoogleLogout
          clientId={clientId}
          buttonText="Log Out"
          onSuccess={handleLogout}
          onFailure={handleLogout}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );
}

export default Logout
