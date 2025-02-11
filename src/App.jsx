import { useEffect, useState } from "react";
import { LoadingIndicator } from "./components/LandingPage/LoadingIndicator.jsx";
import { chkLevelUp } from "./funcs/chkLevelUp.js";

import "./style.css";

import Archives from "./components/Archives/Archives.jsx";
import Maps from "./components/Maps/Maps.jsx";
import Spells from "./components/Inventory/Spells.jsx";
import Dailies from "./components/Dailies/Dailies.jsx";
import Market from "./components/Market/Market.jsx";
import Inventory from "./components/Inventory/Inventory.jsx";
import LogoPage from "./components/LandingPage/LogoPage.jsx";
import ItemInventory from "./components/Inventory/ItemInventory.jsx";

//-- TODO:
//  - [ ] BUG- check level function not firing when you actually hit the level...

export default function App() {
  const [view, setView] = useState(localStorage.getItem("view") ?? "archives");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [newDailyQuestsCompletedCount, setNewDailyQuestsCompletedCount] =
    useState();
  const [newAbandonedDailyQuestCount, setNewAbandonedDailyQuestCount] =
    useState();
  const [currentDailyQuests, setCurrentDailyQuests] = useState([]);

  const [updatedExp, setUpdatedExp] = useState();

  //-- user "auth". check if user exists in local storage, set if not.  Set view state- 'archives' to local storage.
  useEffect(() => {
    setIsLoading(true);

    localStorage.setItem("view", view ?? "archives");

    const userExists = localStorage.getItem("user");

    if (!userExists) {
      const newUserObject = {
        id: crypto.randomUUID(),
        name: "",
        level: 1,
        experience: 0,
        nextLevelExperience: 10,
        dailyQuestsCompleted: 0,
        abandonedDailyQuests: 0,
        currentDailyQuests: [],
        gold: 0,
        goldIncrease: 50,
      };

      localStorage.setItem("user", JSON.stringify(newUserObject));
      setUser(newUserObject);
      setIsLoading(false);
      return;
    } else {
      const parsedUser = JSON.parse(userExists);
      setUser(parsedUser);
      setView(localStorage.getItem("view") ?? "archives");

      const user = JSON.parse(userExists);
      setNewDailyQuestsCompletedCount(user.dailyQuestsCompleted);
      setNewAbandonedDailyQuestCount(user.abandonedDailyQuests);
      setCurrentDailyQuests(user.currentDailyQuests);
      setUpdatedExp(user.experience);
      setUser(user);

      setIsLoading(false);
    }
  }, [view, refreshKey]);

  useEffect(() => {
    if (!user) return;

    setUpdatedExp(user.dailyQuestsCompleted);
    chkLevelUp(user);
    console.log("Current Quest var set to object");
  }, [currentDailyQuests]);

  //-- spread over user object and conditionally update values.
  useEffect(() => {
    if (!user) return;
    if (typeof user !== "object") {
      setUser(JSON.parse(user));
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        ...(user.dailyQuestsCompleted !== newDailyQuestsCompletedCount
          ? { dailyQuestsCompleted: newDailyQuestsCompletedCount }
          : {}),
        ...(user.abandonedDailyQuests !== newAbandonedDailyQuestCount
          ? { abandonedDailyQuests: newAbandonedDailyQuestCount }
          : {}),
        ...(user.experience !== updatedExp ? { experience: updatedExp } : {}),
        currentDailyQuests,
      })
    );
  }, [user, updatedExp]);

  if (isLoading) return <LoadingIndicator />;

  return (
    <div className="bodywrapper">
      {!user || (!user.name && !isLoading) ? (
        <LogoPage
          user={user}
          isLoading={isLoading}
          setRefreshKey={setRefreshKey}
        />
      ) : (
        <>
          <header>Mage Trainer</header>
          <div className="menuWrapper">
            <button className="menuBtn" onClick={() => setView("dailies")}>
              Quests
            </button>
            <button className="menuBtn" onClick={() => setView("Maps")}>
              Maps
            </button>
            <button className="menuBtn" onClick={() => setView("market")}>
              Market
            </button>
            <button className="menuBtn" onClick={() => setView("inventory")}>
              Inventory
            </button>
            <button className="menuBtn" onClick={() => setView("archives")}>
              Archives
            </button>
          </div>
          <div>
            {view === "itemInventory" && !!user && (
              <ItemInventory user={user} />
            )}
            {view === "archives" && !!user && <Archives user={user} />}
            {view === "Spells" && !!user && <Spells user={user} />}
            {view === "market" && !!user && <Market user={user} />}
            {view === "inventory" && !!user && <Inventory user={user} />}
            {view === "Maps" && !!user && (
              <Maps
                user={user}
              />
            )}
            {view === "dailies" && !!user && (
              <Dailies
                user={user}
                newDailyQuestsCompletedCount={newDailyQuestsCompletedCount}
                setNewDailyQuestsCompletedCount={
                  setNewDailyQuestsCompletedCount
                }
                newAbandonedDailyQuestCount={newAbandonedDailyQuestCount}
                setNewAbandonedDailyQuestCount={setNewAbandonedDailyQuestCount}
                setCurrentDailyQuests={setCurrentDailyQuests}
                currentDailyQuests={user.currentDailyQuests}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
