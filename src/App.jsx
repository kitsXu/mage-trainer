import { useEffect, useState } from "react";
import "./style.css";
import UserProfile from "./UserProfile.jsx";
import Quests from "./Quests.jsx";
import UserName from "./UserName.jsx";
import BroodRecord from "./BroodRecord.jsx";

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
//  - [ ] 'clear completed' only able to be pressed once every 24 hours?
//  - [ ] set experience up to work
//  - [ ] BUG!  Quests reappear whenever you press abandon and refresh
//  - [ ]

export default function App() {
  const [view, setView] = useState("quests");
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

  const [experience, setExperience] = useState();


  useEffect(() => {
    if (!user) return;

    setNewDailyQuestsCompletedCount(user.dailyQuestsCompleted);
    setNewQuestCompletedCount(user.questCompleted);
    setNewAbandonedQuestCount(user.abandonedQuests);
    setNewAbandonedDailyQuestCount(user.abandonedQuests);
    setCurrentDailyQuests(user.currentDailyQuests);
  }, [user]);



  //-- user "auth". check if user exists in local storage. if it does, load it. if it doesn't, create one.
  useEffect(() => {
    const userExists = localStorage.getItem("user");

    if (!userExists) {
      const newUserObject = {
        id: crypto.randomUUID(),
        name: "",
        level: 0,
        experience: 0,
        questCompleted: 0,
        abandonedQuests: 0,
        dailyQuestsCompleted: 0,
        abandonedDailyQuests: 0,
        currentDailyQuests: [],
      };

      localStorage.setItem("user", JSON.stringify(newUserObject));

      setUser(localStorage.getItem("user"));
      setView("userName");

      return;
    }

    setUser(JSON.parse(localStorage.getItem("user")));

    return;
  }, [refreshKey]);


  //--attempts to figure out adding experience...

  // const setExp = {user.questCompleted + user.dailyQuestsCompleted};

  useEffect(() => {
    if (!user) return;
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        experience: (user.questCompleted + user.dailyQuestsCompleted) - (user.abandonedDailyQuests + user.abandonedQuests)
      })
    )
  }, [user])



  //-- update user object in local storage whenever we change a local value.
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
      })
    );
  }, [
    newDailyQuestsCompletedCount,
    newQuestCompletedCount,
    newAbandonedQuestCount,
    newAbandonedDailyQuestCount,
  ]);

  useEffect(() => {
    if (typeof user !== "object") {
      setUser(JSON.parse(user));
    }
  }, [user]);

  //-- set view to landing page if user name hasn't been set.
  useEffect(() => {
    if (!user) return;
    if (!user.name) {
      setView("userName");
      return;
    }

    setView("quests");
  }, [user]);

  //-- submit for name form on landing page.
  const handleSubmit = () => {
    if (!user) return; //-- TODO: handle this better.
    localStorage.setItem("user", JSON.stringify({ ...user, name: newName }));
    setView("user");
    setRefreshKey((prev) => prev + 1);
    console.log("User information updated!");
  };

  function handleOnChange(value) {
    setNewName(value);
  }

  useEffect(() => {
    if (view === "userName") setNameFormVisibility(true);
  }, [view]);

  return (
    <div className="bodywrapper">
      <header>brood leader</header>
      {view !== "userName" && (
        <div className="userBtn">
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
        {view === "userName" && !!user && <UserName user={user} />}
        {view === "user" && !!user && <UserProfile user={user} />}
        {view === "quests" && !!user && (
          <Quests
            user={user}
            newDailyQuestsCompletedCount={newDailyQuestsCompletedCount}
            setNewDailyQuestsCompletedCount={setNewDailyQuestsCompletedCount}
            newQuestCompletedCount={newQuestCompletedCount}
            setNewQuestCompletedCount={setNewQuestCompletedCount}
            newAbandonedQuestCount={newAbandonedQuestCount}
            setNewAbandonedQuestCount={setNewAbandonedQuestCount}
            newAbandonedDailyQuestCount={newAbandonedDailyQuestCount}
            setNewAbandonedDailyQuestCount={setNewAbandonedDailyQuestCount}
            currentDailyQuests={user.currentDailyQuests}
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
