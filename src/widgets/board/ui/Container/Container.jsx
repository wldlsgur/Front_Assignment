import React from 'react';
import BoardList from '../BoardList';
import * as S from './style';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDragDrop } from '../../hooks';
import { getItems } from '@/entities/board';

const BoardContainer = () => {
  const { error, items, onDragEnd, onDragUpdate } = useDragDrop({
    board1: getItems(10),
    board2: getItems(10),
    board3: getItems(10),
    board4: getItems(10),
  });

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
      <S.Container>
        {Object.entries(items).map(([id, itemsList]) => (
          <BoardList key={id} id={id} items={itemsList} error={error} />
        ))}
      </S.Container>
    </DragDropContext>
  );
};

export default BoardContainer;
