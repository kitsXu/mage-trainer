import React from "react";
import { useState, useEffect } from "react";
import { scrolls } from "./Data/scrollsData.js";
import "./market.css";

export default function Market(props) {
  //--dynamic state for selecting quantities of scrolls.
  const [scrollQtys, setScrollQtys] = useState(
    scrolls.reduce((acc, scrolls) => {
      acc[scrolls.id] = 0;
      return acc;
    }, {})
  );
  const [visibility, setVisibility] = useState(false);
  const [marketMoney, setMarketMoney] = useState(props.user.gold);

  console.log(marketMoney);

  //--Set current state of market money or gold to local storage.
  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...props.user, gold: marketMoney })
    );

    props.setGold(marketMoney);
  }, [marketMoney]);

  //-- handle changing the quantity input.
  const handleChange = (e, scrollId) => {
    setScrollQtys((prev) => ({
      ...prev,
      [scrollId]: parseInt(e.target.value) || 0,
    }));
  };

  //--handle the purchase.
  const purchaseScroll = (e, scrollId, scrollCost) => {
    e.preventDefault();
    const amount = scrollQtys[scrollId];
    var currentMoney = marketMoney;

    if (amount === 0) {
      alert("Please Select Quantity");
    } else {
      //--handles the gold in local storage.
      if (currentMoney >= scrollCost * amount && amount > 0) {
        currentMoney -= scrollCost * amount;
        alert("Purchase complete!  Go check your inventory!");
        console.log(
          `PURCHASE COMPLETE for ${amount} ${scrollId} --`,
          props.user
        );
        setMarketMoney(currentMoney);

        //-- get stored inventory array from local storage.
        //-- create new object from scrollData.
        //-- add new object to array.
        //-- again set to local storage.

        let scrollInv = JSON.parse(localStorage.getItem("scrollInv")) || [];

        const uniqueId = crypto.randomUUID();
        const scrollKey = `${scrollId}-${uniqueId}`;

        const newScroll = {
          id: scrollKey,
          name: scrollId,
          amount: amount,
          cost: scrollCost,
        };
        scrollInv.push(newScroll);

        localStorage.setItem("scrollInv", JSON.stringify(scrollInv));
      } else {
        console.log("SCROLL QTY");
        alert("Not Enough Gold!");
      }
    }
  };

  //--change visibility of an element
  function showHide() {
    if (visibility === false) setVisibility(true);
    else setVisibility(false);
  }

  return (
    <div className="profile">
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>{" "}
      <div className="totalGold">Gold: {props.user.gold}</div>
      <div className="questHeaderWrap">
        <h1 className="userHeader">The Inked Eldergrove</h1>
        <button className="questExplanation" onClick={showHide}>
          ?
        </button>
      </div>
      {visibility && (
        <p className="scroll-info">
          Welcome to The Inked Eldergrove! We're in the business of selling
          magical scrolls that guide you through your chosen discipline. We give
          a HUGE discount to first time buyers, so make sure to choose your
          first scroll wisely!
        </p>
      )}
      {scrolls.map((scroll) => (
        <div className="scrollProfile" key={scroll.id}>
          <label>
            {scroll.name}
            <div className="scrollDiv">
              <img src={scroll.image} className="scroll" />
              <p className="cost">{scroll.cost}G Per</p>
              <form className="purchaseWrap">
                <input
                  className="scrollQtys"
                  type="number"
                  value={scrollQtys[scroll.id] || 0}
                  onChange={(e) => handleChange(e, scroll.id)}
                  min="0"
                  max="100"
                  step="1"
                />
                <button
                  className="scrollPurchase"
                  onClick={(e) => purchaseScroll(e, scroll.id, scroll.cost)}
                >
                  Purchase
                </button>
              </form>
            </div>
            <div className="market-divider">_______</div>
          </label>
        </div>
      ))}
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>{" "}
      <div className="logo">
        <a className="logo-tag-market" href="https://ko-fi.com/kitsxu">
          -kitsXu-
        </a>
      </div>
    </div>
  );
}
