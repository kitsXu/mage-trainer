import earthEgg from "./images/earthEgg.png";
import lavaEgg from "./images/lavaEgg.png";

export default function Eggs(props) {
  return (
    <div className="profile">
      <label>
        Earth Egg
        <div className="earthDiv">
          <img src={earthEgg} className="earthEgg" />
          <p className="cost">75G Per Egg</p>
          <div className="purchaseWrap">
            <input className="eggAmount" type="number" />
            <button className="EggPurchase">Purchase</button>
          </div>
        </div>
      </label>
      <div className="divider">_________</div>
      <label>
        Lava Egg
        <div className="lavaDiv">
          <img src={lavaEgg} className="lavaEgg" />
          <p className="cost">75G Per Egg</p>
          <div className="purchaseWrap">
            <input className="eggAmount" type="number" />
            <button className="EggPurchase">Purchase</button>
          </div>
        </div>
        <hr />
      </label>
      <div className="divider">_________</div>
      <label>
        Lava Egg
        <div className="lavaDiv">
          <img src={lavaEgg} className="lavaEgg" />
          <p className="cost">75G Per Egg</p>
          <div className="purchaseWrap">
            <input className="eggAmount" type="number" />
            <button className="EggPurchase">Purchase</button>
          </div>
        </div>
        <hr />
        <div className="divider">_________</div>
        </label>
    </div>
  );
}
