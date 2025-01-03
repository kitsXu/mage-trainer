import { useEffect, useState } from "react";
import { LoadingIndicator } from "./components/LandingPage/LoadingIndicator.jsx";
import { chkLevelUp } from "./funcs/chkLevelUp.js";

import "./style.css";

import Archives from "./components/Archives/Archives.jsx";
import Quests from "./components/Quests/Quests.jsx";
import BroodRecord from "./components/Inventory/BroodRecord.jsx";
import Dailies from "./components/Dailies/Dailies.jsx";
import Market from "./components/Market/Market.jsx";
import Inventory from "./components/Inventory/Inventory.jsx";
import LogoPage from "./components/LandingPage/LogoPage.jsx";

//-- TODO:
//  - [ ] BUG- when you hit next lvl, it keeps alerting and doesn't save to storage correctly

export default function App() {
  const [view, setView] = useState(localStorage.getItem("view") ?? "archives");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [newQuestCompletedCount, setNewQuestCompletedCount] = useState();
  const [newAbandonedQuestCount, setNewAbandonedQuestCount] = useState();

  const [newDailyQuestsCompletedCount, setNewDailyQuestsCompletedCount] =
    useState();
  const [newAbandonedDailyQuestCount, setNewAbandonedDailyQuestCount] =
    useState();
  const [currentDailyQuests, setCurrentDailyQuests] = useState([]);

  const [brood, setBrood] = useState();
  const [inventory, setInventory] = useState();

  //-- user "auth". check if user exists in local storage, set if not (and inventory/brood/default view state).
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
        questCompleted: 0,
        abandonedQuests: 0,
        dailyQuestsCompleted: 0,
        abandonedDailyQuests: 0,
        currentDailyQuests: [],
        gold: 0,
        goldIncrease: 50,
        nxtLvl: 1,
      };

      // const newInventoryObject = {
      //   plainEgg: 0,
      //   mountainEgg: 0,
      //   lavaEgg: 0,
      //   acidEgg: 0,
      //   riverEgg: 0,
      // };

      const newBroodObject = {
        commonDragon: 0,
        earthDragon: 0,
        fireDragon: 0,
        blackDragon: 0,
        waterDragon: 0,
      };

      localStorage.setItem("user", JSON.stringify(newUserObject));
      localStorage.setItem("brood", JSON.stringify(newBroodObject));
      localStorage.setItem("inventory", JSON.stringify(newInventoryObject));

      setUser(newUserObject);
      setInventory(newInventoryObject);
      setBrood(newBroodObject);

      setIsLoading(false);

      return;
    }

    setUser(JSON.parse(userExists));

    const user = JSON.parse(userExists);

    setNewDailyQuestsCompletedCount(user.dailyQuestsCompleted);
    setNewQuestCompletedCount(user.questCompleted);
    setNewAbandonedQuestCount(user.abandonedQuests);
    setNewAbandonedDailyQuestCount(user.abandonedDailyQuests);
    setCurrentDailyQuests(user.currentDailyQuests);

    const savedView = localStorage.getItem("view");

    setView(savedView ?? "archives");

    setIsLoading(false);
  }, [refreshKey, view]);

  //-- checks level and if requirements are met, increments level/gold.. parse user if it's not an object, already.
  useEffect(() => {
    if (!user || !user.experience) return;

    if (typeof user !== "object") {
      setUser(JSON.parse(user));
    }

    chkLevelUp(user);
  }, [user]);

  //-- spread over user object and conditionally updates information
  useEffect(() => {
    if (!user) return;

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        ...(user.dailyQuestsCompleted !== newDailyQuestsCompletedCount
          ? { dailyQuestsCompleted: newDailyQuestsCompletedCount }
          : {}),
        ...(user.questCompleted !== newQuestCompletedCount
          ? { questCompleted: newQuestCompletedCount }
          : {}),
        ...(user.abandonedQuests !== newAbandonedQuestCount
          ? { abandonedQuests: newAbandonedQuestCount }
          : {}),
        ...(user.abandonedDailyQuests !== newAbandonedDailyQuestCount
          ? { abandonedDailyQuests: newAbandonedDailyQuestCount }
          : {}),
        currentDailyQuests,
      })
    );

    const updatedUser = {
      ...user,
      level:
        user.experience > user.nextLevelExperience
          ? user.level + 1
          : user.level,
      experience: user.questCompleted * 4 + user.dailyQuestsCompleted,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  }, [
    newDailyQuestsCompletedCount,
    newQuestCompletedCount,
    newAbandonedQuestCount,
    newAbandonedDailyQuestCount,
    currentDailyQuests,
  ]);

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
          <header>brood leader</header>
          <div className="menuWrapper">
            <button className="menuBtn" onClick={() => setView("dailies")}>
              Dailies
            </button>
            <button className="menuBtn" onClick={() => setView("quests")}>
              Quests
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
            {view === "archives" && !!user && <Archives user={user} />}
            {view === "brood" && !!user && <BroodRecord user={user} />}
            {view === "market" && !!user && <Market user={user} />}
            {view === "inventory" && !!user && <Inventory user={user} />}
            {view === "quests" && !!user && (
              <Quests
                user={user}
                newQuestCompletedCount={newQuestCompletedCount}
                setNewQuestCompletedCount={setNewQuestCompletedCount}
                newAbandonedQuestCount={newAbandonedQuestCount}
                setNewAbandonedQuestCount={setNewAbandonedQuestCount}
                setRefreshKey={setRefreshKey}
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
                setRefreshKey={setRefreshKey}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
