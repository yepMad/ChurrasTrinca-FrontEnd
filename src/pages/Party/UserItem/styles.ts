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

  @media only screen and (max-width: 460px) {
    justify-content: center;

    flex-direction: column;
  }
`;

export const RightContent = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 460px) {
    margin-bottom: 10px;
  }
`;

export const EditButton = styled.button`
  display: flex;

  background: none;
  border: none;

  margin-right: 10px;

  svg {
    transition: color 0.2s;
    color: #969675;
  }

  :hover {
    svg {
      color: ${shade(0.5, '#969675')};
    }
  }
`;

export const DeleteButton = styled.button`
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

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: rgba(0, 0, 0, 0.8);
`;

export const LeftContent = styled.div`
  display: flex;

  @media only screen and (max-width: 635px) {
    align-items: flex-end;
    flex-direction: column;
  }

  @media only screen and (max-width: 460px) {
    align-items: flex-start;
    flex-direction: column;
  }
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
    @media only screen and (min-width: 460px) {
      margin-left: 20px;
    }
  }

  @media only screen and (max-width: 460px) {
    max-width: 100%;
  }
`;

export const Price = styled.p`
  font-weight: bold;
  font-size: 21px;

  color: rgba(0, 0, 0, 0.8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Line = styled.hr`
  display: block;
  border: 0;
  border-top: 1px solid #e5c231;
  margin: 10px 0;
  opacity: 0.5;
  padding: 0;
`;
