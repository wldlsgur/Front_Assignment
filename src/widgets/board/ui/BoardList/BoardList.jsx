import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import BoardItem from '../BoardItem/BoardItem';
import * as S from './style';

const BoardList = ({ items, id, error, onCheck }) => {
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
              content={`${id}_${item.content}`}
              isChecked={item.isChecked}
              index={index}
              error={error}
              onCheck={onCheck}
            />
          ))}
          {provided.placeholder}
        </S.List>
      )}
    </Droppable>
  );
};

export default BoardList;
