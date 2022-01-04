import styled from 'styled-components';
import eyesCursor from '../../../assets/eyes-cursor.svg';
import { StyleConstants } from '../../../shared/utils/constants';

export const StyledListItem = styled.li`
  border: dashed 1px gray;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const StyledMerchant = styled.div`
  display: flex;
  padding: 10px;
  padding-bottom: 2px;
  text-align: left;
  border: none;
  border-radius: 10px;
  cursor: url(${eyesCursor}) 5 12, auto;
`;

export const StyledToggleIcon = styled.img`
  width: 20px;
  height: 20px;
  margin: 10px;
  align-self: center;
`;

export const StyledMerchantNameAndTransactionsCount = styled.div`
  width: 330px;
  display: flex;
  flex-direction: column;
  align-self: center;

  h2 {
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0;
    margin: 0;
  }

  p {
    padding: 0;
    margin: 0;
    font-size: 1rem;
  }
`;

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1em;
  text-align: left;
  color: ${StyleConstants.COLOURS.cleoPurple};
  font-weight: bold;
  background: none;
  padding: 10px;
  margin: 0;
  margin-left: 66px;
  margin-bottom: 10px;
  border: none;
  cursor: url(${eyesCursor}) 5 12, auto;
  text-decoration: underline;

  &:hover {
    opacity: 0.66;
  }
`;
