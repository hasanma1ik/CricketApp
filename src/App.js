import React, {useState} from "react";
import CricketerList from "./cricketerlist";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SelectedCricketer from "./selectedcricketer";
import cricketerData from "./data";
import CricketerCard from "./cricketercard";
import Final11 from './final11';
import FinalSquad from "./finalsquad";
import ShareButton from './sharebutton';
import './shareImages.css';


function App() {
const [selectedCricketers, setSelectedCricketers] = useState([])
const [promptMessage, setPromptMessage] = useState(null)
const [showFinalSquad, setShowFinalSquad] = useState(false)
const[final11, setFinal11] = useState([])

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
const handleRemoveCricketer = (id, fromList) =>{
  if(fromList === 'playing11'){
  setFinal11(final11.filter((cricketer)=> cricketer.id !== id))
  } else {
    setSelectedCricketers(selectedCricketers.filter((cricketer)=> cricketer.id !== id))
  }
}

const handleClosePrompt = () =>{
  setPromptMessage(null)
}

const onDragEnd = (result, sourceList, setSourceList) =>{
  if(!result.destination) return  // Dragged outside the list

  // Reorder the selectedCricketers array based on the drag-and-drop result
const items = Array.from(sourceList)
const[reorderedItem] = items.splice(result.source.index, 1)
items.splice(result.destination.index, 0, reorderedItem)

setSourceList(items);
// Update the sourceList array with the reordered items.
}

const handleShowFinalSquad = () =>{
  // Check if at least 15 players are selected before showing the final squad
  if (selectedCricketers.length >= 15){
    setShowFinalSquad(true)
  } else {
    setPromptMessage('Please select atleast 15 players to finalize squad!')
  }
}
const handleFinal11CricketerClick = (cricketer) => {
  if(final11.length >= 11){
    setPromptMessage("You can't select more than 11 players in the Final XI")
    setTimeout(()=>{
      setPromptMessage(null)
    },3000)
  } else if(final11.some((selected)=> selected.id === cricketer.id)){
    setPromptMessage(`${cricketer.name} is already in the Final XI`)
    setTimeout(()=>{
      setPromptMessage(null)
    }, 3000)
  } else {
    setFinal11([...final11, cricketer])
  }
}

return (
  
  <div>
      {/* Fancy Navbar */}
   <nav className="navbar">
  <div className="navbar-logo">CricSquad</div>
  <div className="navbar-links">
    <a href="#">Home</a>
    <a href="#">Tests</a>
    <a href="#">ODIs</a>
    <a href="#">T20s</a>
  </div>

   </nav>


      {/* Main Content */}
  <div className="app">
    <CricketerList
      cricketers={cricketerData}
      onCricketerClick={handleCricketerClick}
    />
    

        {/* Selected Cricketers */}
    <DragDropContext onDragEnd={(result) => onDragEnd(result, selectedCricketers, setSelectedCricketers )}>
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
    onDragEnd={(result) => onDragEnd(result, selectedCricketers, setSelectedCricketers)}
    />
          </div>
        )}

      </Droppable>
    </DragDropContext>

 {/* Final 11 */}
    <DragDropContext onDragEnd={(result)=> onDragEnd(result, final11, setFinal11)}>
      <Droppable droppableId="final11">
        {(provided)=>(
          <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          {...provided.dragHandleProps}
        >
          <Final11
            final11={final11}
            onRemoveCricketer={(id) => handleRemoveCricketer(id, 'playing11')}
            onDragEnd={(result) => onDragEnd(result, final11, setFinal11)}
          />
          <ShareButton containerId="final11Dropdown" />
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

  {/* Final Squad */}
  {showFinalSquad && (
    
  <>
        <FinalSquad
        cricketers={selectedCricketers}
        onCricketerClick={handleFinal11CricketerClick}
        />
        <ShareButton containerId="finalSquadDropdown" cricketers={selectedCricketers} />
        </>
        
       )}

        {/* Display Final Squad Button */}
       <button className="final-squad-button" onClick={handleShowFinalSquad}>
        Display Final Squad
      </button>
    </div>
    </div>
  );
}
 
export default App;


  /* CricketerList component displays a list of cricketers */
    /* Droppable component defines the area where selected cricketers can be dropped */
    // ...provided props are necessary for the drag-and-drop functionality
    /* SelectedCricketer component displays the squad of selected cricketers */