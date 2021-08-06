import styled from 'styled-components';
import { Form } from '@unform/web';

import backgroundPattern from '../../assets/background-pattern.svg';

export const Container = styled.main`
  min-height: 100vh;

  display: flex;
  align-items: stretch;

  background: rgb(255, 216, 54);

  ::before {
    position: absolute;
    content: ' ';

    width: 100%;
    height: 100%;
    max-height: 320px;

    background: linear-gradient(
        rgba(255, 255, 255, 0) 70%,
        rgba(255, 216, 54, 1)
      ),
      url(${backgroundPattern}) repeat-x top;
  }
`;

export const Content = styled.div`
  max-width: 960px;
  margin: 0 auto;

  padding: 20px;

  display: flex;
  flex: 1;
  flex-direction: column;

  justify-content: space-around;
  align-items: center;

  z-index: 1;
`;

export const TitleContainer = styled.div`
  font-weight: 800;
  font-size: 32px;
  text-align: center;

  margin-top: 20px;
`;

export const InputsContainer = styled(Form)`
  display: flex;
  flex-direction: column;

  justify-content: space-around;
  align-items: center;

  width: 100%;
  max-width: 280px;

  margin-top: 50px;
  margin-bottom: 50px;
`;

export const InputBox = styled.div`
  width: 100%;

  & + & {
    margin-top: 36px;
  }
`;

export const InputLabel = styled.div`
  font-size: 21px;
  font-weight: bold;

  margin-bottom: 15px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 50px;
`;
