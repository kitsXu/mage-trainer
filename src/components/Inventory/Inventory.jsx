import React from "react";
import { useState, useEffect } from "react";
import "./inventory.css";
import BroodRecord from "./BroodRecord.jsx";
import ItemInventory from "./ItemInventory.jsx";

export default function Inventory(props) {
  const [view, setView] = useState("itemInventory");
  const [inventory, setInventory] = useState();


  useEffect(() => {

  const newInventoryObject = localStorage.getItem("inventory");

  if (!newInventoryObject) {
    const newInventoryObject = {
      earthEgg: 0,
      lavaEgg: 0,
      acidEgg: 0,
      waterEgg: 0,
      plainEgg: 0,
      healthPotion: 0,
      manaPotion: 0,
      speedPotion: 0,
    };

    localStorage.setItem("inventory", JSON.stringify(newInventoryObject));
    setInventory(newInventoryObject);
    return;
  }
  []});

  return (
    <div className="profile">
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>
      <h1 className="inventoryHeader">{props.user.name}'s Inventory</h1>
      <div className="inventoryButtons">
        <button className="menuBtn" onClick={() => setView("itemInventory")}>
          Item Inventory{" "}
        </button>
        <button className="menuBtn" onClick={() => setView("brood")}>
          Brood
        </button>
      </div>
      <div className="totalGold">Total Gold: {props.user.gold}</div>
      <div>
        {view === "itemInventory" && <ItemInventory user={props.user} />}
        {view === "brood" && <BroodRecord user={props.user} />}
      </div>
      <div className="divider">_________</div>
    </div>
  );
}
