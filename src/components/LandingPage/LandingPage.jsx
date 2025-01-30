import "./LandingPage.css";
import { useState } from "react";

export default function LandingPage(props) {
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
          school. The Eldergrove Tower is a living entity, older than the
          kingdoms that surround it. Here, we do not merely study magic; we
          commune with it. We become part of it.
        </div>
        <div className="intro">
          But beware—magic is no tame beast. It rewards those who respect it and
          devours those who do not. You will be tested, and the Eldergrove will
          watch. Prove yourself worthy, and it will reveal secrets few dare to
          dream of
        </div>
        <div className="intro">
          Now, step forward. Speak your name so that the tower may know you and
          you may begin your journey.
        </div>

        <form
          className="nameInput"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(newName);
          }}
        >
          <label htmlFor="nameInputBar">Give the Tower your name...</label>
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
