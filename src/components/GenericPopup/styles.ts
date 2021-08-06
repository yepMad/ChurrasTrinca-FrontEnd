import styled from 'styled-components';

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
