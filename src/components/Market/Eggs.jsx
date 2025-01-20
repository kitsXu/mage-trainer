import scroll from './images/scroll.png';


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
        Blank Scroll
        <div className="eggDiv">
          <img src={scroll} className="scroll" />
          <p className="cost">10G Per</p>
          <div className="purchaseWrap">
            <input className="eggAmount" type="number" />
            <button className="EggPurchase" onClick={purchaseEgg} >Purchase</button>
          </div>
        </div>
      </label>
      <div className="divider">_________</div>
      <label></label>
      <label>
        Scroll of Odin
        <div className="eggDiv">
          <img src={scroll} className="scroll" />
          <p className="cost">75G Per</p>
          <div className="purchaseWrap">
            <input className="eggAmount" type="number" />
            <button className="EggPurchase">Purchase</button>
          </div>
        </div>
      </label>
      <div className="divider">_________</div>
      <label>
        Scroll of Ifrit
        <div className="eggDiv">
          <img src={scroll} className="scroll" />
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
        Scroll of Wisdom
        <div className="eggDiv">
          <img src={scroll} className="scroll" />
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
        Scroll of Shiva
        <div className="eggDiv">
          <img src={scroll} className="scroll" />
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
