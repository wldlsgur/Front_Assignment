import { useState, useCallback } from 'react';

const useDragDrop = (list) => {
  const [items, setItems] = useState(list);

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
      if (!destination) {
        return;
      }

      const newItems = reorder(items, source, destination);

      setItems(newItems);
    },
    [items]
  );

  return { items, onDragEnd };
};

export default useDragDrop;
