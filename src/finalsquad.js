// FinalSquad.j
import React, {useState} from "react";
import CricketerCard from './cricketercard';
import './shareImages.css';

function FinalSquad({ cricketers, onCricketerClick }) {
  const filteredCricketers = cricketers.filter((cricketer)=>
  cricketer.name.toLowerCase())


  
  return (
    <div id="finalSquadDropdown" className="final-squad-dropdown">
     
     <h2 className="heading2">My Final Squad</h2>
     
  
  <div className='final-squad-container'>
    {filteredCricketers.map((cricketer, index)=>(
      <div key={cricketer.id} className='cricketer-entry'>
        <div className='number-square'>
          <p>{index + 1}</p>
        </div>
        <CricketerCard key={cricketer.id} cricketer={cricketer} onCricketerClick={onCricketerClick} />
        </div>
      ))}
     
  </div>
  </div>
 
  )  
}

export default FinalSquad;
