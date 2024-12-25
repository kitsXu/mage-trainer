import earthEgg from "./images/earthEgg.png";
import lavaEgg from "./images/lavaEgg.png";
import waterEgg from "./images/waterEgg.png";
import poisonEgg from "./images/poisonEgg.png";

export default function Eggs(props) {
  return (
    <div className="eggProfile">
      <label>
        Earth Egg
        <div className="eggDiv">
          <img src={earthEgg} className="earthEgg" />
          <p className="cost">75G Per</p>
          <div className="purchaseWrap">
            <input className="eggAmount" type="number" />
            <button className="EggPurchase">Purchase</button>
          </div>
        </div>
      </label>
      <div className="divider">_________</div>
      <label>
        Lava Egg
        <div className="eggDiv">
          <img src={lavaEgg} className="lavaEgg" />
          <p className="cost">75G Per</p>
          <div className="purchaseWrap">
            <input className="eggAmount" type="number" />
            <button className="EggPurchase">Purchase</button>
          </div>
        </div>
        <hr />
      </label>
      <div className="divider">_________</div>
      <label>
        Water Egg
        <div className="eggDiv">
          <img src={waterEgg} className="waterEgg" />
          <p className="cost">75G Per</p>
          <div className="purchaseWrap">
            <input className="eggAmount" type="number" />
            <button className="EggPurchase">Purchase</button>
          </div>
        </div>
        <hr />
        <div className="divider">_________</div>
        </label>
        <label>
        Poison Egg
        <div className="eggDiv">
          <img src={poisonEgg} className="poisonEgg" />
          <p className="cost">150G Per</p>
          <div className="purchaseWrap">
            <input className="eggAmount" type="number" />
            <button className="EggPurchase">Purchase</button>
          </div>
        </div>
      </label>
      <div className="divider">_________</div>
    </div>
  );
}
