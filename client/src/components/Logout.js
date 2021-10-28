import React from 'react'
import { GoogleLogout } from "react-google-login";

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
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Log Out"
          onSuccess={handleLogout}
          onFailure={handleLogout}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );
}

export default Logout
