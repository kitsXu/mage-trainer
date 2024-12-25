import kitsXu2 from "./images/kitsXu2.png";
import React from "react";
import { useState } from "react";
import LandingPage from "./LandingPage.jsx";
import dragon from "./images/dragon4.png";
import kit from "./images/kit1.png"
import "./Logo.css";
import { LoadingIndicator } from "./LoadingIndicator";

export default function Logo(props) {
  const [landingPageVisibility, setLandingPageVisibility] = useState(false);
  const [logoVisibility, setLogoVisibility] = useState(true);

  if (props.isLoading || !props.user) return <LoadingIndicator />;
  if (!!props.user.name) return null;

  const handleClick = () => {
    setLandingPageVisibility(!landingPageVisibility);
    setLogoVisibility(!logoVisibility);
  };

  return (
    <div className="bodyWrapper">
      {logoVisibility && <div className="landing-divider">_________</div>}
      {logoVisibility && (
        <header className="landingHeader">brood leader</header>
      )}
      <div className="logoPage">
        {logoVisibility && <img className="fox" src={dragon}></img>}
        {logoVisibility && (
          <div className="btnWrapper">
            <label className="playBtnTag">Press 'Play' to start</label>
            <button className="playBtn" onClick={handleClick}>
              Play
            </button>
          </div>
        )}
        {logoVisibility && <div className="foot-divider">______________</div>}

        {logoVisibility && (
          <div className="logo">
            <img className="logo-image" src={kit}></img>
            <a className="logo-tag-logo" href="https://ko-fi.com/kitsxu">
              -kitsXu apps-
            </a>
          </div>
        )}
        {landingPageVisibility && (
          <LandingPage
            user={props.user}
            isLoading={props.isLoading}
            setRefreshKey={props.setRefreshKey}
          />
        )}
      </div>
    </div>
  );
}
