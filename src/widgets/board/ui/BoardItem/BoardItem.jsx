import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CheckBox from '../CheckBox/CheckBox';
import * as S from './style';

const BoardItem = ({
  id,
  boardId,
  content,
  index,
  errorItems,
  checked,
  onChange,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onChange(boardId, index);
    }
  };

  return (
    <Draggable
      draggableId={id}
      index={index}
    >
      {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
        <S.Item
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
          onClick={() => onChange(boardId, index)}
          onKeyDown={handleKeyDown}
          $isDragging={isDragging || checked}
          $invalid={errorItems.includes(id)}
        >
          <CheckBox
            key={checked}
            checked={checked}
            onChange={() => onChange(boardId, index)}
          />
          {content}
        </S.Item>
      )}
    </Draggable>
  );
};

export default BoardItem;
