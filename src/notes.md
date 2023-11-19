1. Project Structure 

App.js
``` js
import React, { useState } from "react";
import CricketerList from "./CricketerList"; // Importing CricketerList component
import SelectedCricketer from "./SelectedCricketer"; // Importing SelectedCricketer component
import cricketerData from "./data"; // Importing cricketerData from data.js

function App() {
  const [selectedCricketer, setSelectedCricketer] = useState(null); // Setting up state to store the selected cricketer

  const handleCricketerClick = (cricketer) => {
    setSelectedCricketer(cricketer); // When a cricketer is clicked, set it as the selected cricketer
  }

  return (
    <div className="app">
      <CricketerList cricketers={cricketerData} onCricketerClick={handleCricketerClick} />
      <SelectedCricketer cricketer={selectedCricketer} />
    </div>
  );
}

export default App;

// Navbar links T20s, Tests, odis. number change to fancy edo sz? . submit final squad

```
Pointers -
1- App.js - main component where project starts. Sets up a state variable called selectedCricketer to keep track of selected cricketers data.
2- handleCricketerClick function is used to update the selected cricketer when a cricketer is clicked.
3- It renders the CricketList component, passing the list of cricketers and the click handler as props.
4- Also renders the SelectedCricketer component, passing the selected cricketer as a prop.



CricketerList.js

``` js

import React from "react";

function CricketerList({ cricketers, onCricketerClick }) {
  return (
    <div>
      <h2>Cricketers</h2>
      <ul>
        {cricketers.map((cricketer) => (
          <li key={cricketer.id} onClick={() => onCricketerClick(cricketer)}>
            {cricketer.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CricketerList;

```
Pointers :
1- CricketList.js is a component responsible for rendering a list of cricketers.
2- It recieves a list of cricketers(`cricketers`) and a click handler(`onCricketerClick`) as props.
3- It maps through the list of cricketers & displays their names in a list.
4- When a cricketer is clicked, it triggers the on `onCricketerClick` handler with the selected cricketer's data.

SelectedCricketer.js

``` js
import React from 'react';

function SelectedCricketer({ cricketer }) {
  return (
    <div className='selected-cricketer'>
      <h2>Selected Cricketer</h2>
      {cricketer ? (
        <div>
          <p>Name: {cricketer.name}</p>
          <p>Age: {cricketer.age}</p>
          <p>Role: {cricketer.role}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Select a cricketer from the list to see details.</p>
      )}
    </div>
  );
}

export default SelectedCricketer;

```
Pointers: 
1- SelectedCricketer.js is a component for displaying the details of the selected cricketer.
2- It receives the selected cricketer's data(`cricketer`) as a prop.
3- It checks if a cricketer is selected & displays their name, age & role.

These components work together to display a list of cricketers and show details of a selected cricketer when clicked.



For cricketCard close icon 

``` js
//App.js

const handleRemoveCricketer = (id) =>{
  setSelectedCricketers(selectedCricketers.filter((cricketer)=> cricketer.id !== id))
}

 <SelectedCricketer 
    selectedCricketers={selectedCricketers}
    onRemoveCricketer={handleRemoveCricketer}
    />

    //Selected cricketer.js

    <button
          className='delete-button'
          onClick={()=> handleRemoveCricketer(cricketer.id)}
          >
            X
          </button>



```


for prompt message close icon

``` js


//in App.js

const [promptMessage, setPromptMessage] = useState(null)


const handleCricketerClick = (cricketer) =>{
  if (selectedCricketers.some((selected) => selected.id === cricketer.id)){

    setPromptMessage(`${cricketer.name} is already in the squad`)

    setTimeout(() => {
      setPromptMessage(null)
      
    }, 3000);
  } else { 
  setSelectedCricketers([...selectedCricketers, cricketer])
  }
}

{promptMessage && (
      <div className="prompt">
        <div className="prompt-message">
          {promptMessage}
          <button className="close-button" onClick={handleClosePrompt}>
            X
          </button>
        </div>
      </div>
    )}


```
``` js
// setting up dropdown, just creating classes in cricketList and then applying css

  <div className="cricketer-list-dropdown">
      <h2>Cricketers</h2>

     <div className="cricketer-list-container">

```


