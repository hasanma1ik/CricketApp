// FinalSquad.js
import React from 'react';
import CricketerCard from './cricketercard';

function FinalSquad({ selectedCricketers }) {
  return (
    <div className="final-squad-dropdown">
      <h2 className="heading2">My Final Squad</h2>
      {selectedCricketers.map((cricketer, index) => (
        <div key={cricketer.id} className="final-squad-entry">
          <div className="italic-number">
                    <p>{index + 1}</p>
                      </div>
          <CricketerCard cricketer={cricketer} onCricketerClick={() => {}} />
        </div>
      ))}
    </div>
  );
}

export default FinalSquad;
