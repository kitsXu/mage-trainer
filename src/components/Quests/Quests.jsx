import { useState, useEffect } from "react";
import "./Quests.css";

//-- TO DO --
// -- []  fix... if one quest is "ready to submit" all will go through..
// -- []  fix... Abandon Quest "quest not selected" alert



export default function Quests(props) {
  const [newQuest, setNewQuest] = useState("");
  const [quests, setQuests] = useState(props.currentDailyQuests ?? []);
  const [visibility, setVisibility] = useState(false);
  const [formError, setFormError] = useState("");

  //--Enter quest quest into the form and create quest object.
  function handleDailySubmit(e) {
    e.preventDefault();
    if (newQuest.trim() === "") {
      setFormError("Please type Quest inside the input bar!");
    } else {
      setFormError("");
      setQuests((currentQuests) => {
        return [
          ...currentQuests,
          {
            id: crypto.randomUUID(),
            title: newQuest,
            completed: false,
            timestamp: new Date().toISOString(),
          },
        ];
      });
      setNewQuest("");
    }
  }

  //--Set current state of quests to local storage.
  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...props.user, currentDailyQuests: quests })
    );

    props.setCurrentDailyQuests(quests);
  }, [quests]);

  //--Add and remove checkmark from quests.
  function toggleQuest(id, completed) {
    setQuests((prev) =>
      prev.map((d) => (d.id === id ? { ...d, completed: completed } : d))
    );
  }

  //--Deletes toggled quests and increments abandoned quest counter.
  function deleteQuests() {
    const quest = quests.find((d) => d.id === d.id);

    // if (!quest.completed === true) {
    //   alert("No quests selected!");
    // } else {
      const deleteQuests = quests.filter((d) => d.completed);
      props.setNewAbandonedDailyQuestCount(
        (props.user.abandonedDailyQuests += deleteQuests.length)
      );

      setQuests((currentQuests) => {
        return currentQuests.filter((d) => d.completed === false);
      });
    
  }

  //-- Clears all checkmarks from quests,
  //-- Counts completed quests and updates count in local storage,
  //-- Stops user from turning in before 10 minute time limit is up.
  function turnInQuests() {
    const quest = quests.find((d) => d.id === d.id);

    if (!quest || !quest.timestamp) {
      alert("No quests in log!");
    } else {
      if (!quest || !quest.completed === true) {
        alert("No quests selected!");
      } else {
        const tenMinutes = 10 * 60 * 1000;
        const questTurnInTime =
          new Date(quest.timestamp).getTime() + tenMinutes;
        const currentTime = Date.now();
        const isReadyToSubmit = currentTime >= questTurnInTime;
        if (quest.completed === isReadyToSubmit) {
          const completedDailies = quests.filter((d) => d.completed);

          props.setNewDailyQuestsCompletedCount(
            (props.user.dailyQuestsCompleted += completedDailies.length)
          );

          alert("Quests completed: ..." + completedDailies.length);

          setQuests((currentQuests) => {
            return currentQuests.filter((d) => d.completed === false);
          });
        } else {
          alert("Not enough time has passed!");
        }
      }
    }
  }

  //--Change visibility of an element.
  function showHide() {
    if (visibility === false) setVisibility(true);
    else setVisibility(false);
  }

  return (
    <div className="bodyWrapper">
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>{" "}
      <div className="questHeaderWrap">
        <h1 className="dailyHeader">{props.user.name}'s Quests</h1>
        {/* Show/hide the Quest Explanation */}
        <button className="questExplanation" onClick={showHide}>
          ?
        </button>
      </div>
      {visibility && (
        <p className="quest-info">
          Think of your quests as the things that make up your everyday routine-
          the day to day chores you need to remember to do so you can turn them
          into healthy habits! Add your "quests" into the input, check tasks off
          your list as you complete them, and then press 'Submit Quests' to turn
          them in! Quests are each worth 1xp and cannot be turned in for a
          minimum of 10 minutes
        </p>
      )}
      {/* Form/input for quests*/}
      <form onSubmit={handleDailySubmit} className="new-quest-form">
        <div className="quest-form-row">
          <input
            value={newQuest}
            onChange={(e) => setNewQuest(e.target.value)}
            type="text"
            id="quest"
          ></input>
        </div>
        {/* ADD QUEST */}
        <button className="btn dailyBtn">Add Quest</button>
      </form>
      {/*IF nothing is in the input, return form error alert */}
      {formError && <p className="formError">{formError}</p>}
      <ul className="dailyList">
        {/*If there are no quests, display following string*/}
        {quests.length === 0 && "Quest List Empty!"}
        {/*render stored quests*/}
        {quests.map((quest) => {
          return (
            <li key={quest.id}>
              <label>
                <input
                  type="checkbox"
                  checked={quest.completed}
                  onChange={(e) => toggleQuest(quest.id, e.target.checked)}
                />
                {quest.title}
              </label>
            </li>
          );
        })}
      </ul>
      {/* TURN IN QUEST */}
      <button onClick={turnInQuests} className="foot" id="submitBtn">
        Submit Quests!
      </button>
      {/* DELETE QUEST */}
      <button onClick={deleteQuests} className="btn btn-danger">
        Abandon Quests
      </button>
      <div className="divider">_________</div>
      <div className="logo">
        <a className="logo-tag" href="https://ko-fi.com/kitsxu">
          -kitsXu-
        </a>
      </div>
    </div>
  );
}
