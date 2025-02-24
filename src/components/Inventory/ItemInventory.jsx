import { useEffect, useState } from "react";
import "./inventory.css";

export default function ItemInventory() {
  const [storedScrolls, setStoredScrolls] = useState([]);

  //-- Retrieve the array from localStorage.
  // const scrollsInv = JSON.parse(localStorage.getItem('scrollInv'));

  // console.log('ITEM INVENTORY:', scrollsInv);

  useEffect(() => {
    const scrollInv = localStorage.getItem("scrollInv");

    if (scrollInv) {
      setStoredScrolls(JSON.parse(scrollInv));
    }
    console.log("ITEM INVENTORY:", scrollInv);

  }, []);

  return (
    <div className="itemProfile">
      <h1 className="itemsHeader">Items- ({storedScrolls.length})</h1>
      <div className="divider">_____________</div>
      {storedScrolls ? (
        <div className="scrollInventory">
          <ul className="scrollInventory">
            {storedScrolls.map((scrollInv) => (
              <li className="scrollInventory" key={scrollInv.name}>
                {scrollInv.name}-- {scrollInv.amount}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="scrollInventory">
          <p className="scrollInventory">
            Bags look empty!
          </p>
          <p className="scrollInventory">
            Head to the Market to purchase scrolls or potions.
          </p>
        </div>
      )}
      <div className="divider">_________</div>
      <div className="logo">
        <a className="logo-tag-inv" href="https://ko-fi.com/kitsxu">
          -kitsXu-
        </a>
      </div>
    </div>
  );
}
