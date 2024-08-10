import styled from 'styled-components';

export const Button = styled.button.attrs(() => ({
  type: 'button',
}))`
  position: fixed;
  font-weight: 700;
  bottom: 5rem;
  right: 5rem;
  padding: 2rem;
  background-color: inherit;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  color: ${({ theme }) => theme.colors.primary};
  border-color: ${({ theme }) => theme.colors.primary};

  &:hover {
    transform: scale(1.3);
  }
`;
