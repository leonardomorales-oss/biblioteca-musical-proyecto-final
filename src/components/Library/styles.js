import styled from 'styled-components';

export const LibrarySection = styled.section`
  margin-top: 40px;
`;

export const RemoveButton = styled.button`
  margin-bottom: 20px;
  padding: 10px 14px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.medium};
  background-color: #c62828;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #8e0000;
  }
`;