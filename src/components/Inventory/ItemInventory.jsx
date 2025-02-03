import { useEffect } from 'react';
import './inventory.css'
import scrollData from '../Market/Scrolls.jsx'

export default function ItemInventory() {

//   useEffect(() => {
//       if (!user) return;
//     //-- Retrieve the array from localStorage.
// const scrollInv = JSON.parse(localStorage.getItem(scrollData));

// //-- Count occurrences of each name.
// const nameCount = scrollInv.reduce((acc, obj) => {

//   acc[obj.name] = (acc[obj.name] || 0) + 1;
//   return acc;
// }, {});
// console.log(nameCount);

//     }, []);



  return (
    <div className="profile">
      <h1 className="item-brood-Header">Items- ({0})</h1>
      {/* <div>{nameCount}</div> */}
      <div className="divider">_________</div>
      <div className="logo">
        <a className="logo-tag-item" href="https://ko-fi.com/kitsxu">-kitsXu-</a>
      </div>
    </div>
  );
}