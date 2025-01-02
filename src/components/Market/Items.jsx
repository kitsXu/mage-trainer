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
        <div className="itemDiv">
          <img src={healthPotion} className="itemIcons" />
          <p className="cost">75G Per</p>
          <input className="itemAmount" type="number" />
          <button className="itemPurchase">Purchase</button>
        </div>
      </label>
      <div className="divider">_________</div>
      <label>
        Mana Potion
        <div className="itemDiv">
        <img src={manaPotion} className="itemIcons" />
          <p className="cost">75G Per</p>
          <input className="itemAmount" type="number" />
          <button className="itemPurchase">Purchase</button>
        </div>
        <hr />
      </label>
      <div className="divider">_________</div>
      <label>
        Speed Potion
        <div className="itemDiv">
        <img src={speedPotion} className="itemIcons" />
          <p className="cost">75G Per</p>
          <input className="itemAmount" type="number" />
          <button className="itemPurchase">Purchase</button>
        </div>
        <hr />
        <div className="divider">_________</div>
      </label>
    </div>
  );
}
