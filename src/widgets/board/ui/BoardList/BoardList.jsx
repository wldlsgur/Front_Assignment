import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import BoardItem from '../BoardItem/BoardItem';
import * as S from './style';

const BoardList = ({ items, id, error }) => {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <S.List
          {...provided.droppableProps}
          ref={provided.innerRef}
          $isDraggingOver={snapshot.isDraggingOver}
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
        </S.List>
      )}
    </Droppable>
  );
};

export default BoardList;
