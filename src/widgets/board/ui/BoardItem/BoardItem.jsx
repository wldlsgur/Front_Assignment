import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import * as S from './style';

const BoardItem = ({ id, content, index, error, isChecked, onCheck }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <S.Item
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          $isDragging={snapshot.isDragging}
          $invalid={id === error}
        >
          <S.CheckBox
            checked={isChecked}
            onChange={() => onCheck(id.split('_')[0], index)}
          />
          {content}
        </S.Item>
      )}
    </Draggable>
  );
};

export default BoardItem;
