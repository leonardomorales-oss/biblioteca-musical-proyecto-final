import styled from 'styled-components';

export const SearchForm = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.medium};
`;

export const SearchButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.medium};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;