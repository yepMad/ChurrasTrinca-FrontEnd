import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;

  width: 100%;
  height: 192px;

  background: #f1f1f1;
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
  justify-content: space-around;
  align-items: center;

  padding: 25px 25px 30px 25px;
`;

export const Circle = styled.div`
  background-color: #ffd836;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 90px;
  height: 90px;

  border-radius: 50px;
`;

export const Text = styled.p`
  font-weight: bold;
  font-size: 21px;
`;
