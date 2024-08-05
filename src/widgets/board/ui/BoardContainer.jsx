import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import BoardList from './BoardList';
import { useDragDrop } from '../hooks';
import { getItems } from '@/entities/board';

const BoardContainer = () => {
  const { items, onDragEnd } = useDragDrop(getItems(10));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardList id="droppable" items={items} />
    </DragDropContext>
  );
};

export default BoardContainer;
