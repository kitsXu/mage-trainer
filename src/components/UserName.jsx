import "./UserName.css";

export default function UserName(props) {
  return (
    <>
      <div className="bodyWrap">
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
          their eggs. Be consistent enough and a dragon egg could be
          yours!{" "}
        </div>
        <div className="intro">
          Although, then you have to figure out what to do with it...
        </div>
        <div className="foot">
          If you are ready to accept the risks, go ahead and enter your name
          below!
        </div>
      </div>
    </>
  );
}
