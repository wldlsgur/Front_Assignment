import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import BoardItem from '../BoardItem/BoardItem';
import * as S from './style';

const BoardList = ({ items, id, errorItems, onCheck }) => {
  return (
    <Droppable droppableId={id}>
      {({ droppableProps, innerRef, placeholder }, { isDraggingOver }) => (
        <S.List
          {...droppableProps}
          ref={innerRef}
          $isDraggingOver={isDraggingOver}
        >
          {items.map((item, index) => (
            <BoardItem
              key={`${id}_${index}`}
              boardKey={id}
              id={`${id}_${index}`}
              content={`${id}_${item.content}`}
              isChecked={item.isChecked}
              index={index}
              errorItems={errorItems}
              onCheck={onCheck}
            />
          ))}
          {placeholder}
        </S.List>
      )}
    </Droppable>
  );
};

export default BoardList;
