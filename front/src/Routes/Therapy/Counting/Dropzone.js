import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const Dropzone = ({ isDropDisabled, id }) => (
    <div className="column col-4">
        <div className="divider" data-content={id.toUpperCase()} />
        <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
            {provided => {
                return (
                    <div ref={provided.innerRef}></div>
                );
            }}
        </Droppable>
    </div>
);

export default Dropzone;
