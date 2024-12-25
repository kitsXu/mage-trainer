import './inventory.css';

export default function Inventory(props) {
  // -- [ ] div on top for egg inventory
  // -- [ ] div on bottom for item inventory
  // -- [ ] make inventory sortable?

  return (
    <div className="profile">
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>
      <h1 className="userHeader">{props.user.name}'s Inventory</h1>
      <div className="divider">_________</div>
      <div className="logo">
        <a className="logo-tag-one" href="https://ko-fi.com/kitsxu">-kitsXu-</a>
      </div>
    </div>
  );
}
