import { useState } from "react";
import "./styles.css";
import UserProfile from "./UserProfile.jsx";
import Quests from "./Quests.jsx";

//MISC NOTES*************************************
// Dragon Quests (or kittens dressed as dragons :D)
// User completes quests to earn XP
// After so much XP, user gets to pick a dragon egg (lvl up?)
// Notification that explains the dragon egg/paths
// User picks the dragon egg
// Profile for each of the dragon eggs
// What dragons they become (name)
// How much food to feed them (how big they get)
// What their power is (how much food they get)
// What their speed is (based on size/age)
// As user gets xp, dragon ages.  As dragon ages
// They get bigger- require more food- power goes up
// These change % wise based on species
// HP is age + stats
// Battles
// Permadeath

//TO-DO*******************************************8
//Add User Profile button below quest log
//Add to User Profile- User Name, Log in Info, Quest info (complete/daily/abandoned), User XP, User Level

export default function App() {
  const [view, setView] = useState("quests");

  const viewChange = (newView) => {
    setView(newView);
    console.log("viewchange");
  };

  return (
    <div className="bodywrapper">
      <header>battle-cat-quests</header>
      <div className="userBtn">
        <button className="menuBtn" onClick={() => viewChange("quests")}>
          Quests
        </button>
        <button className="menuBtn" onClick={() => viewChange("user")}>
          User Profile
        </button>
      </div>
      <div>
        {view === "user" && <UserProfile />}
        {view === "quests" && <Quests />}
      </div>
    </div>
  );
}