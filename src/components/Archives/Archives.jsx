import "./Archives.css";

// -- TO DO --
// - [ ] 

export default function UserProfile(props) {

  return (
    <div className="profile">
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>
      <h1 className="userHeader">Pupil Name: {props.user.name}</h1>
      <h1 className="userHeader">Pupil Rank: novice mage</h1>      
      <div className="divider">_________</div>
      <div className="profileInfo">
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
      </div>
      <div className="divider">_________</div>
      <div className="logo">
        <a className="logo-tag-archive" href="https://ko-fi.com/kitsxu">-kitsXu-</a>
      </div>
    </div>
  );
}
