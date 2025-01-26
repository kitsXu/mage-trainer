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

  //--handle the purchase- dedect gold from user, set new gold amount to local storage,
  //--create unique id for item, store bought item to local storage.
  //--handle not having enough gold
  const purchaseItem = (e, itemId, itemCost) => {
    e.preventDefault();
    const amount = itemQtys[itemId];

    if (props.user.gold >= itemCost * amount) {
      props.user.gold -= itemCost * amount;
      console.log(`PURCHASE COMPLETE for ${amount} ${itemId} --`, props.user);

      const uniqueId = crypto.randomUUID();
      const itemKey = `${itemId}-${uniqueId}`;

      const itemData = {
        id: itemKey,
        name: itemId,
        amount: amount,
        cost: itemCost,
      };
      localStorage.setItem(itemKey, JSON.stringify(itemData));

      console.log("scrolls saved to localStorage:", itemData);
    } else {
      console.log("Not enough gold!");
    }
  };

  return (
    <div className="itemProfile">
      <h1 className="userHeader">Verdant Vial Apothecary</h1>
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
  );
}
