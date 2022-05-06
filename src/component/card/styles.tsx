import styled, { keyframes } from "styled-components";

const player = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-10px);
  }
`;

export const Card = styled.div`
  width: 70px;
  height: 70px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  animation: 0.3s ${player} alternate-reverse infinite ease-out;
`;
