import React from "react";
import earthEgg from './images/earthEgg.png'
import lavaEgg from './images/lavaEgg.png'
import './market.css'

export default function Market(props) {

    // -- [ ] create div to hold dragon eggs for sale! images?
    //  - [ ] separate div for egg prices?
    // -- [ ] create div to hold items for sale!
    //  - [ ] 
  
    
      return (
        <div className="profile">
          <h1 className="userHeader">Scales Haven Marketplace</h1>
          <div className="earthDiv">
            <img src={earthEgg} className="earthEgg"/>
          </div>
          <div className="lavaDiv">
            <img src={lavaEgg} className="lavaEgg"/>
          </div>
          <div className="divider">__________</div>
        </div>
      );
    }