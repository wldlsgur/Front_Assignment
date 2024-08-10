import styled from 'styled-components';

export const List = styled.ul`
  width: 25rem;
  height: 63rem;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 1rem;
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ $isDraggingOver, theme }) =>
    $isDraggingOver
      ? theme.colors.background_100
      : theme.colors.background_200};

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  scrollbar-color: transparent transparent;
  -ms-overflow-style: none;
`;
