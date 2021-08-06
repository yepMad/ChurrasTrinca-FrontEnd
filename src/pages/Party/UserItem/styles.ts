import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface CircleProps {
  itsChecked: boolean;
}

interface PriceProps {
  itsPaid: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RightContent = styled.div`
  display: flex;
  align-items: center;
`;

export const CloseButton = styled.button`
  display: flex;

  background: none;
  border: none;

  margin-right: 10px;

  svg {
    transition: color 0.2s;
    color: #ff3636;
  }

  :hover {
    svg {
      color: ${shade(0.5, '#ff3636')};
    }
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  align-items: center;

  margin-right: 18px;
  margin-left: 5px;
`;

export const Circle = styled.button<CircleProps>`
  width: 25px;
  height: 25px;

  border-radius: 50px;
  background-color: #ffd836;
  border: 3px solid #ffd836;

  ${({ itsChecked }) =>
    !itsChecked &&
    css`
      background-color: #fff;
      border-color: #998220;
    `}
`;

export const UserNameText = styled.p`
  font-weight: bold;
  font-size: 21px;

  color: rgba(0, 0, 0, 0.8);
`;

export const LeftContent = styled.div`
  display: flex;
`;

export const PriceContent = styled.div<PriceProps>`
  display: flex;
  align-items: center;

  ${({ itsPaid }) =>
    itsPaid &&
    css`
      text-decoration-line: line-through;
    `}

  svg {
    margin-right: 10px;
  }

  & + & {
    margin-left: 20px;
  }
`;

export const Price = styled.p`
  font-weight: bold;
  font-size: 21px;

  color: rgba(0, 0, 0, 0.8);
`;

export const Line = styled.hr`
  display: block;
  border: 0;
  border-top: 1px solid #e5c231;
  margin: 10px 0;
  opacity: 0.5;
  padding: 0;
`;
