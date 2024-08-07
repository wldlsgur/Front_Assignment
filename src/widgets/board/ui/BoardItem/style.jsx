import styled from 'styled-components';

export const Item = styled.li`
  user-select: none;
  padding: 1.6rem;
  border-radius: 1rem;
  background-color: ${({ $isDragging, $invalid }) =>
    $invalid ? 'red' : $isDragging ? 'lightgreen' : '#0d47a1'};
  transition: transform 0.5s ease;
`;
