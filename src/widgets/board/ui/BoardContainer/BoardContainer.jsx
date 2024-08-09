import React from 'react';
import BoardList from '../BoardList/BoardList';
import * as S from './style';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDragDrop } from '../../hooks';
import { getItems } from '@/entities/board';

const BoardContainer = () => {
  const {
    errorItems,
    items,
    onDragStart,
    onDragEnd,
    onDragUpdate,
    toggleChecked,
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
          <BoardList
            key={id}
            id={id}
            items={itemsList}
            errorItems={errorItems}
            onCheck={toggleChecked}
          />
        ))}
      </S.Container>
    </DragDropContext>
  );
};

export default BoardContainer;
