import React from "react";
import { useState } from "react";
import "./inventory.css";
import BroodRecord from "./Spells.jsx";
import ItemInventory from "./ItemInventory.jsx";

export default function Inventory(props) {
  const [view, setView] = useState("itemInventory");

  return (
    <div className="profile">
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>
      <div className="inventoryButtons">
        <button className="menuBtn-inventory" onClick={() => setView("itemInventory")}>
          Item Inventory{" "}
        </button>
        <button className="menuBtn-inventory" onClick={() => setView("brood")}>
          Spells
        </button>
      </div>
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>
      <div>
        {view === "itemInventory" && <ItemInventory user={props.user} />}
        {view === "brood" && <BroodRecord user={props.user} />}
      </div>
    </div>
  );
}
