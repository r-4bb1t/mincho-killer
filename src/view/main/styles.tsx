import styled from "styled-components";

export const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: lightblue;
  overflow: hidden;
  gap: 10px;
`;

export const CharacterContainer = styled.div`
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
`;

export const Title = styled.div`
  font-size: 48px;
  font-weight: 900;
`;

export const Subtitle = styled.div`
  font-size: 18px;
  font-weight: 900;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 1000px;
  background: rgba(255, 255, 255, 0.59);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.7px);
  -webkit-backdrop-filter: blur(8.7px);
  border: 1px solid rgba(255, 255, 255, 1);
  font-size: 24px;
  margin-top: 40px;
  font-weight: 700;
  a {
    text-decoration: none;
    color: black;
  }
`;

export const CardsSection = styled.section`
  max-width: 100vw;
  height: 150px;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  padding-top: 20px;
  @media screen and (max-height: 680px) {
    transform: scale(0.6);
  }
`;

interface CardProps {
  index: number;
  allIndex: number;
  y: number;
  lineIndex: number;
}

export const CardContainer = styled.div`
  position: relative;
  width: 200px;
  transform: translateY(-30px);
`;

export const Card = styled.div<CardProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 180px;
  height: 260px;
  z-index: ${(p) => 10 - Math.abs(p.index - (p.allIndex - 1) / 2) + p.y * 10};
  transform: ${(p) =>
    `rotate(${(p.index - (p.lineIndex - 1) / 2) * 3}deg) translate(${
      (p.index - (p.lineIndex - 1) / 2) * 180
    }px, ${-Math.abs(p.index - (p.lineIndex - 1) / 2) * 5 - 10 + 120}px)`};
  background: rgba(255, 255, 255, 0.59);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.7px);
  -webkit-backdrop-filter: blur(8.7px);
  border: 1px solid rgba(255, 255, 255, 1);
  transition: all 0.2s;
  :hover {
    margin-top: -10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transform: ${(p) =>
      `rotate(${(p.index - (p.lineIndex - 1) / 2) * 3}deg) translate(${
        (p.index - (p.lineIndex - 1) / 2) * 180
      }px, ${
        Math.abs(p.index - (p.lineIndex - 1) / 2) - 80 + 120
      }px) scale(1.1)`};
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  overflow-x: hidden;
`;

export const CardTitle = styled.div`
  font-weight: 800;
  font-size: 16px;
  text-align: center;
  word-break: keep-all;
`;

export const CardIcon = styled.div`
  margin: 20px 0;
  svg {
    font-size: 40px;
    border-radius: 20px;
    padding: 5px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.2);
    color: #e94b4b;
  }
`;

export const CardDescription = styled.div`
  color: #444;
  font-weight: 500;
  font-size: 14px;
`;
