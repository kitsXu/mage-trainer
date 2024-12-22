export default function Items(props) {


  return (
    <div className="profile">
      <label>
        Health Potion
        <div className="earthDiv">
          <p className="cost">50G Per Item</p>
          <input className="eggAmount" type="number" />
          <button className="EggPurchase">Purchase?</button>
        </div>
      </label>
      <div className="divider">_________</div>
      <label>
        Mana Potion
        <div className="lavaDiv">
          <p className="cost">50G Per Item</p>
          <input className="eggAmount" type="number" />
          <button className="EggPurchase">Purchase?</button>
        </div>
        <hr />
      </label>
      <div className="divider">_________</div>
      <label>
        Speed X
        <div className="lavaDiv">
          <p className="cost">50G Per Item</p>
          <input className="eggAmount" type="number" />
          <button className="EggPurchase">Purchase?</button>
        </div>
        <hr />
        <div className="divider">_________</div>
        </label>
    </div>
  );
}
