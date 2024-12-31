import { useState, useEffect } from "react";
import './brood.css';

export default function BroodRecord(props) {
  //   const [brood, setBrood] = useState();
  

  // useEffect(() => {
  //   const newBroodObject = localStorage.getItem("brood");

  //   if (!newBroodObject) {
  //     const newBroodObject = {
  //       earthEgg: 0,
  //       lavaEgg: 0,
  //       acidEgg: 0,
  //       waterEgg: 0,
  //       plainEgg: 0,
  //       healthPotion: 0,
  //       manaPotion: 0,
  //       speedPotion: 0,
  //     };

  //     localStorage.setItem("brood", JSON.stringify(newBroodObject));
  //     setBrood(newBroodObject);
  //     return;
  //   }
  //   [];
  // });

  return (
    <div className="profile">
      <h1 className="item-brood-Header">Brood- ({0})</h1>
      <div className="divider">_________</div>
      <div className="logo">
        <a className="logo-tag-brood" href="https://ko-fi.com/kitsxu">-kitsXu-</a>
      </div>
    </div>
  );
}
