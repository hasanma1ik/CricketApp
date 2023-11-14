import React, { useState } from "react";
import CricketerCard from "./cricketercard";


function CricketerList({ cricketers, onCricketerClick }) {  
  const [searchInput, setSearchInput] = useState("")

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value)
  }

  const filteredCricketers = cricketers.filter((cricketer)=>
  cricketer.name.toLowerCase().includes(searchInput.toLowerCase())
  )

  return (
    <div className="cricketer-list-dropdown">
      <h2 className="heading1">Cricketers</h2>
      <div className="search-bar">
        <input type="text"
        placeholder="Search by player name"
        value={searchInput}
        onChange={handleSearchInputChange}
        />
      </div>

     <div className="cricketer-list-container">
      {filteredCricketers.map((cricketer)=>(
        <CricketerCard key={cricketer.id} cricketer={cricketer} onCricketerClick={onCricketerClick} />
      ))}
      </div>
     </div>
  );
}

export default CricketerList;



// cricketerList has taken in two props, 1-cricketers is an array of data that contains info about each cricketer. 2-onCricketerClick is a function that will be called when cricketer card is clicked. Typically used to handle what happens when cricketer is selected.

