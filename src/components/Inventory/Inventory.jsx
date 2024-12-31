import React from "react";
import "./inventory.css";
import BroodRecord from "./BroodRecord.jsx";
import ItemInventory from "./ItemInventory.jsx";

export default function Inventory(props) {
  const [view, setView] = useState("itemInventory");

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
