import { useState, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

const useDragDrop = (list) => {
  const { value, setItem, removeItem } = useLocalStorage({
    key: 'boardItems',
    defaultValue: list,
    onError: () => alert('스토리지 저장 실패'),
  });
  const [errorItems, setErrorItems] = useState([]);

  const initIsCheck = (list) => {
    const result = {};

    for (let key in list) {
      result[key] = list[key].map((value) => ({
        ...value,
        isChecked: false,
      }));
    }

    return result;
  };

  const reorder = (list, sourceId, destinationId) => {
    const result = { ...list };
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

  const changeAllCheck = useCallback(
    (boardId, checkState) => {
      if (!value[boardId]) {
        return value;
      }

      const updatedItems = value[boardId].map((item) => ({
        ...item,
        isChecked: checkState,
      }));

      setItem({ ...value, [boardId]: updatedItems });
    },
    [value]
  );

  const toggleCheck = useCallback(
    (boardId, index) => {
      const toggledIsChecked = !value[boardId][index].isChecked;
      const updatedBoard = value[boardId].map((item, i) =>
        i === index ? { ...item, isChecked: toggledIsChecked } : item
      );

      setItem({ ...value, [boardId]: updatedBoard });
    },
    [value]
  );

  const onDragStart = useCallback(
    ({ source }) => {
      const { droppableId, index: droppableIndex } = source;
      const isChecked = value[droppableId][droppableIndex].isChecked;

      if (isChecked) {
        return;
      }

      const result = { ...value };

      for (let key in result) {
        result[key] = result[key].map((value, index) =>
          key === droppableId && droppableIndex === index
            ? { ...value, isChecked: true }
            : { ...value, isChecked: false }
        );
      }

      setItem(result);
    },
    [value]
  );

  const onDragEnd = useCallback(
    ({ destination, source }) => {
      if (!destination) {
        return setErrorItems([]);
      }

      const sourceId = source.droppableId;
      const destinationId = destination.droppableId;

      const newItems = reorder(value, sourceId, destinationId);
      const result = initIsCheck(newItems);

      setItem(result);
      setErrorItems([]);
    },
    [value, errorItems]
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

        value.board1.forEach(
          ({ isChecked }, index) =>
            isChecked && newErrorItems.push(`board1_${index}`)
        );

        setErrorItems((prev) => [...prev, ...newErrorItems]);
      }

      if ((index + 1) % 2 === 0) {
        const newErrorItems = [];

        for (let key in value) {
          value[key].forEach(({ isChecked }, index) => {
            if ((index + 1) % 2 === 0 && isChecked) {
              newErrorItems.push(`${key}_${index}`);
            }
          });
        }

        setErrorItems((prev) => [...prev, ...newErrorItems]);
      }
    },
    [value]
  );

  return {
    errorItems,
    value,
    onDragStart,
    onDragEnd,
    onDragUpdate,
    toggleCheck,
    changeAllCheck,
  };
};

export default useDragDrop;
