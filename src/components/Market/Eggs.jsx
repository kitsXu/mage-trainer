import { mountainEggObj } from "../../funcs/myInventory";
import { plainEggObj } from "../../funcs/myInventory";
import { lavaEggObj } from "../../funcs/myInventory";
import { riverEggObj } from "../../funcs/myInventory";
import { acidEggObj } from "../../funcs/myInventory";


export default function Eggs(props) {

  console.log("EGGIES PAGE--", props.user)
  
  function purchaseEgg() {
    if (props.user.gold >= 50)
      props.user.gold -= 50;
    console.log("PURCHASE COMPLETE--", props.user);
    };


  return (
    <div className="eggProfile">
      <label>
        Plain Egg
        <div className="eggDiv">
          <img src={plainEggObj.image} className="plainEgg" />
          <p className="cost">50G Per</p>
          <div className="purchaseWrap">
            <input className="eggAmount" type="number" />
            <button className="EggPurchase" onClick={purchaseEgg} >Purchase</button>
          </div>
        </div>
      </label>
      <div className="divider">_________</div>
      <label></label>
      <label>
        Mountain Egg
        <div className="eggDiv">
          <img src={mountainEggObj.image} className="mountainEgg" />
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
          <img src={lavaEggObj.image} className="lavaEgg" />
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
        River Egg
        <div className="eggDiv">
          <img src={riverEggObj.image} className="riverEgg" />
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
        Acid Egg
        <div className="eggDiv">
          <img src={acidEggObj.image} className="acidEgg" />
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
