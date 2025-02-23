import "./SetUsername.css";
import { useState } from "react";

export default function SetUsername(props) {
  const [newName, setNewName] = useState("");

  //-- set user's name
  function handleOnChange(value) {
    setNewName(value);
  }

  //-- updating user's name in local storage
  function handleSubmit() {
    if (props.user === !props.user) return;

    localStorage.setItem(
      "user",
      JSON.stringify({ ...props.user, name: newName })
    );
    props.setRefreshKey((prev) => prev + 1);
  }

  return (
    <>
      <div className="landingBodyWrap">
        <div className="welcome">Welcome! </div>
        <div className="intro">
          ...to the Eldergrove Tower of Advanced Sorcery.
        </div>
        <div className="intro">
          The Eldergrove Tower is a living entity that is a part of the grove
          that surrounds it. Here, we do not merely study magic; we combine it
          with nature and become a part of it.
        </div>
        <div className="intro">
          If you join the ranks of the Eldergrove, you will be tested. You will
          be required to be consistnt and disciplined, and the Eldergrove will
          watch. Secrets few dare to dream of await, if you are able to prove
          yourself worthy.
        </div>
        <div className="intro">
          If you are ready to take on the challenge, step forward and speak your
          name to begin!
        </div>
        <div className="inputBarInstruct">
          Give Your Name to the Eldergrove...
        </div>
        <form
          className="nameInput"
          onSubmit={(e) => {
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
          <button className="nameSubmitBtn">submit</button>
        </form>
      </div>
    </>
  );
}
