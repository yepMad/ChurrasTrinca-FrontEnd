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

  @media only screen and (max-width: 460px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const HeaderDetails = styled.div`
  max-width: 400px;
`;

export const InfosContainer = styled.div`
  max-width: 100%;
`;

export const ResumeContainer = styled.div`
  max-width: 100%;
  align-self: flex-start;

  @media only screen and (max-width: 460px) {
    margin-top: 25px;
    align-self: center;

    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
  }
`;

export const DateTitle = styled.h1`
  font-weight: 800;
  font-size: 28px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 36px;
  margin-top: 8px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: rgba(0, 0, 0, 0.8);
`;

export const DescriptionText = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;

  font-weight: bold;
  font-size: 16px;
  margin-top: 8px;

  text-align: justify;

  color: rgba(0, 0, 0, 0.8);
`;

export const ObservationText = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;

  font-weight: bold;
  font-size: 16px;
  margin-top: 8px;

  text-align: justify;

  color: rgba(0, 0, 0, 0.5);
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

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UsersContainer = styled.div`
  margin-top: 50px;
`;

export const BackButtonContainer = styled.div`
  margin-top: 20px;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #000;

    svg {
      margin-right: 10px;
    }
  }
`;

export const AddUserContainer = styled.button`
  display: flex;

  margin: 0 auto;

  border: 0;
  background: none;
`;

export const AddUserText = styled.p`
  font-weight: bold;
  margin-left: 20px;
`;
