import styled, { css } from 'styled-components';
import { tint } from 'polished';

export const ButtonContainer = styled.div`
  position: relative;
  bottom: -20px;

  display: flex;
  flex: 1;
  justify-content: center;
`;

export const ButtonContent = styled.button`
  border: 5px solid;
  border-radius: 22px;

  width: 150px;
  height: 50px;

  color: #fafafa;
  background-color: #000;

  transition: 0.2s;

  :hover {
    cursor: auto;
    ${({ disabled }) =>
      !disabled &&
      css`
        cursor: pointer;
        background-color: ${tint(0.2, '#000')};
      `};
  }
`;
