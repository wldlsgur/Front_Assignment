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
      result[key] = result[key].filter((value, index) => {
        const { isChecked } = value;
        const isError = errorItems.includes(`${key}_${index}`);

        if (key === sourceId) {
          if (isChecked && !isError) {
            firstAppendItems.push(value);
            return false;
          }

          return true;
        }

        if (isChecked && !isError) {
          afterAppendItems.push(value);
          return false;
        }

        return true;
      });
    }

    result[destinationId].unshift(...firstAppendItems, ...afterAppendItems);

    return result;
  };

  const changeAllCheck = useCallback((boardId, checkState) => {
    setItems((prev) => {
      if (!prev[boardId]) {
        return prev;
      }

      const updatedItems = prev[boardId].map((item) => ({
        ...item,
        isChecked: checkState,
      }));

      return {
        ...prev,
        [boardId]: updatedItems,
      };
    });
  }, []);

  const toggleChecked = useCallback(
    (boardId, index) => {
      const result = JSON.parse(JSON.stringify(items));
      const toggledIsChecked = !result[boardId][index].isChecked;

      result[boardId][index].isChecked = toggledIsChecked;

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
      if (!destination) {
        return setErrorItems([]);
      }

      const sourceId = source.droppableId;
      const destinationId = destination.droppableId;

      const newItems = reorder(items, sourceId, destinationId);
      const result = initIsCheck(newItems);

      setItems(result);
      setErrorItems([]);
    },
    [items, errorItems]
  );

  const onDragUpdate = useCallback(
    ({ destination, source }) => {
      if (!destination || !source) {
        return setErrorItems([]);
      }
      setErrorItems([]);

      const { droppableId, index } = destination;

      if (droppableId === 'board3') {
        const newErrorItems = [];

        items.board1.forEach(
          ({ isChecked }, index) =>
            isChecked && newErrorItems.push(`board1_${index}`)
        );

        setErrorItems((prev) => [...prev, ...newErrorItems]);
      }

      if ((index + 1) % 2 === 0) {
        const newErrorItems = [];

        for (let key in items) {
          items[key].forEach(({ isChecked }, index) => {
            if ((index + 1) % 2 === 0 && isChecked) {
              newErrorItems.push(`${key}_${index}`);
            }
          });
        }

        setErrorItems((prev) => [...prev, ...newErrorItems]);
      }
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
    changeAllCheck,
  };
};

export default useDragDrop;
