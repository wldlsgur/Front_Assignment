import { useState, useCallback } from 'react';

const useDragDrop = (list) => {
  const [items, setItems] = useState(list);
  const [errorItems, setErrorItems] = useState([]);

  const initIsCheck = (list) => {
    const result = JSON.parse(JSON.stringify(list));

    for (let key in result) {
      result[key] = result[key].map((value) => ({
        ...value,
        isChecked: false,
      }));
    }

    return result;
  };

  const reorder = (list, sourceId, destinationId) => {
    const result = JSON.parse(JSON.stringify(list));
    const firstAppendItems = [];
    const afterAppendItems = [];

    for (let key in result) {
      result[key] = result[key].filter((value) => {
        const { isChecked } = value;

        if (key === sourceId) {
          if (isChecked) {
            firstAppendItems.push(value);
            return false;
          }

          return true;
        }

        if (isChecked) {
          afterAppendItems.push(value);
          return false;
        }

        return true;
      });
    }

    result[destinationId].unshift(...firstAppendItems, ...afterAppendItems);

    return result;
  };

  const toggleChecked = useCallback(
    (key, index) => {
      const result = JSON.parse(JSON.stringify(items));
      const toggledIsChecked = !result[key][index].isChecked;

      result[key][index].isChecked = toggledIsChecked;

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
      if (!destination || errorItems.length) {
        return setErrorItems([]);
      }

      const sourceId = source.droppableId;
      const destinationId = destination.droppableId;

      const newItems = reorder(items, sourceId, destinationId);
      const result = initIsCheck(newItems);

      setItems(result);
    },
    [errorItems, items]
  );

  const onDragUpdate = useCallback(
    ({ destination, source }) => {
      if (!destination || !source) {
        return setErrorItems([]);
      }

      const sourceId = source.droppableId;
      const sourceIndex = source.index;
      const destinationId = destination.droppableId;
      const destinationIndex = destination.index;

      if (destinationId === 'board3') {
        const newErrorItems = [];

        items.board1.forEach(
          ({ isChecked }, index) =>
            isChecked && newErrorItems.push(`board1_${index}`)
        );

        return setErrorItems(newErrorItems);
      }

      // if ((sourceIndex + 1) % 2 === 0 && (destinationIndex + 1) % 2 === 0) {
      //   return setError(`${sourceId}_${sourceIndex}`);
      // }

      setErrorItems([]);
    },
    [items]
  );

  return {
    errorItems,
    items,
    onDragStart,
    onDragEnd,
    onDragUpdate,
    toggleChecked,
  };
};

export default useDragDrop;
