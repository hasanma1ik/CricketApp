import React from "react";


function CricketerCard({ cricketer, onCricketerClick }) {
  return (
    <div className="cricketer-card" onClick={() => onCricketerClick(cricketer)}>
      <img src={cricketer.image} alt={cricketer.name} />
      <div className="cricketer-details">
      <b><p className="cricketer-name">{cricketer.name}</p></b>
     <p className="cricketer-role">{cricketer.role}</p>
    </div>
    </div>
  );
}

export default CricketerCard;
