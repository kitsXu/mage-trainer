import './brood.css';

export default function BroodRecord(props) {

  console.log("UserProfile -- props.user: ", props.user);

  return (
    <div className="profile">
      <h1 className="item-brood-Header">Brood- ({0})</h1>
      <div className="divider">_________</div>
      <div className="logo">
        <a className="logo-tag-brood" href="https://ko-fi.com/kitsxu">-kitsXu-</a>
      </div>
    </div>
  );
}
