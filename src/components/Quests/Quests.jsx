import { useState } from "react";
import "./Quests.css";

//-- TO DO --
// - [ ] make the explanation div appear on hover of a little box/question mark icon

export default function Quests(props) {
  const [newQuest, setNewQuest] = useState("");
  const [tasks, setTasks] = useState([]);

  console.log("Quests -- props.user: ", props.user);

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

  return (
    <div className="questWrapper">
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>
      <h1 className="questHeader">{props.user.name}'s Quest Log</h1>
      <p className="daily-info">
        &#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;Add
        tasks to the log below to build out your Quest Log. These should be
        things you don't do everyday, as you won't be permited to enter the same
        task here more than once if they have been completed. Quests that are
        completed are worth 4xp.
      </p>
      <form onSubmit={handleSubmit} className="new-quest-form">
        <div className="form-row">
          <input
            value={newQuest}
            onChange={(e) => setNewQuest(e.target.value)}
            type="text"
            id="quest"
          ></input>
        </div>
        <button className="btn">ACCEPT</button>
      </form>
      {/* <div id="completeQuest">Completed- {props.newQuestCompletedCount} </div> */}
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
      <div className="divider">_________</div>
      <div className="logo">
        <a className="logo-tag-quest" href="https://ko-fi.com/kitsxu">-kitsXu-</a>
      </div>
    </div>
  );
}
