import styled from 'styled-components';

export const Item = styled.li.attrs(() => ({
  role: 'button',
  tabIndex: 1,
}))`
  display: flex;
  align-items: center;
  gap: 1rem;
  user-select: none;
  padding: 1.6rem;
  border-radius: 1rem;
  background-color: ${({ $isDragging, $invalid, theme }) =>
    $invalid
      ? theme.colors.warning
      : $isDragging
      ? theme.colors.success
      : theme.colors.primary};
  transition: transform 0.5s ease;
`;
