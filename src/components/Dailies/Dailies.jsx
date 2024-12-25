import { useState, useEffect } from "react";
import "./Dailies.css";

//-- TO DO --
// - [ ] make the explanation div appear on hover of a little box/question mark icon

export default function Dailies(props) {
  const [newDaily, setNewDaily] = useState("");
  const [dailies, setDailies] = useState(props.currentDailyQuests ?? []);

  useEffect(() => {
    // localStorage.setItem(
    //   "user",
    //   JSON.stringify({ ...props.user, currentDailyQuests: dailies })
    // );

    props.setCurrentDailyQuests(dailies);
  }, [dailies]);

  function handleDailySubmit(e) {
    e.preventDefault();

    setDailies((currentDailies) => {
      return [
        ...currentDailies,
        { id: crypto.randomUUID(), title: newDaily, completed: false },
      ];
    });
    setNewDaily("");
  }

  const toggleDaily = (id, completed) => {
    setDailies((prev) =>
      prev.map((d) => (d.id === id ? { ...d, completed: completed } : d))
    );
  };

  function deleteDaily(id) {
    setDailies((currentDailies) => {
      return currentDailies.filter((daily) => daily.id !== id);
    });
    // localStorage.removeItem(
    //   "user",
    //   JSON.stringify({
    //     ...props.user,
    //     dailyQuestsCompleted,
    //   })
    // );
    props.setNewAbandonedDailyQuestCount((prev) => prev + 1);

    return;
  }

  const resetAllDailies = (id, completed) => {
    const completedDailies = dailies.filter((d) => d.completed);
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...props.user,
        dailyQuestsCompleted: (props.user.dailyQuestsCompleted +=
          completedDailies.length),
      })
    );
    const resetDailies = dailies.map((d) =>
      d.id === id ? { ...d, completed: completed } : { ...d, completed: false }
    );
    setDailies(resetDailies);
  };

  return (
    <div className="bodyWrapper">
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>
      <h1 className="dailyHeader">{props.user.name}'s Daily Routine</h1>
      <p className="daily-info">
        &#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;Create
        your daily routine by adding tasks into the log below. Check tasks off
        your list as you complete them, and then hit the 'COMPLETE YOUR DAILY
        ROUTINE' button at the end of the day to turn in and gain your
        experience (1xp per task)
      </p>
      <form onSubmit={handleDailySubmit} className="new-daily-form">
        <div className="daily-form-row">
          <input
            value={newDaily}
            onChange={(e) => setNewDaily(e.target.value)}
            type="text"
            id="daily"
          ></input>
        </div>
        <button className="btn dailyBtn">ACCEPT</button>
      </form>
      {/* <div id="completeDaily">
        Completed Daily- {props.user.dailyQuestsCompleted}
        {""}
      </div> */}
      <ul className="dailyList">
        {dailies.length === 0 && "No set routine, add some quests!"}
        {dailies.map((daily) => {
          console.log("daily id: ", daily.id);
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

              <button
                onClick={() => {
                  deleteDaily(daily.id);
                  // props.user.abandonedDailyQuests++;
                }}
                className="btn btn-danger"
              >
                Abandon
              </button>
            </li>
          );
        })}
      </ul>
      <button onClick={resetAllDailies} className="foot" id="clearBtn">
        COMPLETE YOUR DAILY QUESTS!
      </button>
      <div className="divider">_________</div>
      <div className="logo">
        <a className="logo-tag" href="https://ko-fi.com/kitsxu">-kitsXu-</a>
      </div>
    </div>
  );
}
