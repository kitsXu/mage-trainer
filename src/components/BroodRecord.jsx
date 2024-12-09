export default function BroodRecord(props) {

    console.log("UserProfile -- props.user: ", props.user);
  
    return (
      <div className="profile">
        <h1 className="userHeader">{props.user.name}'s Brood</h1>
        <div className="divider">__________</div>
      </div>
    );
  }