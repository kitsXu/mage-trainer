import scroll from "./images/scroll.png";
import "./market.css";

export default function Scrolls(props) {
  function purchaseScroll() {
    if (props.user.gold >= 50) props.user.gold -= 50;
    console.log("PURCHASE COMPLETE--", props.user);
  }

  return (
    <div className="scrollProfile">
      <h1 className="userHeader">The Inked Eldergrove</h1>
      <label>
        Blank Scroll
        <div className="scrollDiv">
          <img src={scroll} className="scroll" />
          <p className="cost">10G Per</p>
          <div className="purchaseWrap">
            <input className="scrollAmount" type="number" />
            <button className="scrollPurchase" onClick={purchaseScroll}>
              Purchase
            </button>
          </div>
        </div>
      </label>
      <div className="divider">_________</div>
      <label></label>
      <label>
        Scroll of Odin
        <div className="scrollDiv">
          <img src={scroll} className="scroll" />
          <p className="cost">75G Per</p>
          <div className="purchaseWrap">
            <input className="scrollAmount" type="number" />
            <button className="scrollPurchase">Purchase</button>
          </div>
        </div>
      </label>
      <div className="divider">_________</div>
      <label>
        Scroll of Ifrit
        <div className="scrollDiv">
          <img src={scroll} className="scroll" />
          <p className="cost">75G Per</p>
          <div className="purchaseWrap">
            <input className="scrollAmount" type="number" />
            <button className="scrollPurchase">Purchase</button>
          </div>
        </div>
        <hr />
      </label>
      <div className="divider">_________</div>
      <label>
        Scroll of Wisdom
        <div className="scrollDiv">
          <img src={scroll} className="scroll" />
          <p className="cost">75G Per</p>
          <div className="purchaseWrap">
            <input className="scrollAmount" type="number" />
            <button className="scrollPurchase">Purchase</button>
          </div>
        </div>
        <hr />
        <div className="divider">_________</div>
      </label>
      <label>
        Scroll of Shiva
        <div className="scrollDiv">
          <img src={scroll} className="scroll" />
          <p className="cost">150G Per</p>
          <div className="purchaseWrap">
            <input className="scrollAmount" type="number" />
            <button className="scrollPurchase">Purchase</button>
          </div>
        </div>
      </label>
      <div className="divider">_________</div>
    </div>
  );
}
