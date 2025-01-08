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
//  - [ ] BUG- check level function not firing when you actually hit the level...

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
  const [currentQuests, setCurrentQuests] = useState([]);

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
        questCompleted: 0,
        abandonedQuests: 0,
        dailyQuestsCompleted: 0,
        abandonedDailyQuests: 0,
        currentDailyQuests: [],
        currentQuests: [],
        gold: 0,
        goldIncrease: 50,
      };

      localStorage.setItem("user", JSON.stringify(newUserObject));

      setUser(newUserObject);

      setIsLoading(false);

      return;
    }

    setUser(JSON.parse(userExists));

    const savedView = localStorage.getItem("view");

    // const user = localStorage.getItem("user");
    // setNewDailyQuestsCompletedCount(user.dailyQuestsCompleted);
    // setNewQuestCompletedCount(user.questCompleted);
    // setNewAbandonedQuestCount(user.abandonedQuests);
    // setNewAbandonedDailyQuestCount(user.abandonedDailyQuests);
    // setCurrentDailyQuests(user.currentDailyQuests);
    // setCurrentQuests(user.currentQuests);

    setView(savedView ?? "archives");

    setIsLoading(false);
  }, [refreshKey, view]);

  //-- spread over user object and conditionally update values... set state variables to user object values.
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
        ...(user.questCompleted !== newQuestCompletedCount
          ? { questCompleted: newQuestCompletedCount
          }
          : {}),
        ...(user.abandonedQuests !== newAbandonedQuestCount
          ? { abandonedQuests: newAbandonedQuestCount }
          : {}),
        ...(user.abandonedDailyQuests !== newAbandonedDailyQuestCount
          ? { abandonedDailyQuests: newAbandonedDailyQuestCount }
          : {}),
        ...(user.experience !== updatedExp ? { experience: updatedExp } : {}),
        currentDailyQuests,
        currentQuests
      })
    );
    setNewDailyQuestsCompletedCount(user.dailyQuestsCompleted);
    setNewQuestCompletedCount(user.questCompleted);
    setNewAbandonedQuestCount(user.abandonedQuests);
    setNewAbandonedDailyQuestCount(user.abandonedDailyQuests);
    setCurrentDailyQuests(user.currentDailyQuests);
    setCurrentQuests(user.currentQuests);

    setUpdatedExp(user.questCompleted * 4 + user.dailyQuestsCompleted);
    chkLevelUp(user);
  }, [
    newDailyQuestsCompletedCount,
    newQuestCompletedCount,
    newAbandonedQuestCount,
    newAbandonedDailyQuestCount,
    updatedExp,
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
                currentQuests={currentQuests}
                setCurrentQuests={setCurrentQuests}
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
