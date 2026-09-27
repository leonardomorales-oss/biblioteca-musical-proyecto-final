import styled from 'styled-components';

export const SongContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.large};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.radius.medium};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  h3 {
    margin-top: 0;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const AddButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.small};
  padding: 10px 14px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.medium};
  cursor: pointer;

  background-color: ${({ $added, theme }) =>
    $added ? '#2e7d32' : theme.colors.primary};

  color: white;

  &:hover {
    background-color: ${({ $added, theme }) =>
      $added ? '#1b5e20' : theme.colors.primaryHover};
  }
`;