``` js
//adding searchbar on top of cricketList

//1 - State for search Input - We use the useState hook to create a state variable called searchInput, which will hold the value of the search input.
const [searchInput, setSearchInput] = useState("");

//2- Search Input Change Handler - function that gets called whenever there's a change in the search input field. It updates the searchInput state with the current input value.
const handleSearchInputChange = (event) => {
  setSearchInput(event.target.value);
};

//3- Filtering Cricketers - We filter the cricketers array based on the search input. The filter method is used to create a new array that only contains cricketers whose names include the text entered in the search input. We use toLowerCase() to make the search case-insensitive.

const filteredCricketers = cricketers.filter((cricketer) =>
  cricketer.name.toLowerCase().includes(searchInput.toLowerCase())
);

//4-Displaying Filtered Cricketers - map over the filteredCricketers array and render a CricketerCard component for each filtered cricketer. This ensures that only the matching cricketers are displayed.

<div className="cricketer-list-container">
  {filteredCricketers.map((cricketer) => (
    <CricketerCard
      key={cricketer.id}
      cricketer={cricketer}
      onCricketerClick={onCricketerClick}
    />
  ))}
</div>

//5- Search Input Field -

<input
  type="text"
  placeholder="Search by cricketer name"
  value={searchInput}
  onChange={handleSearchInputChange}
/>
```
``` js
//LayOut of cricketers and My Squad. Click on cricketers card and it will show up in My Squad section

```

``` js
//App.js code for functioning dnd

import React, { useState } from "react";
import CricketerList from "./cricketerlist";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SelectedCricketer from "./selectedcricketer";
import cricketerData from "./data";

function App() {
  const [selectedCricketers, setSelectedCricketers] = useState([]);
  const [promptMessage, setPromptMessage] = useState(null);

  const handleCricketerClick = (cricketer) => {
    if (selectedCricketers.some((selected) => selected.id === cricketer.id)) {
      setPromptMessage(`${cricketer.name} is already in the squad`);

      setTimeout(() => {
        setPromptMessage(null);
      }, 3000);
    } else {
      setSelectedCricketers([...selectedCricketers, cricketer]);
    }
  }

  const handleRemoveCricketer = (id) => {
    setSelectedCricketers(selectedCricketers.filter((cricketer) => cricketer.id !== id));
  }

  const onDragEnd = (result) => {
    if (!result.destination) return; // Dragged outside the list

    const items = Array.from(selectedCricketers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedCricketers(items);
  }

  return (
    <div className="app">
      <CricketerList
        cricketers={cricketerData}
        onCricketerClick={handleCricketerClick}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="selectedCricketers">
          {(provided) => (
            <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
            <SelectedCricketer
              selectedCricketers={selectedCricketers}
              onRemoveCricketer={handleRemoveCricketer}
              onDragEnd={onDragEnd}
            />
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {promptMessage && (
        <div className="prompt">
          <div className="prompt-message">
            {promptMessage}
            <button className="close-button" onClick={() => setPromptMessage(null)}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


// selectedCricketer.js for functioning dnd 

import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CricketerCard from './cricketercard';

function SelectedCricketer({ selectedCricketers, onRemoveCricketer, onDragEnd }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="selectedCricketers">
        {(provided) => (
          <div
            className='selected-cricketer'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className='heading2'>My Squad</h2>
            {selectedCricketers && selectedCricketers.map((cricketer, index) => (
              <Draggable
                key={cricketer.id}
                draggableId={cricketer.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    className="cricketer-entry"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="number-square">
                      <p>{index + 1}</p>
                    </div>
                    <button
                      className='delete-button'
                      onClick={() => onRemoveCricketer(cricketer.id)}
                    >
                      X
                    </button>
                    <CricketerCard cricketer={cricketer} onCricketerClick={() => {}} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default SelectedCricketer;



```
``` js

//to make sure the delete icon on cards stays attached to the card, I used position : relative, property in the cricket-entry
// to have the my final squad button show just below the selectedcricketer cards, i set up final-squad container and then used grid-column: span 2 in css .

//to make sure final squad button doesn't dissappear

      {!showFinalSquad && ( // removed this portion
        <button className="final-squad-button" onClick={handleShowFinalSquad}>
          Display Final Squad
        </button>

// position: absolute; worked in having the button stay put and not scroll along with the page




// prompt with atleast select 15 players 

const [showFinalSquad, setShowFinalSquad] = useState(false)

const handleShowFinalSquad = () =>{
  // Check if at least 15 players are selected before showing the final squad
  if (selectedCricketers.length >= 15){
    setShowFinalSquad(true)
  } else {
    setPromptMessage('Please select atleast 15 players to finalize squad!')
  }
}

```


