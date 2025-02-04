import { useEffect } from 'react';
import './inventory.css'
import scrollData from '../Market/Scrolls.jsx'

export default function ItemInventory() {

 
    //-- Retrieve the array from localStorage.
const scrollsInv = JSON.parse(localStorage.getItem('scrollInv'));

console.log('ITEM INVENTORY:', scrollsInv);




  return (
    <div className="profile">
      <h1 className="item-brood-Header">Items- (0)</h1>
      <div className="divider">_________</div>
      <div className="logo">
        <a className="logo-tag-item" href="https://ko-fi.com/kitsxu">-kitsXu-</a>
      </div>
    </div>
  );
}