export default function BroodRecord(props) {
  // -- [ ] create div to hold dragon eggs
  // -- [ ] create div to display facts about dragon eggs obtained
  //  - [ ] creeate div to hold items

  console.log("UserProfile -- props.user: ", props.user);

  return (
    <div className="profile">
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>
      <h1 className="userHeader">{props.user.name}'s Brood</h1>
      <div className="divider">__________</div>
    </div>
  );
}
