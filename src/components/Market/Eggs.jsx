import mountainEgg from "./images/mountainEgg.png";
import lavaEgg from "./images/lavaEgg.png";
import riverEgg from "./images/riverEgg.png";
import acidEgg from "./images/acidEgg.png";


export default function Eggs(props) {

  const purchaseEgg = () => {
    props.user.gold - 75;
    // inventory.earthEgg + 1;
    console.log("PURCHASE COMPLETE-- Earth Egg")
    };


  return (
    <div className="eggProfile">
      <label>
        Plain Egg
        <div className="eggDiv">
          <img src={mountainEgg} className="mountainEgg" />
          <p className="cost">50G Per</p>
          <div className="purchaseWrap">
            <input className="eggAmount" type="number" />
            <button className="EggPurchase">Purchase</button>
          </div>
        </div>
      </label>
      <div className="divider">_________</div>
      <label></label>
      <label>
        Mountain Egg
        <div className="eggDiv">
          <img src={mountainEgg} className="mountainEgg" />
          <p className="cost">75G Per</p>
          <div className="purchaseWrap">
            <input className="eggAmount" type="number" />
            <button className="EggPurchase" onClick={purchaseEgg}>Purchase</button>
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
        River Egg
        <div className="eggDiv">
          <img src={riverEgg} className="riverEgg" />
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
          <img src={acidEgg} className="acidEgg" />
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
