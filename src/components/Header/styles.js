import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.header};
  color: white;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.large};

  h1 {
    margin: 0;
  }

  p {
    margin-top: ${({ theme }) => theme.spacing.small};
  }
`;