import React from 'react';
import CheckBox from '../CheckBox/CheckBox';
import * as S from './style';

const BoardHeader = ({ title, boardId, onChange }) => {
  return (
    <S.Header>
      <S.Title>{title}</S.Title>
      <S.CheckBoxGroup>
        <S.Label htmlFor={boardId}>ALL</S.Label>
        <CheckBox
          id={boardId}
          onChange={(checkState) => onChange(boardId, checkState)}
        />
      </S.CheckBoxGroup>
    </S.Header>
  );
};

export default BoardHeader;
