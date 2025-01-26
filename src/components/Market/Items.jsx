import "./item.css";
import "./market.css";
import { items } from "./itemData.js";
import { useState } from "react";

export default function Items(props) {
  //--dynamic state for selecting quantities of items.
  const [itemQtys, setItemQtys] = useState(
    items.reduce((acc, items) => {
      acc[items.id] = 0;
      return acc;
    }, {})
  );

  //-- handle changing the quantity input.
  const handleChange = (e, itemId) => {
    setItemQtys((prev) => ({
      ...prev,
      [itemId]: parseInt(e.target.value) || 0,
    }));
  };

  return (
    <div className="itemProfile">
      <h1 className="userHeader">Verdant Vial Apothecary</h1>
      <div className="itemProfile">
        {items.map((item) => (
          <div className="itemProfile" key={item.id}>
            <label>
              {item.name}
              <div className="itemDiv">
                <img src={item.image} className="item" />
                <p className="cost">{item.cost}G Per</p>
                <form className="purchaseWrap">
                  <input
                    className="itemQtys"
                    type="number"
                    value={itemQtys[item.id] || 0}
                    onChange={(e) => handleChange(e, item.id)}
                    min="0"
                    max="100"
                    step="1"
                  />
                  <button
                    className="itemPurchase"
                    onClick={(e) => purchaseItem(e, item.id, item.cost)}
                  >
                    Purchase
                  </button>
                </form>
              </div>
            </label>
          </div>
        ))}
        <div className="divider">_________</div>
      </div>
    </div>
  );
}
