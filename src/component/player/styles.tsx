import styled, { keyframes } from "styled-components";

const player = keyframes`
  from {
    transform: rotate(-5deg);
  }
  to {
    transform: rotate(5deg);
  }
`;

export const Player = styled.div`
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  animation: 0.5s ${player} infinite alternate-reverse ease-in-out;
`;
