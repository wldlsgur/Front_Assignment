import React from 'react';
import BoardList from '../BoardList/BoardList';
import * as S from './style';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDragDrop } from '../../hooks';
import { getItems } from '@/entities/board';
import BoardHeader from '../BoardHeader/BoardHeader';

const BoardContainer = () => {
  const {
    errorItems,
    items,
    onDragStart,
    onDragEnd,
    onDragUpdate,
    toggleChecked,
    changeAllCheck,
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
        {Object.entries(items).map(([id, itemsList]) => (
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
              onChange={toggleChecked}
            />
          </S.Board>
        ))}
      </S.Container>
    </DragDropContext>
  );
};

export default BoardContainer;
