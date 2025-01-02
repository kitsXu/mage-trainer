import "./LandingPage.css";
import { useState } from "react";
import { LoadingIndicator } from "./LoadingIndicator";

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
        <div className="welcome">Welcome, Adventurer!</div>
        <div className="intro">... to our little village of Scales Haven.</div>
        <div className="intro">
          SO, you've heard about the dragon eggs? And you expect to collect as
          many as you can to raise a dragon army? Dangerous, dumb, but
          understandable!
        </div>
        <div className="intro">
          Not so fast, though! You have to earn your keep before the dragons
          will let you have even one of their precious eggs!
        </div>
        <div className="intro">
          ALL Brood Leaders, even seasoned ones, are expected to complete their
          daily routines, as well as a few additional quests to get and keep
          their eggs. Be consistent enough and a dragon egg could be yours!{" "}
        </div>
        <div className="intro">
          Although, then you have to figure out what to do with it...
        </div>
        <div className="foot">
          If you are ready to accept the risks, go ahead and enter your name
          below!
        </div>

        <form
          className="nameInput"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(newName);
          }}
        >
          <label htmlFor="nameInputBar">NAME</label>
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
