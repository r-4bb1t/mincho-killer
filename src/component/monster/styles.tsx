import styled, { keyframes } from "styled-components";

const monster = keyframes`
  from {
    transform: skew(-5deg, 0);
  }
  to {
    transform: skew(5deg, 0);
  }
`;

export const MonsterContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Monster = styled.div`
  width: 40px;
  height: 40px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding-bottom: 3px;
  }
  transform-origin: bottom center;
  animation: 0.5s ${monster} infinite alternate-reverse ease-in-out;
`;

interface HeartProps {
  percent: number;
}

export const Heart = styled.div<HeartProps>`
  width: ${(p) => p.percent}%;
  height: 3px;
  background-color: #e94b4b;
`;

export const AttackEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
