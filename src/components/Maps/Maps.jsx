import { useState } from "react";

import "./Maps.css";

//-- TO DO --
// - [ ] check quests entered against local storage 'quests', if they are there you can't accept

export default function Quests() {
  const [visibility, setVisibility] = useState(false);

  //--change visibility of an element
  function showHide() {
    if (visibility === false) setVisibility(true);
    else setVisibility(false);
  }

  return (
    <div className="questWrapper">
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>{" "}

      <div className="mapsWrapper">
        <div className="profile-maps-info">
          Maps are being meticulously drawn up to keep track of your adventures.
          When these are implemented, you'll be able to gain experience for each
          new location you travel to!
        </div>
        <div className="profile-maps">Please be patient while we work!</div>
      </div>
      <div className="divider">_________</div>
      <div className="logo">
        <a className="logo-tag-quest" href="https://ko-fi.com/kitsxu">
          -kitsXu-
        </a>
      </div>
    </div>
  );
}
