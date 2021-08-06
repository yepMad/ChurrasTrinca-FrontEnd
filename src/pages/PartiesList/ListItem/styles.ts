import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;

  width: 100%;
  height: 192px;

  background: #ffffff;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.06);
  border-radius: 2px;

  transition: transform 0.2s;

  :hover {
    transform: translateY(-10px);
    cursor: pointer;
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;

  flex-direction: column;
  justify-content: space-between;

  padding: 25px 25px 30px 25px;
`;

export const TopContainer = styled.div``;

export const BottomContainer = styled.div`
  display: flex;

  justify-content: space-between;
`;

export const DateTitle = styled.h1`
  font-weight: 800;
  font-size: 28px;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 21px;

  color: rgba(0, 0, 0, 0.8);
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;

  svg + p {
    margin-left: 10px;
  }
`;

export const InfoText = styled.p`
  font-weight: 500;
  font-size: 21px;
`;
