import styled from 'styled-components';

export const ListContainer = styled.div`
  display: grid;
  justify-items: center;

  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 24px;

  @media only screen and (max-width: 365px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 50px;
`;
