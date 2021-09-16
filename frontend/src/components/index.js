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

export const FrameContainer = styled.div`
  width: 714.28px;
`;

export const Frame = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  background: black;
  box-shadow: 0 10px 7px -5px rgba(0, 0, 0, 0.3);
`;

export const FrameMat = styled.div`
  position: absolute;
  background: white;
  top: 2.5%;
  bottom: 2.5%;
  left: 2.5%;
  right: 2.5%;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.5) inset;
`;

export const Art = styled.div`
  position: absolute;
  top: 13.158%;
  bottom: 13.158%;
  left: 13.158%;
  right: 13.158%;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.5) inset;
  }
`;
