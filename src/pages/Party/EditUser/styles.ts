import styled from 'styled-components';
import { Form } from '@unform/web';

export const EditFormContent = styled(Form)``;

export const EditTitle = styled.h1`
  text-align: center;

  font-weight: bold;
  font-size: 21px;

  margin-bottom: 30px;
`;

export const EditInputBox = styled.div`
  width: 100%;

  & + & {
    margin-top: 36px;
  }
`;

export const EditInputLabel = styled.div`
  font-size: 18px;
  font-weight: bold;

  margin-bottom: 15px;
`;
