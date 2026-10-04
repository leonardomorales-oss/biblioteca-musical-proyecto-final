import styled from 'styled-components';

export const AppContainer = styled.div`
  min-height: 100vh;
`;

export const Content = styled.main`
  width: min(100% - 32px, 1000px);
  margin: 0 auto;
  padding: 32px 0;

  @media (max-width: 600px) {
    width: min(100% - 20px, 1000px);
    padding: 20px 0;
  }
`;