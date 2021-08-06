import styled, { css } from 'styled-components';

interface CircleProps {
  itsChecked: boolean;
}

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RightContent = styled.div`
  display: flex;
`;

export const Circle = styled.button<CircleProps>`
  width: 25px;
  height: 25px;

  border-radius: 50px;
  background-color: #ffd836;
  border: 3px solid #ffd836;

  margin-right: 18px;

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

export const PriceContent = styled.div`
  display: flex;
  align-items: center;

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
