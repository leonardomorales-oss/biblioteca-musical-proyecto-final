import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const DetailContainer = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 25px;
  border-radius: ${({ theme }) => theme.radius.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  font-weight: bold;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;