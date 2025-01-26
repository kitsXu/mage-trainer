import React from "react";
import { useState } from "react";
import "./market.css";
import Scrolls from "./Scrolls.jsx";
import Items from "./Items.jsx";

export default function Market(props) {
  const [view, setView] = useState("scrolls");

  return (
    <div className="profile">
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>
      <div className="totalGold">Total Gold: {props.user.gold}</div>
      <div className="marketButtons">
        <button className="menuBtn" onClick={() => setView("scrolls")}>
          Scroll Vendor
        </button>
        <button className="menuBtn" onClick={() => setView("items")}>
          Item Vendor
        </button>
      </div>
      <div>
        {view === "scrolls" && <Scrolls user={props.user} />}
        {view === "items" && <Items user={props.user} />}
      </div>
      <div className="logo">
        <a className="logo-tag-market" href="https://ko-fi.com/kitsxu">-kitsXu-</a>
      </div>
    </div>
  );
}
