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
      setFormError("Please type Quest inside input bar to add to list!");
    } else {
      setFormError("");
      setDailies((currentDailies) => {
        return [
          ...currentDailies,
          {
            id: crypto.randomUUID(),
            title: newDaily,
            completed: false,
            timestamp: new Date().toISOString(),
          },
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

  //--deletes toggled daily quests and increments abandoned quest counter.
  function deleteDailies() {
    const deleteDailies = dailies.filter((d) => d.completed);

    props.setNewAbandonedDailyQuestCount(
      (props.user.abandonedDailyQuests += deleteDailies.length)
    );

    setDailies((currentDailies) => {
      return currentDailies.filter((d) => d.completed === false);
    });
  }

  //--clears all checkmarks from daily quests, counts completed quests and updates count in local storage
  function turnInDailyQuests(id, completed) {
    const questsTenMinutesLater =
      new Date(dailies.timestamp).getTime() + 10 * 60 * 1000;
    const questsCurrentTime = Date.now();

    if (questsCurrentTime >= questsTenMinutesLater) {
      const completedDailies = dailies.filter((d) => d.completed);

      props.setNewDailyQuestsCompletedCount(
        (props.user.dailyQuestsCompleted += completedDailies.length)
      );

      const resetDailies = dailies.map((d) =>
        d.id === id
          ? { ...d, completed: completed }
          : { ...d, completed: false }
      );

      setDailies(resetDailies);
    } else {
      alert("Not enough time has passed!");
    }
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
        <h1 className="dailyHeader">{props.user.name}'s Quests</h1>
        <button className="questExplanation" onClick={showHide}>
          ?
        </button>
      </div>
      {visibility && (
        <p className="daily-info">
          Think of your quests as the things that make up your everyday routine-
          the day to day chores you need to remember to do so you can turn them
          into healthy habits! Add your "quests" into the input, check tasks off
          your list as you complete them, and then press 'Submit Quests' to turn
          in quest! Quests are each worth 1xp and can be turned in 10
          mintues after you've added them.
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
        <button className="btn dailyBtn">Add Quest</button>
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
        Submit Quests!
      </button>
      <button onClick={deleteDailies} className="btn btn-danger">
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
