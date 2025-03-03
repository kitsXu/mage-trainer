import React from "react";
import { useState, useEffect } from "react";
import { scrolls } from "./Data/scrollsData.js";
import "./market.css";

export default function Market(props) {
  const [visibility, setVisibility] = useState(false);
  const [marketMoney, setMarketMoney] = useState(props.user.gold);
  const [newCost, setNewCost] = useState(() => {
    const currentScrollCost = localStorage.getItem("scrolls");
    return currentScrollCost ? JSON.parse(currentScrollCost) : scrolls;
  });

  console.log(marketMoney);

  //--Set current state of market money or gold to local storage.
  useEffect(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...props.user, gold: marketMoney })
    );

    props.setGold(marketMoney);
  }, [marketMoney]);

  //--handle the purchase.
  const purchaseScroll = (e, scrollId, currentScrollCost) => {
    e.preventDefault();
    var currentMoney = marketMoney;

    //--handles the gold in local storage.
    if (currentMoney >= currentScrollCost > 0) {
      currentMoney -= currentScrollCost;
      alert("Purchase complete!  Go check your inventory!");
      console.log(
        `PURCHASE COMPLETE for ${currentScrollCost} ${scrollId} --`,
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
        cost: currentScrollCost,
      };
      scrollInv.push(newScroll);

      localStorage.setItem("scrollInv", JSON.stringify(scrollInv));

      const updatedCost = newCost.map((scrolls) => ({
          ...scrolls,
          cost: scrolls.cost + 9950,
        }))
      setNewCost(updatedCost);
  

      localStorage.setItem("scrolls", JSON.stringify(updatedCost));

      console.log("new cost", newCost);
    } else {
      alert("Not Enough Gold!");
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
            <div className="scroll-explanation">{scroll.info}</div>
            <div className="scrollDiv">
              <img src={scroll.image} className="scroll" />
              <p key={scroll.id} className="cost">{newCost[0]?.cost}G Per</p>
              <form className="purchaseWrap">
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
