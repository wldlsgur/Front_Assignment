import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import BoardItem from '../BoardItem/BoardItem';

const GRID = 8;

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: GRID,
  width: 250,
});

const BoardList = ({ items, id, error }) => {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <ul
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {items.map((item, index) => (
            <BoardItem
              key={`${id}_${index}`}
              id={`${id}_${index}`}
              content={item.content}
              index={index}
              error={error}
            />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default BoardList;