``` js
const handleCricketerClick = (cricketer) =>{
  if (final11.some((selected) => selected.id === cricketer.id)){

    setPromptMessage(`${cricketer.name} is already in the squad`)

    setTimeout(() => {
      setPromptMessage(null)
      
    }, 3000);
  } else { 
  setfinal11([...final11, final11])
  }
}
const handleRemoveCricketer = (id) =>{
  setFinal11(final11.filter((cricketer)=> cricketer.id !== id))
}
const handleClosePrompt = () =>{
  setPromptMessage(null)
}

const onDragEnd = (result) =>{
  if(!result.destination) return  // Dragged outside the list

  // Reorder the selectedCricketers array based on the drag-and-drop result
const items = Array.from(final11)
const[reorderedItem] = items.splice(result.source.index, 1)
items.splice(result.destination.index, 0, reorderedItem)

setFinal11(items)
  // Update the selectedCricketers array with the reordered items.
}



  <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="final11">
        {(provided)=>(
          <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          {...provided.dragHandleProps}
          >
    <Final11 
    final11={final11}
    onRemoveCricketer={handleRemoveCricketer}
    onDragEnd={onDragEnd}
    />
          </div>
        )}

      </Droppable>
    </DragDropContext>


 const onDragEnd = (result) =>{
  if(!result.destination) return  // Dragged outside the list

  // Reorder the selectedCricketers array based on the drag-and-drop result
const items = Array.from(final11)
const[reorderedItem] = items.splice(result.source.index, 1)
items.splice(result.destination.index, 0, reorderedItem)

setFinal11(items)
  // Update the selectedCricketers array with the reordered items.

}

```



``` js
// latest code

import React, {useState} from "react";
import CricketerList from "./cricketerlist";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SelectedCricketer from "./selectedcricketer";
import cricketerData from "./data";
import CricketerCard from "./cricketercard";
import Final11 from './final11'; // Import the Final11 component
import FinalSquad from "./finalsquad";

function App() {
const [selectedCricketers, setSelectedCricketers] = useState([])
const [promptMessage, setPromptMessage] = useState(null)
const [showFinalSquad, setShowFinalSquad] = useState(false)
const [final11, setFinal11] = useState([]);

const handleCricketerClick = (cricketer) =>{
  if (selectedCricketers.some((selected) => selected.id === cricketer.id)){

    setPromptMessage(`${cricketer.name} is already in the squad`)

    setTimeout(() => {
      setPromptMessage(null)
      
    }, 3000);
  } else { 
  setSelectedCricketers([...selectedCricketers, cricketer])
  }
}
const handleRemoveCricketer = (id) =>{
  setSelectedCricketers(selectedCricketers.filter((cricketer)=> cricketer.id !== id))
  setFinal11(final11.filter((cricketer)=> cricketer.id !== id))
}
const handleClosePrompt = () =>{
  setPromptMessage(null)
}

const onDragEnd = (result, sourceList, setSourceList) => {
  if (!result.destination) return; // Dragged outside the list

  // Reorder the sourceList array based on the drag-and-drop result
  const items = Array.from(sourceList);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);

  setSourceList(items);
  // Update the sourceList array with the reordered items.
};


const handleShowFinalSquad = () =>{
  // Check if at least 15 players are selected before showing the final squad
  if (selectedCricketers.length >= 15){
    setShowFinalSquad(true)
  } else {
    setPromptMessage('Please select atleast 15 players to finalize squad!')
  }
}
const handleFinal11CricketerClick = (cricketer) => {
  if (final11.some((selected) => selected.id === cricketer.id)) {
    setPromptMessage(`${cricketer.name} is already in the Final XI`);

    setTimeout(() => {
      setPromptMessage(null);
    }, 3000);
  } else {
    setFinal11([...final11, cricketer]);
  }
  
};

return (
  <div className="app">
    <CricketerList
      cricketers={cricketerData}
      onCricketerClick={handleCricketerClick}
    />
  
    
    
    <DragDropContext onDragEnd={(result) => onDragEnd(result, selectedCricketers, setSelectedCricketers)}>
  <Droppable droppableId="selectedCricketers">
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        {...provided.dragHandleProps}
      >
        <SelectedCricketer
          selectedCricketers={selectedCricketers}
          onRemoveCricketer={handleRemoveCricketer}
          onDragEnd={(result) => onDragEnd(result, selectedCricketers, setSelectedCricketers)}
        />
      </div>
    )}
  </Droppable>
</DragDropContext>;


<DragDropContext onDragEnd={(result) => onDragEnd(result, final11, setFinal11)}>
  <Droppable droppableId="final11">
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        {...provided.dragHandleProps}
      >
        <Final11
          final11={final11}
          onRemoveCricketer={handleRemoveCricketer}
          onDragEnd={(result) => onDragEnd(result, final11, setFinal11)}
        />
      </div>
    )}
  </Droppable>
</DragDropContext>;
   
    {promptMessage && (
      <div className="prompt">
        <div className="prompt-message">
          {promptMessage}
          <button className="close-button" onClick={handleClosePrompt}>
            X
          </button>
        </div>
      </div>
    )}
{showFinalSquad && (
        <FinalSquad
          cricketers={selectedCricketers}
          onCricketerClick={handleFinal11CricketerClick}
        />
      )}

      <button className="final-squad-button" onClick={handleShowFinalSquad}>
        Display Final Squad
      </button>
    </div>
  );
}
 
export default App;

```


