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
          <input className="eggAmount" type="number" />
          <button className="EggPurchase">Purchase?</button>
        </div>
      </label>
      <div className="divider">__________</div>
      <label>
        Lava Egg
        <div className="lavaDiv">
          <img src={lavaEgg} className="lavaEgg" />
          <p className="cost">75G Per Egg</p>
          <input className="eggAmount" type="number" />
          <button className="EggPurchase">Purchase?</button>
        </div>
        <hr />
      </label>
      <div className="divider">__________</div>
      <label>
        Lava Egg
        <div className="lavaDiv">
          <img src={lavaEgg} className="lavaEgg" />
          <p className="cost">75G Per Egg</p>
          <input className="eggAmount" type="number" />
          <button className="EggPurchase">Purchase?</button>
        </div>
        <hr />
        <div className="divider">__________</div>
      </label>
    </div>
  );
}
