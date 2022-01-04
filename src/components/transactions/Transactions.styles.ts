import styled from 'styled-components';
import eyesCursor from '../../assets/eyes-cursor.svg';

export const StyledTransactionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: url(${eyesCursor}) 5 12, auto;
`;

export const StyleTransactionsTable = styled.table`
  margin-left: 73px;
  margin-right: 15px;
  margin-bottom: 2px;
`;
