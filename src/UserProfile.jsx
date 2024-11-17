
export default function UserProfile(props) {

  console.log("UserProfile -- props.user: ", props.user);

  return (
    <div className="profile">
      <h1 className="userHeader">Brood Leader {props.user.name}</h1>
      <div className="divider">__________</div>
      <div className= "profileInfo">
        <div className="profile">Username: {props.user.name}</div>
        <div className="profile">Level: {props.user.level}</div>
        <div className="profile">Total Quests Completed: {props.user.questCompleted + props.user.dailyQuestsCompleted}</div>
        <div className="profile">Total Quests Abandoned: {props.user.abandonedQuests + props.user.abandonedDailyQuests}</div>
        </div>
    </div>
  );
}