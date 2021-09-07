import styled from 'styled-components';


export const Header = styled.header`
  min-height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: black;
`;

export const OuterContainer = styled.div`
  min-height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  // background: rgb(131,102,255);
  // background: linear-gradient(270deg, rgba(131,102,255,1) 0%, rgba(110,231,118,1) 100%);
  background-color: black;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  margin: 0px 20px;
  padding: 12px 24px;

  ${props => props.hidden && "hidden"} :focus {
    border: none;
    outline: none;
  }

  &:hover {
    opacity: 80%;
  }
`;

export const Input = styled.input`
  width: 200px;
  height: 40px;
  border-radius: 5px;
  color: rgba(4, 17, 29, 0.75);
  padding: 0px 10px;
  border: 1px solid gray;

`;

export const Title = styled.div`
  font-family: 'Orbitron', sans-serif;
  font-size: 48px;
  font-weight: bold;
  margin-left: 20px;
`;
