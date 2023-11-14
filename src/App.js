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
          <div className="final-squad">
            <h2 className='heading2'>Final Squad</h2>
            {selectedCricketers.map((cricketer, index) => (
        <div key={cricketer.id} className="final-squad-entry">
          <div className="italic-number">
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


  /* CricketerList component displays a list of cricketers */
    /* Droppable component defines the area where selected cricketers can be dropped */
    // ...provided props are necessary for the drag-and-drop functionality
    /* SelectedCricketer component displays the squad of selected cricketers */