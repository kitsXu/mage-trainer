import "./Archives.css";

// -- TO DO --
// - [ ] 

export default function UserProfile(props) {
  console.log("UserProfile -- props.user: ", props.user);

  return (
    <div className="profile">
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>
      <h1 className="userHeader">Brood Leader {props.user.name}</h1>
      <div className="divider">_________</div>
      <div className="profileInfo">
        <div className="profile">Username: {props.user.name}</div>
        <div className="profile">Level: {props.user.level}</div>
        <div className="profile">Experience: {props.user.experience}xp</div>
        <div className="profile">
          Completed Quests: {props.user.questCompleted}
        </div>
        <div className="profile">
          Completed Daily Quests: {props.user.dailyQuestsCompleted}
        </div>

        <div className="profile">
          Total Quests Abandoned:{" "}
          {props.user.abandonedQuests + props.user.abandonedDailyQuests}
        </div>
        <div className="profile">Total Gold: {props.user.gold}</div>
      </div>
      <div className="divider">_________</div>
      <div className="logo">
        <a className="logo-tag-archive" href="https://ko-fi.com/kitsxu">-kitsXu-</a>
      </div>
    </div>
  );
}
