import './spells.css';

export default function BroodRecord() {


  return (
    <div className="profile">
      <h1 className="item-brood-Header">Spells- ({0})</h1>
      <div className="divider-inventoryHead">______________________________</div>
      <div className="scrollInventory">
          <p className="scrollInventory">
            Bags look empty!
          </p>
          <p className="scrollInventory">
            Try to purchase a scroll to learn a spell.
          </p>
        </div>
        <div className="divider">_________</div>
      <div className="logo">
        <a className="logo-tag-brood" href="https://ko-fi.com/kitsxu">-kitsXu-</a>
      </div>
    </div>
  );
}
