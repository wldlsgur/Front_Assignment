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

  const toggleChecked = useCallback(
    (key, index) => {
      const result = JSON.parse(JSON.stringify(items));
      const toggleIsChecked = !result[key][index].isChecked;

      result[key][index].isChecked = toggleIsChecked;

      setItems(result);
    },
    [items]
  );

  const onDragStart = useCallback(
    ({ source }) => {
      const { droppableId, index: droppableIndex } = source;
      const isChecked = items[droppableId][droppableIndex].isChecked;

      if (isChecked) {
        return;
      }

      const result = JSON.parse(JSON.stringify(items));

      for (let key in result) {
        result[key] = result[key].map((value, index) =>
          key === droppableId && droppableIndex === index
            ? { ...value, isChecked: true }
            : { ...value, isChecked: false }
        );
      }

      setItems(result);
    },
    [items]
  );

  const onDragEnd = useCallback(
    ({ destination, source }) => {
      if (!destination || error) {
        return setError(null);
      }

      const newItems = reorder(items, source, destination);

      setItems(newItems);
    },
    [error, items]
  );

  const onDragUpdate = useCallback(({ destination, source }) => {
    if (!destination || !source) {
      return setError(null);
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

  return {
    error,
    items,
    onDragStart,
    onDragEnd,
    onDragUpdate,
    toggleChecked,
  };
};

export default useDragDrop;
