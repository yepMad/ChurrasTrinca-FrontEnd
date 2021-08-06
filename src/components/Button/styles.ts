import styled, { css } from 'styled-components';
import { tint } from 'polished';

interface ContainerProps {
  isActive: boolean;
}

export const Container = styled.button<ContainerProps>`
  background: ${({ isActive }) => (isActive ? '#000000' : '#333333')};
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.06);

  border: 0;
  border-radius: 18px;

  width: 100%;
  height: 50px;

  padding: 0 16px;
  margin-top: 16px;

  font-weight: bold;
  font-size: 18px;
  color: #fff;

  transition: background-color 0.25s;

  &:hover {
    ${({ isActive }) =>
      !isActive &&
      css`
        cursor: auto;
      `}

    background: ${({ isActive }) =>
      isActive ? tint(0.2, '#000000') : '#333333'};
  }
`;
