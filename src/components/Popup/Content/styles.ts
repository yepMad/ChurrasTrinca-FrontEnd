import styled from 'styled-components';
import { tint } from 'polished';
import { animated } from 'react-spring';

export const Container = styled(animated.div)`
  z-index: 5;

  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex: 1;

  background-color: rgba(0, 0, 0, 0.5);
`;

export const Panel = styled.div`
  width: 90%;
  max-width: 300px;

  margin: 0;
  position: absolute;

  top: 50%;
  left: 50%;

  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  background-color: #fff;
`;

export const CharContainer = styled.div`
  position: relative;

  display: flex;
  flex: 1;
  justify-content: center;

  height: 125px;
  top: -35px;
`;

export const TextContainer = styled.div`
  position: relative;
  padding: 8px 20px 20px 20px;
  margin: 0 auto;
  margin-bottom: 8px;

  max-width: 250px;
  max-height: 192px;
  overflow: auto;
`;

export const Text = styled.div`
  color: #222222;

  text-align: center;
  font-size: 16px;

  white-space: pre-line;
`;

export const ButtonContainer = styled.div`
  position: relative;
  bottom: -20px;

  display: flex;
  flex: 1;
  justify-content: center;
`;

export const Button = styled.button`
  border: 5px solid;
  border-radius: 22px;

  width: 150px;
  height: 50px;

  color: #fff;
  background-color: #000;

  transition: 0.2s;

  :hover {
    background-color: ${tint(0.2, '#000')};
  }
`;
