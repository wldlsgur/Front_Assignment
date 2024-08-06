import { useState, useCallback } from 'react';

const useDragDrop = (list) => {
  const [items, setItems] = useState(list);
  const [error, setError] = useState(null);

  const reorder = (list, source, destination) => {
    const result = JSON.parse(JSON.stringify(list));
    const sourceItems = result[source.droppableId];
    const destinationItems = result[destination.droppableId];

    const [removed] = sourceItems.splice(source.index, 1);
    destinationItems.splice(destination.index, 0, removed);

    return result;
  };

  const onDragEnd = useCallback(
    ({ destination, source }) => {
      if (!destination || error) {
        return;
      }

      const newItems = reorder(items, source, destination);

      setItems(newItems);
    },
    [error, items]
  );

  const onDragUpdate = useCallback(({ destination, source }) => {
    if (!destination || !source) {
      return;
    }

    if (
      destination.droppableId === 'board3' &&
      source.droppableId === 'board1'
    ) {
      return setError(`${source.droppableId}_${source.index}`);
    }

    if ((source.index + 1) % 2 === 0 && (destination.index + 1) % 2 === 0) {
      return setError(`${source.droppableId}_${source.index}`);
    }

    setError(null);
  }, []);

  return { error, items, onDragEnd, onDragUpdate };
};

export default useDragDrop;
