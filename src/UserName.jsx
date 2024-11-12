import "./UserName.css";

export default function UserName(props) {
  return (
    <>
      <div className="bodyWrap">
        <div className="welcome">Welcome Adventurer!</div>
        <div className="intro">
          You’ve journeyed far and wide, but now it’s time to settle down and
          build a new life in the peaceful village of Scales Haven. As a fledgling
          adventurer, your days will be filled with exciting tasks — from
          gathering resources and crafting tools to helping the townsfolk with
          their daily needs. The more you accomplish, the more gold you’ll earn,
          and with your hard-earned treasure, you’ll be able to purchase rare
          and powerful dragon eggs.
        </div>
        <div className="intro">What do you say?  Would you like to start your own brood?</div>
        <div className="intro"></div>
        <div className="foot">
          Tell us, adventurer, what is your name?
        </div>
      </div>
    </>
  );
}
