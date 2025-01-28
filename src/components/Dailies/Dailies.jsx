import { useState, useEffect } from "react";
import "./Dailies.css";

//-- TO DO --
// - [X] make the explanation div appear on hover of a little box/question mark icon
// - [ ] make a maximum of daily quests??
// - [ ] create time stamp for daily quest turn in button stored locally? idk
// - [ ] daily quest turn in button timer can't be pressed again for 24hrs?

export default function Dailies(props) {
  const [newDaily, setNewDaily] = useState("");
  const [dailies, setDailies] = useState(props.currentDailyQuests ?? []);
  const [visibility, setVisibility] = useState(false);
  const [formError, setFormError] = useState("");

  //--enter daily quest into the form and create daily quest object.
  function handleDailySubmit(e) {
    e.preventDefault();
    if (newDaily.trim() === "") {
      setFormError("Please enter a quest to submit!");
    } else {
      setFormError("");
      setDailies((currentDailies) => {
        return [
          ...currentDailies,
          { id: crypto.randomUUID(), title: newDaily, completed: false },
        ];
      });
      setNewDaily("");
    }
  }

  //--set current state of dailies to local storage.
  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...props.user, currentDailyQuests: dailies })
    );

    props.setCurrentDailyQuests(dailies);
  }, [dailies]);

  //--check and uncheck daily quests
  function toggleDaily(id, completed) {
    setDailies((prev) =>
      prev.map((d) => (d.id === id ? { ...d, completed: completed } : d))
    );
  }

  //--remove daily quest from form
  function deleteDaily(id) {
    setDailies((currentDailies) => {
      return currentDailies.filter((daily) => daily.id !== id);
    });
    props.setNewAbandonedDailyQuestCount((prev) => prev + 1);

    return;
  }

  //--clears all checkmarks from daily quests, counts completed quests and updates count in local storage
  function turnInDailyQuests(id, completed) {
    const completedDailies = dailies.filter((d) => d.completed);

    props.setNewDailyQuestsCompletedCount(
      (props.user.dailyQuestsCompleted += completedDailies.length)
    );

    const resetDailies = dailies.map((d) =>
      d.id === id ? { ...d, completed: completed } : { ...d, completed: false }
    );

    setDailies(resetDailies);
  }

  //--change visibility of an element
  function showHide() {
    if (visibility === false) setVisibility(true);
    else setVisibility(false);
  }

  return (
    <div className="bodyWrapper">
      <div className="headDivider">
        §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
      </div>
      <div className="questHeaderWrap">
        <h1 className="dailyHeader">{props.user.name}'s Dailies</h1>
        <button className="questExplanation" onClick={showHide}>
          ?
        </button>
      </div>
      {visibility && (
        <p className="daily-info">
          Think of your daily quests as the things that make up your everyday
          routine- the day to day chores you need to remember to do so you can
          turn them into healthy habits! Add your "quests" into the input, check
          tasks off your list as you complete them, and then press 'Submit Your
          Daily Quests' at the end of the day to gain your experience (Quest
          turn in button an ONLY be used 1x per day, each Daily Quest is worth
          1px)
        </p>
      )}
      <form onSubmit={handleDailySubmit} className="new-daily-form">
        <div className="daily-form-row">
          <input
            value={newDaily}
            onChange={(e) => setNewDaily(e.target.value)}
            type="text"
            id="daily"
          ></input>
        </div>
        <button className="btn dailyBtn">Add to Daily Quest List</button>
      </form>
      {formError && <p className="formError">{formError}</p>}
      <ul className="dailyList">
        {dailies.length === 0 && "No set routine, add some quests!"}
        {dailies.map((daily) => {
          return (
            <li key={daily.id}>
              <label>
                <input
                  type="checkbox"
                  checked={daily.completed}
                  onChange={(e) => toggleDaily(daily.id, e.target.checked)}
                />
                {daily.title}
              </label>
            </li>
          );
        })}
      </ul>
      <button onClick={turnInDailyQuests} className="foot" id="clearBtn">
        Submit Your Daily Quests!
      </button>
      <button
        onClick={() => {
          deleteDaily(daily.id);
        }}
        className="btn btn-danger"
      >
        Abandon Selected Quests
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
