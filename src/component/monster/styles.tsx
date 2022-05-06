import styled, { keyframes } from "styled-components";

const monster = keyframes`
  from {
    transform: skew(-5deg, 0);
  }
  to {
    transform: skew(5deg, 0);
  }
`;

export const Monster = styled.div`
  width: 50px;
  height: 50px;
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
