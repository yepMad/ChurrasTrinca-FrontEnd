import styled from 'styled-components';
import { ReactComponent as Trinca } from '../../assets/trinca-icon.svg';

export const Container = styled.div`
  display: flex;
  flex: 1;

  flex-direction: row;
  justify-content: center;
  align-items: flex-end;

  margin-bottom: 30px;
`;

export const TrincaIcon = styled(Trinca)``;
