import { useEffect, useState } from "react";

import "./Quests.css";

//-- TO DO --
// - [ ] check quests entered against local storage 'quests', if they are there you can't accept

export default function Quests(props) {
  const [newQuest, setNewQuest] = useState("");
  const [quests, setQuests] = useState(props.currentQuestList ?? []);
  const [visibility, setVisibility] = useState(false);
  const [formError, setFormError] = useState("");

  //-- enter a quest into the form
  function handleSubmit(e) {
    e.preventDefault();
    if (newQuest.trim() === "") {
      setFormError("Please enter a quest to submit!");
    } else {
      setFormError("");
      setQuests((currentQuests) => {
        return [...currentQuests, { id: crypto.randomUUID(), title: newQuest, completed: false }];
      });
      setNewQuest("");
    }
  }

  //--set current state of quests to local storage.
  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...props.user, currentQuestList: quests })
    );
    props.setCurrentQuestList(quests);
  }, [quests, props.user]);

  //-- clears the quest and increment quest completed count
  function completeTask(id) {
    setQuests((currentQuests) => {
      return currentQuests.filter((quests) => quests.id !== id);
    });
    return props.setNewQuestCompletedCount((prev) => prev + 1);
  }

    //--check and uncheck daily quests
    function toggleQuest (id, completed) {
      setQuests((prev) =>
        prev.map((q) => (q.id === id ? { ...q, completed: completed } : q))
      );
    };

  //-- just clears quest
  function deleteTask(id) {
    setQuests((currentQuests) => {
      return currentQuests.filter((quests) => quests.id !== id);
    });
    return props.setNewAbandonedQuestCount((prev) => prev + 1);
  }

  //--change visibility of an element
  function showHide() {
    if (visibility === false) setVisibility(true);
    else setVisibility(false);
  }

  return (
    <div className="questWrapper">
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>
      <div className="questHeaderWrap">
        <h1 className="questHeader">{props.user.name}'s Quest Log</h1>
        <button className="questExplanation" onClick={showHide}>
          ?
        </button>{" "}
      </div>
      {visibility && (
        <p className="daily-info">
          &#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;&#8287;Add
          quests to the log below to build out your Quest Log. These should be
          things you don't do everyday, as you won't be permited to enter the
          same quests here more than once if they have been completed. Quests
          that are completed are worth 4xp.
        </p>
      )}
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
      {formError && <p className="formError">{formError}</p>}
      <ul className="list">
        {quests.length === 0 && "No quests available!  Better find some work!"}
        {quests.map((quests) => {
          return (
            <label>
            <input
              type="checkbox"
              checked={quests.completed}
              onChange={(e) => toggleQuest(quests.id, e.target.checked)}
            />
            {quests.title}
          </label>
          );
        })}
      </ul>
      <button
        onClick={() => {
          completeTask(quests.id);
          props.user.questCompleted++;
        }}
        className="btn btn-yay"
      >
        Complete Selected Quests
      </button>
      <button
        onClick={() => {
          deleteTask(quests.id);
          props.user.abandonedQuests++;
        }}
        className="btn btn-danger"
      >
        Abandon Selected Quests
      </button>
      <div className="divider">_________</div>
      <div className="logo">
        <a className="logo-tag-quest" href="https://ko-fi.com/kitsxu">
          -kitsXu-
        </a>
      </div>
    </div>
  );
}
