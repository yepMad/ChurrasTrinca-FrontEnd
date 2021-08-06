import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  haveError: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #ffffff;
  border-radius: 5px;

  width: 100%;

  color: #666360;
  border: 2px solid #ffffff;

  display: flex;
  align-items: center;

  transition: color 0.2s;
  transition: border-color 0.2s;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    height: 50px;

    font-size: 18px;

    padding-left: 20px;
    padding-right: 20px;

    background: transparent;
    border: 0;

    color: #000;

    &::placeholder {
      color: rgba(0, 0, 0, 0.8);
      font-style: italic;
    }
  }

  svg {
    margin-right: 16px;
  }

  ${props =>
    props.haveError &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #707070;
      border-color: #707070;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #707070;
      border-color: #707070;
    `}
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
