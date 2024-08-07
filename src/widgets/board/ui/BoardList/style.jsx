import styled from 'styled-components';

export const List = styled.ul`
  width: 25rem;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 1rem;
  border-radius: 1rem;
  color: white;
  background-color: ${({ $isDraggingOver }) =>
    $isDraggingOver ? 'lightblue' : '#e3f2fd'};
`;
