import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import * as S from './style';

const BoardItem = ({ id, content, index, error }) => {
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
          {content}
        </S.Item>
      )}
    </Draggable>
  );
};

export default BoardItem;
