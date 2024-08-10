import React from 'react';
import * as S from './style';

const InitButton = ({ onClick }) => {
  return <S.Button onClick={onClick}>Reset</S.Button>;
};

export default InitButton;
