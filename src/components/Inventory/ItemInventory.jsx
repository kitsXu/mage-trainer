import { useEffect, useState } from 'react';
import './inventory.css'

export default function ItemInventory() {
const [storedScrolls, setStoredScrolls] = useState();
 
    //-- Retrieve the array from localStorage.
// const scrollsInv = JSON.parse(localStorage.getItem('scrollInv'));

// console.log('ITEM INVENTORY:', scrollsInv);



useEffect(() => {
  const scrollInv = localStorage.getItem('scrollInv');

  if (scrollInv) {
    setStoredScrolls(JSON.parse(scrollInv));
  }
  console.log('ITEM INVENTORY:', scrollInv);

}, []);




  return (
    <div className="profile">
      <h1 className="item-brood-Header">Items- (0)</h1>
      <div className="divider">_________</div>
      {storedScrolls ? (<div >
        <ul className='scrollInventory'>
          {(storedScrolls).map((scrollInv) => ( <li className='scrollInventory' key={scrollInv.name}>
            {scrollInv.name}
          </li> ))}
        </ul>
      </div>) : ( <p className='scrollInventory'>No Scrolls.  Head to the Market to purchase!</p>) }
      <div className="divider">_________</div>
      <div className="logo">
        <a className="logo-tag-item" href="https://ko-fi.com/kitsxu">-kitsXu-</a>
      </div>
    </div> 
  ); 
}