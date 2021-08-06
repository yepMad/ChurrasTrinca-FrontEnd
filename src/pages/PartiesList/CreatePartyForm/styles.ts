import styled from 'styled-components';
import { Form } from '@unform/web';
import { tint } from 'polished';

export const Container = styled.div`
  z-index: 4;

  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex: 1;

  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
`;

export const Panel = styled.div`
  width: 90%;
  max-width: 400px;

  padding: 30px 20px 0px 20px;

  margin: 0;
  position: absolute;

  top: 50%;
  left: 50%;

  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  background: #fafafa;
`;

export const Text = styled.h1`
  font-weight: 800;
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;

  color: #000000;
`;

export const InputsContainer = styled(Form)``;

export const InputBox = styled.div`
  & + & {
    margin-top: 10px;
  }
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

  color: #fafafa;
  background-color: #000;

  transition: 0.2s;

  :hover {
    background-color: ${tint(0.2, '#000')};
  }
`;