```js
//precode

import React, {useState} from "react";
import CricketerList from "./cricketerlist";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SelectedCricketer from "./selectedcricketer";
import cricketerData from "./data";
import CricketerCard from "./cricketercard";
import FinalSquad from "./finalsquad";

function App() {
const [selectedCricketers, setSelectedCricketers] = useState([])
const [promptMessage, setPromptMessage] = useState(null)
const [showFinalSquad, setShowFinalSquad] = useState(false)

const handleCricketerClick = (cricketer) =>{
  if (selectedCricketers.some((selected) => selected.id === cricketer.id)){

    setPromptMessage(`${cricketer.name} is already in the squad`)

    setTimeout(() => {
      setPromptMessage(null)
      
    }, 3000);
  } else { 
  setSelectedCricketers([...selectedCricketers, cricketer])
  }
}
const handleRemoveCricketer = (id) =>{
  setSelectedCricketers(selectedCricketers.filter((cricketer)=> cricketer.id !== id))
}
const handleClosePrompt = () =>{
  setPromptMessage(null)
}

const onDragEnd = (result) =>{
  if(!result.destination) return  // Dragged outside the list

  // Reorder the selectedCricketers array based on the drag-and-drop result
const items = Array.from(selectedCricketers)
const[reorderedItem] = items.splice(result.source.index, 1)
items.splice(result.destination.index, 0, reorderedItem)

setSelectedCricketers(items)
  // Update the selectedCricketers array with the reordered items.
}

const handleShowFinalSquad = () =>{
  // Check if at least 15 players are selected before showing the final squad
  if (selectedCricketers.length >= 15){
    setShowFinalSquad(true)
  } else {
    setPromptMessage('Please select atleast 15 players to finalize squad!')
  }
}

return (
  <div className="app">
    <CricketerList
      cricketers={cricketerData}
      onCricketerClick={handleCricketerClick}
    />
    
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="selectedCricketers">
        {(provided)=>(
          <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          {...provided.dragHandleProps}
          >
    <SelectedCricketer 
    selectedCricketers={selectedCricketers}
    onRemoveCricketer={handleRemoveCricketer}
    onDragEnd={onDragEnd}
    />
          </div>
        )}

      </Droppable>
    </DragDropContext>
   
    {promptMessage && (
      <div className="prompt">
        <div className="prompt-message">
          {promptMessage}
          <button className="close-button" onClick={handleClosePrompt}>
            X
          </button>
        </div>
      </div>
    )}
        {showFinalSquad && (
          <div className="final-squad-dropdown">
            <h2 className='heading2'>Final Squad</h2>
            {selectedCricketers.map((cricketer, index) => (
        <div key={cricketer.id} className="cricketer-entry">
          <div className="italic-number1">
                    <p>{index + 1}</p>
                      </div>
                <CricketerCard cricketer={cricketer} onCricketerClick={() => {}} />
              </div>
              
            ))}
          </div>
        )}
           <button className="final-squad-button" onClick={handleShowFinalSquad}>
           Display Final Squad
         </button>
  

  </div>
);
}
 
export default App;

```




```js
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; 
import CricketerCard from './cricketercard';

function FinalSquad ({ finalsquad, onRemoveCricketer, onDragEnd}) {
    return(
        <div className="final-squad-dropdown">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='finalsquad'>
                {(provided)=>(
                    <div className='finalsquad' ref={provided.innerRef} {...provided.droppableProps}> 
                    <h2 className='heading2'>My Final Squad</h2>
                    {finalsquad && finalsquad.map((cricketer, index)=>(
                          <Draggable
                          key={cricketer.id}
                          draggableId={cricketer.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="cricketer-entry"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="italic-number">
                              <p>{index + 1}</p>
                                </div>
                              <button
                                className='delete-button'
                                onClick={() => onRemoveCricketer(cricketer.id)}
                              >
                                X
                              </button>
                              <CricketerCard cricketer={cricketer} onCricketerClick={() => {}} />
                            </div>
                          )}
                        </Draggable>
                    ))}
                     {provided.placeholder}
                    </div>
                )}
                </Droppable>

            </DragDropContext>
        </div>
    )
}
export default FinalSquad



```