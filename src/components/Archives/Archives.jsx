import "./Archives.css";

// -- TO DO --
// - [ ] 

export default function UserProfile(props) {

  return (
    <div className="profile">
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>
      <h1 className="userHeader">Name: {props.user.name}</h1>
      <h1 className="userHeader">Rank: Novice Mage</h1>      
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>
      <div className="profileInfo">
        <div className="profile">Level: ... {props.user.level}</div>
        <div className="profile">Experience: ... {props.user.experience}xp</div>
        <div className="profile">
          Completed Quests: ... {props.user.dailyQuestsCompleted}
        </div>

        <div className="profile">
          Quests Abandoned: ... {" "}
          {props.user.abandonedDailyQuests}
        </div>
      </div>
      <div className="divider">_________</div>
      <div className="logo">
        <a className="logo-tag-archive" href="https://ko-fi.com/kitsxu">-kitsXu-</a>
      </div>
    </div>
  );
}
