import React from "react";
import { useState } from "react";
import "./market.css";
import Eggs from "./Eggs.jsx";
import Items from "./Items.jsx";

export default function Market(props) {
  const [view, setView] = useState("eggs");

  return (
    <div className="profile">
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>
      <h1 className="userHeader">Scales Haven Marketplace</h1>
      <div className="marketButtons">
        <button className="menuBtn" onClick={() => setView("eggs")}>
          Egg Vendor
        </button>
        <button className="menuBtn" onClick={() => setView("items")}>
          Item Vendor
        </button>
      </div>
      <div>
        {view === "eggs" && <Eggs />}
        {view === "items" && <Items />}
      </div>
      <div className="logo">
        <a className="logo-tag-market" href="https://ko-fi.com/kitsxu">-kitsXu-</a>
      </div>
    </div>
  );
}
