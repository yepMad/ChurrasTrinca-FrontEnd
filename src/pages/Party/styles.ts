import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex: 1;

  flex-direction: column;

  background: #ffffff;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.06);
  border-radius: 2px;

  padding: 24px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex: 1;

  justify-content: space-between;
  align-items: center;
`;

export const InfosContainer = styled.div``;

export const ResumeContainer = styled.div``;

export const DateTitle = styled.h1`
  font-weight: 800;
  font-size: 28px;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 36px;
  margin-top: 8px;

  color: rgba(0, 0, 0, 0.8);
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;

  svg + p {
    margin-left: 10px;
  }

  & + & {
    margin-top: 8px;
  }
`;

export const InfoText = styled.p`
  font-weight: 500;
  font-size: 21px;
`;

export const UsersContainer = styled.div`
  margin-top: 50px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;
