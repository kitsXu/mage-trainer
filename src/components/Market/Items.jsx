import "./item.css";
import "./market.css";
import healthPotion from "./images/healthPotion.png"
import manaPotion from "./images/manaPotion.png"
import speedPotion from "./images/speedPotion.png"


export default function Items(props) {
  return (
    <div className="itemProfile">
      <label>
        Health Potion
        <div className="eggDiv">
          <img src={healthPotion} className="earthEgg" />
          <p className="cost">50G Per</p>
          <input className="eggAmount" type="number" />
          <button className="EggPurchase">Purchase?</button>
        </div>
      </label>
      <div className="divider">_________</div>
      <label>
        Mana Potion
        <div className="eggDiv">
        <img src={manaPotion} className="earthEgg" />
          <p className="cost">50G Per</p>
          <input className="eggAmount" type="number" />
          <button className="EggPurchase">Purchase?</button>
        </div>
        <hr />
      </label>
      <div className="divider">_________</div>
      <label>
        Speed X
        <div className="eggDiv">
        <img src={speedPotion} className="earthEgg" />
          <p className="cost">50G Per</p>
          <input className="eggAmount" type="number" />
          <button className="EggPurchase">Purchase?</button>
        </div>
        <hr />
        <div className="divider">_________</div>
      </label>
    </div>
  );
}
