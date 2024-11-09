import { useEffect, useState } from "react";
import "./style.css";
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
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [newDailyQuestsCompletedCount, setNewDailyQuestsCompletedCount] = useState();
  const [newQuestCompletedCount, setNewQuestCompletedCount] = useState();
  const [refreshKey, setRefreshKey] = useState(0);

  const viewChange = (newView) => {
    setView(newView);
    console.log("viewchange");
  };

  useEffect(() => {
    if (!user) return;
    
    setNewDailyQuestsCompletedCount(user.dailyQuestsCompleted);
    setNewQuestCompletedCount(user.questCompleted);
  }, [user]);


  //-- TODO:
  //  - [x] check if a user object exists within local storage
  //  - [x] if a user does _not_ exist, create a new one and store it
  //  - [x] if a user _does_ exist, use the object that is returned for our current user
  //  - [x] pass new user object into relevent components

  //  - [ ] prompt for user to select their own name
  //  - [ ] stores quest and abandon counts locally?
  //  - [ ] change empty quest board to appropriate message, if quests have been completed or not
  //  - [ ] timer for completing daily quests
  //  - [ ]

  useEffect(() => {
    const userExists = localStorage.getItem("user");

    if (!userExists) {
      const newUserObject = {
        id: crypto.randomUUID(),
        name: "",
        level: 0,
        questCompleted: 0,
        abandonedQuests: 0,
        dailyQuestsCompleted: 0,
        abandonedDailyQuests: 0,
      };

      localStorage.setItem("user", JSON.stringify(newUserObject));

      setUser(localStorage.getItem("user"));

      return;
    }

    setUser(JSON.parse(localStorage.getItem("user")));

    return;
  }, [refreshKey]);

  /*
    if (myVar && (myVar2.type === "shoot" || myVar2.type === "shoot location")) {
      ...
    }
  */

  useEffect(() => {
    if (!user) return;

    //-- const user = localStorage.getItem("user");
    //-- user.dailyQuestsCompleted = newDailyQuestsCompletedCount
    //-- user.questsCompleted = newQuestsCompletedCount
    //-- localStorage.setItem("user", user);

    /*
     prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        dailyQuestsCompleted: newDailyQuestsCompletedCount,
        questsCompleted: newQuestsCompletedCount,
      }
     })
    */

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
            : {}
          ),
      })
    );
  }, [newDailyQuestsCompletedCount] [newQuestCompletedCount]);


  function handleOnChange(value) {
    setNewName(value);
  }

  const handleSubmit = (value) => {
    localStorage.setItem("user", JSON.stringify({ ...user, name: newName }));

    setRefreshKey((prev) => prev + 1);

    console.log("User information updated!");
  };

  return (
    <div className="bodywrapper">
      <header>battle-cat-quests</header>
      <form
        className="nameInput"
        onSubmit={(e) => {
          //-- prevent default behavior of the event. in this case, stop the form submission
          //-- from refreshing the page.
          e.preventDefault();

          handleSubmit(newName);
        }}
      >
        <input
          value={newName}
          type="text"
          onChange={(event) => handleOnChange(event.target.value)}
          id="nameInputBar"
        />
        <button className="nameInput">submit</button>
      </form>
      <div className="userBtn">
        <button className="menuBtn" onClick={() => viewChange("quests")}>
          Quests
        </button>
        <button className="menuBtn" onClick={() => viewChange("user")}>
          User Profile
        </button>
      </div>
      <div>
        {view === "user" && !!user && <UserProfile user={user} />}
        {view === "quests" && !!user && (
          <Quests
            user={user}
            newDailyQuestsCompletedCount={newDailyQuestsCompletedCount}
            setNewDailyQuestsCompletedCount={setNewDailyQuestsCompletedCount}
            newQuestCompletedCount={newQuestCompletedCount}
            setNewQuestCompletedCount={setNewQuestCompletedCount}
            // newAbandonedQuestCount={newAbandonedQuestCount}
            // setNewAbandonedQuestCount={setNewAbandonedQuestCount}
          />
        )}
      </div>
    </div>
  );
}

