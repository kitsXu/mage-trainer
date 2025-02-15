import React from "react";
import { useState } from "react";
import { LoadingIndicator } from "./LoadingIndicator.jsx";
import SetUsername from "./SetUsername.jsx";
import kit from "./images/kit1.png";
import "./Logo.css";

export default function LogoPage(props) {
  const [landingPageVisibility, setLandingPageVisibility] = useState(false);
  const [logoVisibility, setLogoVisibility] = useState(true);

  //-- change visibility on logo elements and 'landingPage'
  const handleClick = () => {
    setLandingPageVisibility(!landingPageVisibility);
    setLogoVisibility(!logoVisibility);
  };

  //-- REMARK: do this better than i did. :)
  if (props.isLoading || !props.user) return <LoadingIndicator />;
  if (!!props.user.name) return null;

  return (
    <div className="bodyWrapper">
      <div className="logoPage">
        {logoVisibility && <img className="fox" src={kit}></img>}

        {logoVisibility && (
          <a className="logo-tag-logo" href="https://ko-fi.com/kitsxu">
            -kitsXu apps-
          </a>
        )}
        {logoVisibility && (
          <header className="landingHeader">Echoes of the Eldergrove</header>
        )}
        {logoVisibility && (
          <div className="btnWrapper">
            <label className="playBtnTag">Press 'Play' to begin</label>
            <button className="playBtn" onClick={handleClick}>
              Play
            </button>
          </div>
        )}
        {logoVisibility && <div className="landing-divider-bottom">______________</div>}

        {landingPageVisibility && (
          <SetUsername
            user={props.user}
            isLoading={props.isLoading}
            setRefreshKey={props.setRefreshKey}
          />
        )}
      </div>
    </div>
  );
}
