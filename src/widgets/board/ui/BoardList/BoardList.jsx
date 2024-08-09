import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import BoardItem from '../BoardItem/BoardItem';
import * as S from './style';

const BoardList = ({ items, id, errorItems, onChange }) => {
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
              boardId={id}
              id={`${id}_${index}`}
              content={`${id}_${item.content}`}
              checked={item.isChecked}
              index={index}
              errorItems={errorItems}
              onChange={onChange}
            />
          ))}
          {placeholder}
        </S.List>
      )}
    </Droppable>
  );
};

export default BoardList;
