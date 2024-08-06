import React from 'react';
import BoardList from '../BoardList';
import * as S from './style';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDragDrop } from '../../hooks';
import { getItems } from '@/entities/board';

const BoardContainer = () => {
  const { items, onDragEnd } = useDragDrop({
    board1: getItems(10),
    board2: getItems(10),
    board3: getItems(10),
    board4: getItems(10),
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <S.Container>
        <BoardList id="board1" items={items.board1} />
        <BoardList id="board2" items={items.board2} />
        <BoardList id="board3" items={items.board3} />
        <BoardList id="board4" items={items.board4} />
      </S.Container>
    </DragDropContext>
  );
};

export default BoardContainer;
