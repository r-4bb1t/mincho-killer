import styled, { css, keyframes } from "styled-components";

export const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: lightblue;
  overflow-y: hidden;
`;

export const GameSection = styled.section`
  width: 100vw;
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardsSection = styled.section`
  width: 100vw;
  height: 300px;
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
  disabled?: boolean;
}

export const Card = styled.div<CardProps>`
  width: 200px;
  height: 280px;
  z-index: ${(p) => 10 - Math.abs(p.index - (p.allIndex - 1) / 2)};
  transform: ${(p) =>
    `rotate(${(p.index - (p.allIndex - 1) / 2) * 5}deg) translate(${
      -(p.index - (p.allIndex - 1) / 2) * 50
    }px, ${Math.pow(Math.abs(p.index - (p.allIndex - 1) / 2), 2) * 10}px)`};
  background: rgba(255, 255, 255, 0.59);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.7px);
  -webkit-backdrop-filter: blur(8.7px);
  border: 1px solid rgba(255, 255, 255, 1);
  transition: all 0.2s;
  :hover {
    z-index: 20;
    margin-top: -10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transform: ${(p) =>
      `rotate(${(p.index - (p.allIndex - 1) / 2) * 5}deg) translate(${
        -(p.index - (p.allIndex - 1) / 2) * 50
      }px, ${
        Math.pow(Math.abs(p.index - (p.allIndex - 1) / 2), 2) * 10 -
        (p.removing ? 50 : 10)
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
`;

export const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 100px);
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
  width: 70px;
  height: 70px;
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
