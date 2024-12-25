import kitsXu2 from "./images/kitsXu2.png";
import React from "react";
import { useState } from "react";
import LandingPage from "./LandingPage.jsx";
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
      {logoVisibility && <div className="divider">_________</div>}
      {logoVisibility && <header>brood leader</header>}
      <div className="logoPage">
        {logoVisibility && <img className="fox" src={kitsXu2}></img>}
        {logoVisibility && (
          <div className="logo">
            <a className="logo-tag-logo" href="https://ko-fi.com/kitsxu">
              -kitsXu apps-
            </a>
          </div>
        )}
        {logoVisibility && (
          <div className="btnWrapper">
            <label className="playBtnTag">Press 'Play' to start</label>
            <button className="playBtn" onClick={handleClick}>
              Play
            </button>
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
