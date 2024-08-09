import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import * as S from './style';

const BoardItem = ({
  id,
  boardKey,
  content,
  index,
  errorItems,
  isChecked,
  onCheck,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onCheck(boardKey, index);
    }
  };

  return (
    <Draggable draggableId={id} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
        <S.Item
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
          onClick={() => onCheck(boardKey, index)}
          onKeyDown={handleKeyDown}
          $isDragging={isDragging || isChecked}
          $invalid={errorItems.includes(id)}
        >
          <S.CheckBox
            checked={isChecked}
            onChange={() => onCheck(boardKey, index)}
          />
          {content}
        </S.Item>
      )}
    </Draggable>
  );
};

export default BoardItem;
