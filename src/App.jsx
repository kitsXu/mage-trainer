import { useEffect, useState } from "react";
import "./style.css";
import UserProfile from "./components/UserProfile.jsx";
import Quests from "./components/Quests.jsx";
import LandingPage from "./components/LandingPage.jsx";
import BroodRecord from "./components/BroodRecord.jsx";
import { chkLevelUp } from "./funcs/chkLevelUp.js";
import Dailies from "./components/Dailies.jsx";

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
//  - [X] BUG!  Quests reappear whenever you press abandon and refresh
//  - [ ] levels update to local storage?  Right now you have to refresh to get your level updated
//  - [ ] can only enter quests ONCE in quest area
//  - [ ] make quests worth more!
//  - [ ] make a maximum of daily quests??

export default function App() {
  const [view, setView] = useState("dailies");
  const [user, setUser] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [newName, setNewName] = useState("");
  const [nameFormVisibility, setNameFormVisibility] = useState(false);
  const [newDailyQuestsCompletedCount, setNewDailyQuestsCompletedCount] =
    useState();
  const [newQuestCompletedCount, setNewQuestCompletedCount] = useState();
  const [newAbandonedQuestCount, setNewAbandonedQuestCount] = useState();
  const [newAbandonedDailyQuestCount, setNewAbandonedDailyQuestCount] =
    useState();
  const [currentDailyQuests, setCurrentDailyQuests] = useState([]);
  // const [nextLevelExperience, setNextLevelExperience] = useState();

  useEffect(() => {
    console.log("useEffect -- refreshKey: ", refreshKey);
  }, [refreshKey]);

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
      localStorage.setItem('view', view); //set view to local storage
 

      setUser(newUserObject);
      setView("LandingPage");

      return;
    }

    setUser(JSON.parse(userExists));

    const user = JSON.parse(userExists);

    setNewDailyQuestsCompletedCount(user.dailyQuestsCompleted);
    setNewQuestCompletedCount(user.questCompleted);
    setNewAbandonedQuestCount(user.abandonedQuests);
    setNewAbandonedDailyQuestCount(user.abandonedQuests);
    setCurrentDailyQuests(user.currentDailyQuests);
  }, [refreshKey]);

  useEffect(() => {
    console.log(
      "useEffect -- newQuestCompletedCount: ",
      newQuestCompletedCount
    );
  }, [newQuestCompletedCount]);

  // //-- if user exists, attach questing states for updating local storage to user object values
  // useEffect(() => {
  //   if (!user) return;

  //   console.log(`\nuseEffect -- [user] (all state setter functions) triggered!`)
  //   console.log("useEffect -- newQuestCompletedCount: ", newQuestCompletedCount)

  //   setNewDailyQuestsCompletedCount(user.dailyQuestsCompleted);
  //   setNewQuestCompletedCount(user.questCompleted);
  //   setNewAbandonedQuestCount(user.abandonedQuests);
  //   setNewAbandonedDailyQuestCount(user.abandonedQuests);
  //   setCurrentDailyQuests(user.currentDailyQuests);

  //   //-- TODO: hook up experience and level to local state so we can update front-end.
  // }, [user]);

  useEffect(() => {
    if (!user || !user.experience) return;

    chkLevelUp(user);
  }, [user]);

    // Save the view to localStorage whenever it changes
    useEffect(() => {
      localStorage.setItem('view', view);
    }, [view]);

  //-- create new updated user object to update both local storage user record and local user object state.
  useEffect(() => {
    if (!user) return;

    const updatedUser = {
      ...user,
      level:
        user.experience > user.nextLevelExperience
          ? user.level + 1
          : user.level,

      experience: (user.questCompleted * 4) + user.dailyQuestsCompleted,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setUser(updatedUser);
  }, [
    newDailyQuestsCompletedCount,
    newQuestCompletedCount,
    newAbandonedQuestCount,
    newAbandonedDailyQuestCount,
  ]);

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
      })
    );
  }, [
    newDailyQuestsCompletedCount,
    newQuestCompletedCount,
    newAbandonedQuestCount,
    newAbandonedDailyQuestCount,
  ]);

  //-- submit name form on landing page.
  const handleSubmit = () => {
    if (!user) return; //-- TODO: handle this better.
    localStorage.setItem("user", JSON.stringify({ ...user, name: newName }));
    setView("user");
    setRefreshKey((prev) => prev + 1);
    console.log("User information updated!");
  };

  const handleOnChange = (value) => {
    setNewName(value);
  };

  useEffect(() => {
    view === "LandingPage"
      ? setNameFormVisibility(true)
      : setNameFormVisibility(false);
  }, [view]);

  //-- set view to landing page if user name hasn't been set.
  useEffect(() => {
    if (!user) return;
    if (!user.name) {
      setView("LandingPage");
      return;
    }
    setView("dailies");
  }, []);



  useEffect(() => {
    const savedView = localStorage.getItem('view');
    if (user) {
      setView(savedView);  // Set the state to the saved view
    }
  }, [user]);



  return (
    <div className="bodywrapper">
      <header>brood leader</header>
      {view !== "LandingPage" && (
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
        </div>
      )}
      <div>
        {view === "LandingPage" && !!user && <LandingPage user={user} />}
        {view === "user" && !!user && <UserProfile user={user} />}
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
            currentDailyQuests={user.currentDailyQuests}
            setRefreshKey={setRefreshKey}
          />
        )}
        {view === "brood" && !!user && <BroodRecord user={user} />}
      </div>
      {nameFormVisibility && (
        <form
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
        </form>
      )}
    </div>
  );
}
