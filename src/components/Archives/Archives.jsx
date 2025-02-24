import "./Archives.css";

// -- TO DO --
// - [ ]

export default function UserProfile(props) {
  return (
    <div className="profile">
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>{" "}
      <div className="user-Header">
        <div className="name-rank">Name: {props.user.name}</div>
        <div className="name-rank"> Rank: Novice Mage</div>
      </div>
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>{" "}
      <div className="profileInfo">
        <div className="profile">Level: ... {props.user.level}</div>
        <div className="profile">Experience: ... {props.user.experience}xp</div>
        <div className="profile">
          Completed Quests: ... {props.user.dailyQuestsCompleted}
        </div>

        <div className="profile">
          Quests Abandoned: ... {props.user.abandonedDailyQuests}
        </div>
      </div>
      <div className="divider">_________</div>
      <div className="logo">
        <a className="logo-tag-archive" href="https://ko-fi.com/kitsxu">
          -kitsXu-
        </a>
      </div>
    </div>
  );
}
