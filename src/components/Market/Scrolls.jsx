import { useState } from "react";
import scroll from "./images/scroll.png";
import "./market.css";

export default function Scrolls(props) {
  const [scrollAmount, setScrollAmount] = useState(0);
  const [odinScrollAmount, setOdinScrollAmount] = useState(0);
  const [ifritScrollAmount, setIfritScrollAmount] = useState(0);
  const [shivaScrollAmount, setShivaScrollAmount] = useState(0);



  function purchaseScroll() {
    e.preventDefault();
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
          <form className="purchaseWrap">
            <input
              className="scrollAmount"
              type="number"
              value={scrollAmount}
              onChange={(e) => setScrollAmount(e.target.value)}
              min="0"
              max="100"
              step="1"
            />
            <button className="scrollPurchase" onClick={purchaseScroll}>
              Purchase
            </button>
          </form>
        </div>
      </label>
      <div className="divider">_________</div>


      <label>
        Scroll of Odin
        <div className="scrollDiv">
          <img src={scroll} className="scroll" />
          <p className="cost">10G Per</p>
          <form className="purchaseWrap">
            <input
              className="scrollAmount"
              type="number"
              value={odinScrollAmount}
              onChange={(e) => setOdinScrollAmount(e.target.value)}
              min="0"
              max="100"
              step="1"
            />
            <button className="scrollPurchase" onClick={purchaseScroll}>
              Purchase
            </button>
          </form>
        </div>
      </label>
      <div className="divider">_________</div>


      <label>
        Scroll of Ifrit
        <div className="scrollDiv">
          <img src={scroll} className="scroll" />
          <p className="cost">10G Per</p>
          <form className="purchaseWrap">
            <input
              className="scrollAmount"
              type="number"
              value={ifritScrollAmount}
              onChange={(e) => setIfritScrollAmount(e.target.value)}
              min="0"
              max="100"
              step="1"
            />
            <button className="scrollPurchase" onClick={purchaseScroll}>
              Purchase
            </button>
          </form>
        </div>
      </label>
      <div className="divider">_________</div>

      <label>
        Scroll of Shiva
        <div className="scrollDiv">
          <img src={scroll} className="scroll" />
          <p className="cost">10G Per</p>
          <form className="purchaseWrap">
            <input
              className="scrollAmount"
              type="number"
              value={shivaScrollAmount}
              onChange={(e) => setShivaScrollAmount(e.target.value)}
              min="0"
              max="100"
              step="1"
            />
            <button className="scrollPurchase" onClick={purchaseScroll}>
              Purchase
            </button>
          </form>
        </div>
      </label>
      <div className="divider">_________</div>


    </div>
  );
}
