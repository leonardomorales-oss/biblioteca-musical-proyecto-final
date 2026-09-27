import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ResultsSection = styled.section`
  margin-bottom: 40px;
`;

export const ResultItem = styled.div`
  margin-bottom: 25px;
`;

export const DetailLink = styled(Link)`
  display: inline-block;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;