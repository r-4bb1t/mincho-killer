import styled, { keyframes } from "styled-components";

const boss = keyframes`
  from {
    transform: scaleY(0.9);
  }
  to {
    transform: scaleY(1);
  }
`;

export const Boss = styled.div`
  width: 40px;
  height: 40px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: scale(1.3);
    padding-bottom: 3px;
  }
  animation: 0.5s ${boss} infinite alternate-reverse ease-in-out;
  transform-origin: bottom center;
`;

export const BossContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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
