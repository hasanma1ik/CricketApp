import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; 
import CricketerCard from './cricketercard';

function Final11 ({ final11, onRemoveCricketer, onDragEnd}) {
    return(
        <div className='final11-dropdown'>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='final11'>
                {(provided)=>(
                    <div className='final11' ref={provided.innerRef} {...provided.droppableProps}> 
                    <h2 className='heading2'>My Playing XI</h2>
                    {final11 && final11.map((cricketer, index)=>(
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
export default Final11