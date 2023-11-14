
// wraps up entire draggable/droppable area, provides context for dnd functionality
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; 
import CricketerCard from './cricketercard';

// The onDragEnd prop is a function that will be called when a drag-and-drop operation is completed.
function SelectedCricketer({ selectedCricketers, onRemoveCricketer, onDragEnd }) {
  return (
    <div className="selected-cricketer-dropdown ">
    <DragDropContext onDragEnd={onDragEnd}> 
      <Droppable droppableId="selectedCricketers">
        {(provided) => (
          <div className='selected-cricketer' ref={provided.innerRef} {...provided.droppableProps}
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
  );
}

export default SelectedCricketer;




// This component defines a droppable area, where draggable items (in this case, cricketers) can be dropped.
// The droppableId is a unique identifier for this droppable area.

//{(provided) => (
//This is a render prop, and it provides an object (provided) with props and methods necessary for the drag-and-drop functionality.


// we've set the onCricketerClick prop of the CricketerCard component to an empty function () => {}, which effectively makes the cards non-clickable in the SelectedCricketer section.