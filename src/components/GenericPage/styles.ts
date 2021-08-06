import styled from 'styled-components';

import backgroundPattern from '../../assets/background-pattern.svg';

export const Container = styled.main`
  min-height: 100vh;

  display: flex;

  flex: 1;
  flex-direction: column;

  background: #fafafa;
`;

export const Content = styled.div`
  transform: translate(0px, -40px);

  width: 100%;
  max-width: 960px;

  margin: 0 auto;
  padding: 0px 24px 0px 24px;
`;

export const Header = styled.div`
  color: #000;

  font-size: 32px;
  font-weight: 800;

  display: flex;
  height: 205px;

  justify-content: center;
  align-items: center;
  text-align: center;

  background: rgba(255, 216, 54, 1) url(${backgroundPattern}) repeat-x top;
`;
