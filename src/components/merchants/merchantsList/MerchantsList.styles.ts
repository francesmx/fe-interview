import styled from 'styled-components';
import pizzaCursor from '../../../assets/pizza-cursor.svg';
import eyesCursor from '../../../assets/eyes-cursor.svg';
import { StyleConstants } from '../../../shared/utils/constants';

type StyledTabProps = {
  selected: boolean;
};

export const StyledTab = styled.button<StyledTabProps>`
  display: inline-block;
  padding: 15px 30px;
  margin: 15px 8px 0px 8px;
  font-size: 1rem;
  color: black;
  border: solid 1px black;
  border-radius: 8px 8px 0 0;
  text-transform: uppercase;
  cursor: ${(props) =>
    props.selected ? `url(${pizzaCursor}) 2 2, auto` : `url(${eyesCursor}) 5 12, auto`};
  background-color: ${(props) =>
    props.selected ? 'white' : `${StyleConstants.COLOURS.cleoYellow}`};
  border-bottom: ${(props) => props.selected && 'solid 1px white'};
  font-weight: ${(props) => props.selected && 'bold'};

  &:hover:enabled {
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    opacity: 1;
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
    transform-origin: bottom;
  }

  @media only screen and (max-width: 370px) {
    /* For very small screens: */
    padding: 15px 10px;
    margin: 15px 5px 0px 5px;
  }
`;

export const StyledMerchantsContainer = styled.section`
  background: white;
  color: black;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 0;
  padding: 20px;
  padding-bottom: 0px;
  border-radius: 10px;
`;

export const StyledEmptyContainerMessage = styled.div`
  padding-bottom: 20px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
  }
`;

export const StyledUnorderedList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
