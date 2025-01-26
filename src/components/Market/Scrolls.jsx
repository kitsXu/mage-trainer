import { useState } from "react";
import { scrolls } from './scrollsData.js'
import "./market.css";

export default function Scrolls(props) {
  const [scrollQtys, setScrollQtys] = useState(
    scrolls.reduce((acc, scrolls) => {
      acc[scrolls.id] = 0;
      return acc;
    }, {})
  );

  const handleChange = (e, scrollId) => {
    setScrollQtys((prev) => ({
      ...prev,
      [scrollId]: parseInt(e.target.value) || 0, 
    }));
  };

  // const purchaseScroll = (e, scrollId, scrollCost) => {
  //   e.preventDefault();
  //   const amount = scrollQtys[scrollId];
    
  //   if (props.user.gold >= scrollCost * amount) {
  //     props.user.gold -= scrollCost * amount;
  //     console.log(`PURCHASE COMPLETE for ${amount} ${scrollId} --`, props.user);

  //     const uniqueId = crypto.randomUUID(); 
  //     const scrollKey = `${scrollId}-${uniqueId}`; 
      
  //     const scrollData = {
  //       id: scrollKey,
  //       name: scrollId, 
  //       amount: amount,
  //       cost: scrollCost,
  //     };
  //     localStorage.setItem(scrollKey, JSON.stringify(scrollData));

  //     console.log("scrolls saved to localStorage:", scrollData);
  //   } else {
  //     console.log("Not enough gold!");
  //   }
  // };

  return (

<div className="scrollProfile">
      <h1 className="userHeader">The Inked Eldergrove</h1>
      {scrolls.map((scroll) => 
      <label>
        {scroll.name}
        <div className="scrollDiv">
          <img src={scroll.image} className="scroll" />
          <p className="cost">{scroll.cost}G Per</p>
          <form className="purchaseWrap">
            <input
              className="scrollQtys"
              type="number"
              value={scrollQtys[scroll.id]}
              onChange={(e) => handleChange(e, scroll.id)}
              min="0"
              max="100"
              step="1"
            />
            <button className="scrollPurchase" onClick={(e) => purchaseScroll(e, scroll.id, scroll.cost)}>
              Purchase
            </button>
          </form>
        </div>
      </label>)}
      <div className="divider">_________</div>
    </div>
  );
}
