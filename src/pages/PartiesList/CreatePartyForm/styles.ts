import styled from 'styled-components';
import { Form } from '@unform/web';

export const Text = styled.h1`
  font-weight: 800;
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;

  color: #000000;
`;

export const InputsContainer = styled(Form)``;

export const InputBox = styled.div`
  & + & {
    margin-top: 10px;
  }
`;
