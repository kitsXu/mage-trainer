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
        <div className="welcome">Greetings new pupil! </div>
        <div className="intro">
          Welcome to the Eldergrove Tower of Advanced Sorcery.
        </div>
        <div className="intro">
          I must preface your journey with the knowledge that this is no mere
          school. The Eldergrove Tower is a living entity, older than the grove
          that surrounds it. Here, we do not merely study magic; we combine it
          with nature and become a part of it.
        </div>
        <div className="intro">
          But beware—magic is no tame beast. It rewards those who respect it and
          devours those who do not. You will be tested. You will be required to
          be consistnt and disciplined, and the Eldergrove will watch. Secrets
          few dare to dream of await, if you are able to prove yourself worthy.
        </div>
        <div className="intro">
          Now, step forward. Speak your name so that the Eldergrove may know you and
          you may begin your journey.
        </div>

        <form
          className="nameInput"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(newName);
          }}
        >
          <label htmlFor="nameInputBar">Give the Eldergrove your name...</label>
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
