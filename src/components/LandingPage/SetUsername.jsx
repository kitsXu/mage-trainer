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
          You stand at the threshold of the Eldergrove- a nature-based school of
          mystics and magic.
        </div>
        <div className="intro">
          It is my assumption, by seeing you here, that you wish to study at our
          school?
        </div>
        <div className="intro">
          Few are worthy of the secrets that live inside the grove, but I am not
          one to deny opportunities.
        </div>
        <div className="inputBarInstruct">
          If you are ready to take on the challenge, give the Eldergrove your
          name!
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
