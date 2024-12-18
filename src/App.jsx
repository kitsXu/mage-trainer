import { useEffect, useState } from "react";
import "./style.css";
import UserProfile from "./components/UserProfile.jsx";
import Quests from "./components/Quests.jsx";
import LandingPage from "./components/LandingPage.jsx";
import BroodRecord from "./components/BroodRecord.jsx";
import { chkLevelUp } from "./funcs/chkLevelUp.js";
import Dailies from "./components/Dailies.jsx";
import Market from "./components/Market.jsx";

//-- TODO:
//  - [x] check if a user object exists within local storage
//  - [x] if a user does _not_ exist, create a new one and store it
//  - [x] if a user _does_ exist, use the object that is returned for our current unpmser
//  - [x] pass new user object into relevent components
//  - [x] prompt for user to select their own name
//  - [x] stores quest and abandon counts locally?

//  - [x] daily quests completed counted by 'clear completed', still xp per daily
//  - [x] 'clear completed' cannot be pressed unless all daily quests are checked?
//  - [x] change empty quest board to appropriate message, if quests have been completed or not
//  - [x] storing the daily tasks created by user
//  - [x] set experience up to work
//  - [X] make quests worth more!

// --FIX BEFORE STARTING ON EGGS --
//  - [X] BUG!  Quests reappear whenever you press abandon and refresh
// -- [X] set 'view' to local storage, when user refreshes so we return the page they were on
//  - [ ] check that dailies are stored locally, have to refresh for update rn
//  - [ ] store user made quests locally
//  - [ ] check quests entered against local storage 'quests', if they are there you can't accept
//  - [ ] make a maximum of daily quests??

//  - [ ] create time stamp for daily quest turn in button stored locally? idk
//  - [ ] daily quest turn in button timer can't be pressed again for 24hrs?

export default function App() {
  const [view, setView] = useState(
    localStorage.getItem("view")
  );
  const [user, setUser] = useState(null);
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


  //-- user "auth". check if user exists in local storage. if it does, load it. if it doesn't, create one.
  useEffect(() => {
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
      };

      localStorage.setItem("user", JSON.stringify(newUserObject));
      setUser(newUserObject);

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
    setView(savedView ?? "quests");
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
    console.log(`\nuseEffect -- [newQuestCompletedCount] triggered!`);
    console.log(
      "useEffect -- newQuestCompletedCount: ",
      newQuestCompletedCount
    );

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

  // //-- submit name form on landing page.
  // const handleSubmit = () => {
  //   if (!user) return; //-- TODO: handle this better.
  //   localStorage.setItem("user", JSON.stringify({ ...user, name: newName }));
  //   setView("user");
  //   setRefreshKey((prev) => prev + 1);
  //   console.log("User information updated!");
  // };

  // const handleOnChange = (value) => {
  //   setNewName(value);
  // };

  // useEffect(() => {
  //   view === "LandingPage"
  //     ? setNameFormVisibility(true)
  //     : setNameFormVisibility(false);
  // }, [view]);

  useEffect(() => {
    localStorage.setItem("view", view);
  }, [view]);

  return (
    <div className="bodywrapper">
       {!user ? <LandingPage user={user} /> : <>
      <header>brood leader</header>
        <div className="userBtn">
          <button className="menuBtn" onClick={() => setView("dailies")}>
            Daiy Routine
          </button>
          <button className="menuBtn" onClick={() => setView("quests")}>
            Quests
          </button>
          <button className="menuBtn" onClick={() => setView("user")}>
            Records
          </button>
          <button className="menuBtn" onClick={() => setView("brood")}>
            Brood
          </button>
          <button className="menuBtn" onClick={() => setView("market")}>
            The Market
          </button>
        </div>
        {!user.name ? <LandingPage user={user} /> : <></>}
      <div>
        {view === "user" && !!user && <UserProfile user={user} />}
        {view === "market" && !!user && <Market user={user} />}
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
            setNewDailyQuestsCompletedCount={setNewDailyQuestsCompletedCount}
            newAbandonedDailyQuestCount={newAbandonedDailyQuestCount}
            setNewAbandonedDailyQuestCount={setNewAbandonedDailyQuestCount}
            setCurrentDailyQuests={setCurrentDailyQuests}
            currentDailyQuests={user.currentDailyQuests}
            setRefreshKey={setRefreshKey}
          />
        )}
        {view === "brood" && !!user && <BroodRecord user={user} />}
      </div>
      
        {/* <form
          className="nameInput"
          onSubmit={(e) => {
            //-- prevent default behavior of the event. in this case, stop the form submission
            //-- from refreshing the page.
            e.preventDefault();

            handleSubmit(newName);
          }}
        >
          <label htmlFor="nameInputBar">NAME</label>
          <input
            value={newName}
            type="text"
            onChange={(event) => handleOnChange(event.target.value)}
            id="nameInputBar"
          />
          <button className="nameInput">submit</button>
        </form> */}
    </>}</div>
  );
  }
