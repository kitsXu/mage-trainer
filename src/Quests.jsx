import { useState } from "react";

export default function Quests(props) {
  const [newQuest, setNewQuest] = useState("");
  const [newDaily, setNewDaily] = useState("");
  const [tasks, setTasks] = useState([]);
  const [dailies, setDailies] = useState([]);

  console.log("Quests -- props.user: ", props.user);

  //FUNCTIONS FOR ONE TIME QUESTS(TASKS)//
  function handleSubmit(e) {
    e.preventDefault();

    setTasks((currentTasks) => {
      return [
        ...currentTasks,
        { id: crypto.randomUUID(), title: newQuest, completed: false },
      ];
    });

    setNewQuest("");
  }

  function completeTask(id) {
    setTasks((currentTasks) => {
      return currentTasks.filter((task) => task.id !== id);
    });
    return props.setNewQuestCompletedCount((prev) => prev + 1);
  }

  function deleteTask(id) {
    setTasks((currentTasks) => {
      return currentTasks.filter((task) => task.id !== id);
    });
    return props.setNewAbandonedQuestCount((prev) => prev + 1);
  }

  //FUNCTIONS FOR DAILY QUESTS//
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
    completed
      ? props.setNewDailyQuestsCompletedCount((prev) => prev + 1)
      : null;
  };

  function deleteDaily(id) {
    setDailies((currentDailies) => {
      return currentDailies.filter((daily) => daily.id !== id);
    });
    return props.setNewAbandonedDailyQuestCount((prev) => prev + 1);

  }

  const resetAllDailies = (id, completed) => {
    const resetDailies = dailies.map((d) =>
      d.id === id ? { ...d, completed: completed } : { ...d, completed: false }
    );
    setDailies(resetDailies);
  };

  return (
    <div className="bodywrapper">
      <h1 className="questHeader">{props.user.name}'s Quest Log</h1>
      <form onSubmit={handleSubmit} className="new-quest-form">
        <div className="form-row">
          <label htmlFor="quest">Add a New Quest</label>
          <input
            value={newQuest}
            onChange={(e) => setNewQuest(e.target.value)}
            type="text"
            id="quest"
          ></input>
        </div>
        <button className="btn">ACCEPT</button>
      </form>
      <div id="completeQuest">
        Completed- {props.newQuestCompletedCount}{" "}
      </div>
      <ul className="list">
        {tasks.length === 0 && "No quests available!  Better find some work!"}
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <label>{task.title}</label>
              <button
                onClick={() => {
                  completeTask(task.id);
                  props.user.questCompleted++;
                }}
                className="btn btn-yay"
              >
                Complete
              </button>
              <button
                onClick={() => {
                  deleteTask(task.id);
                  props.user.abandonedQuests++;
                }}
                className="btn btn-danger"
              >
                Abandon
              </button>
            </li>
          );
        })}
      </ul>
      <div className="divider">__________</div>
      <form onSubmit={handleDailySubmit} className="new-daily-form">
        <div className="daily-form-row">
          <label htmlFor="daily">Start building your daily routine!</label>
          <input
            value={newDaily}
            onChange={(e) => setNewDaily(e.target.value)}
            type="text"
            id="daily"
          ></input>
        </div>
        <button className="btn dailyBtn">ACCEPT</button>
      </form>
      <div id="completeDaily">
        Completed Daily- {props.newDailyQuestsCompletedCount}{" "}
      </div>
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
                  props.user.abandonedDailyQuests++;
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
        CLEAR COMPLETED
      </button>
    </div>
  );
}
