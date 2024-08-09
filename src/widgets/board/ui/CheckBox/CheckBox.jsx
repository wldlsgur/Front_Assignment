import React from 'react';
import * as S from './style';
import { useToggle } from '../../hooks';

const CheckBox = ({ id, checked, onChange, ...rest }) => {
  const { state, handleToggle } = useToggle(checked);

  const handleOnChange = () => {
    handleToggle();
    onChange && onChange(!state);
  };

  return (
    <S.CheckBox
      id={id}
      checked={state}
      onChange={handleOnChange}
      {...rest}
    />
  );
};

export default CheckBox;
