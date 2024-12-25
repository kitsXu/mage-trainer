import { useEffect, useState } from "react";
import "./style.css";
import Archives from "./components/Archives/Archives.jsx"
import Quests from "./components/Quests/Quests.jsx";
import BroodRecord from "./components/Brood/BroodRecord.jsx";
import { chkLevelUp } from "./funcs/chkLevelUp.js";
import Dailies from "./components/Dailies/Dailies.jsx";
import Market from "./components/Market/Market.jsx";
import Inventory from "./components/Inventory/Inventory.jsx";
import { LoadingIndicator } from "./components/LandingPage/LoadingIndicator.jsx";
import Logo from "./components/LandingPage/Logo.jsx";

//-- TODO:
//  - [X] BUG!  Quests reappear whenever you press abandon and refresh
// -- [X] set 'view' to local storage, when user refreshes so we return the page they were on
//  - [ ] check that dailies are stored correctly, have to refresh for update rn
//  - [ ] store user made quests locally
//  - [ ] check quests entered against local storage 'quests', if they are there you can't accept
//  - [ ] make a maximum of daily quests??

//  - [ ] create time stamp for daily quest turn in button stored locally? idk
//  - [ ] daily quest turn in button timer can't be pressed again for 24hrs?

export default function App() {
  const [view, setView] = useState(localStorage.getItem("view") ?? "archives");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [newDailyQuestsCompletedCount, setNewDailyQuestsCompletedCount] =
    useState();
  const [newQuestCompletedCount, setNewQuestCompletedCount] = useState();
  const [newAbandonedQuestCount, setNewAbandonedQuestCount] = useState();
  const [newAbandonedDailyQuestCount, setNewAbandonedDailyQuestCount] =
    useState();
  const [currentDailyQuests, setCurrentDailyQuests] = useState([]);

  useEffect(() => {
    if (typeof user !== "object") {
      setUser(JSON.parse(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("view", view ?? "archives");
  }, [view]);

  //-- user "auth". check if user exists in local storage. if it does, load it. if it doesn't, create one.
  useEffect(() => {
    setIsLoading(true);

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

      localStorage.setItem("user", JSON.stringify(newUserObject));
      setUser(newUserObject);

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
  }, [refreshKey]);

  useEffect(() => {
    if (!user || !user.experience) return;

    chkLevelUp(user);
  }, [user]);


  //-- create new updated user object to update both local storage user record and local user object state.
  useEffect(() => {
    if (!user) return;
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
  }, [newDailyQuestsCompletedCount, newQuestCompletedCount]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user, //-- spread over our existing user object so we retain any unchanged values...

        //-- ...conditionally update values if they've changed.
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
        //-- i.e., currentDailyQuests: currentDailyQuests,
        currentDailyQuests,
      })
    );
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

      {!user || !user.name && !isLoading ? (
        <Logo user={user} isLoading={isLoading} setRefreshKey={setRefreshKey} />
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
            <button className="menuBtn" onClick={() => setView("brood")}>
              Brood
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
            {view === "brood" && !!user && <BroodRecord user={user} />}
          </div>
        </>
      )}
    </div>
  );
}
