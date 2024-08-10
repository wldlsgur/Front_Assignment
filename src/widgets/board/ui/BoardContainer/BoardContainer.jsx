import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { BoardHeader, BoardList, InitButton } from '..';
import * as S from './style';
import { useDragDrop } from '../../hooks';
import { getItems } from '@/entities/board';

const BoardContainer = () => {
  const {
    errorItems,
    value,
    onDragStart,
    onDragEnd,
    onDragUpdate,
    toggleCheck,
    changeAllCheck,
    removeItem,
  } = useDragDrop({
    board1: getItems(10),
    board2: getItems(10),
    board3: getItems(10),
    board4: getItems(10),
  });

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragUpdate={onDragUpdate}
    >
      <S.Container>
        {Object.entries(value).map(([id, itemsList]) => (
          <S.Board key={id}>
            <BoardHeader
              title={id}
              boardId={id}
              onChange={changeAllCheck}
            />
            <BoardList
              id={id}
              items={itemsList}
              errorItems={errorItems}
              onChange={toggleCheck}
            />
          </S.Board>
        ))}
        <InitButton onClick={removeItem} />
      </S.Container>
    </DragDropContext>
  );
};

export default BoardContainer;
