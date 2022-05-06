import styled, { css, keyframes } from "styled-components";
import { actionType } from "../../constant/card";

export const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: lightblue;
  overflow: hidden;
`;

export const GameSection = styled.section`
  width: 100vw;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CardsSection = styled.section`
  max-width: 100vw;
  height: 250px;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const removeCard = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

interface CardProps {
  index: number;
  allIndex: number;
  removing: boolean;
  type: actionType;
  disabled: boolean;
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
  width: 200px;
  height: 300px;
  z-index: ${(p) => 10 - Math.abs(p.index - (p.allIndex - 1) / 2) + p.y * 10};
  transform: ${(p) =>
    `rotate(${(p.index - (p.lineIndex - 1) / 2) * 3}deg) translate(${
      (p.index - (p.lineIndex - 1) / 2) * 200
    }px, ${-Math.abs(p.index - (p.lineIndex - 1) / 2) * 5 - 30 + p.y * 70}px)`};
  background: ${(p) =>
    p.disabled ? "rgba(205, 205, 205, 0.59)" : "rgba(255, 255, 255, 0.59)"};
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
        (p.index - (p.lineIndex - 1) / 2) * 200
      }px, ${
        Math.abs(p.index - (p.lineIndex - 1) / 2) - 200 + p.y * 100
      }px) scale(1.1)`};
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  ${(p) =>
    p.removing &&
    css`
      animation: 0.5s ${removeCard} ease;
    `}
  overflow-x: hidden;
  ::before {
    position: absolute;
    top: 1px;
    left: 0;
    width: 100%;
    height: 5px;
    content: "";
    background: ${(p) =>
      p.type === actionType.move
        ? "#839adf"
        : p.type === actionType.attack
        ? "#e16d6d"
        : p.type === actionType.heal
        ? "#589558"
        : "white"};
  }
`;

export const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 80px);
  gap: 2px;
  justify-content: center;
  padding-top: 20px;
`;

interface BoardCellProps {
  animationIndex: number;
}

const ceil = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const BoardCell = styled.div<BoardCellProps>`
  background: rgba(255, 255, 255, 0.59);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  aspect-ratio: 1;
  width: 80px;
  height: 80px;
  opacity: 0;

  animation: 0.2s ${(p) => p.animationIndex / 10}s ${ceil} ease-in-out;
  animation-fill-mode: forwards;

  display: flex;
  justify-content: center;
  align-items: center;

  :nth-child(odd) {
    background-color: rgba(225, 225, 225, 0.59);
  }
`;

export const CardTitle = styled.div`
  font-weight: 800;
  font-size: 18px;
  text-align: center;
  word-break: keep-all;
`;

export const CardIcon = styled.div`
  margin: 20px 0;
  svg {
    font-size: 50px;
    border-radius: 20px;
    padding: 5px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const CardDescription = styled.div`
  color: #444;
  font-weight: 500;
`;

export const HeartContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  svg {
    color: #e94b4b;
  }
`;

export const GameoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  z-index: 30;
  gap: 20px;
`;

export const Gameover = styled.div`
  color: white;
  font-size: 72px;
  font-weight: 700;
`;

export const RestartButton = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.59);
  border: 1px solid white;
  svg {
    font-size: 50px;
  }
`;
