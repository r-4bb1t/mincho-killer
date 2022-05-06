import styled, { keyframes } from "styled-components";

const player = keyframes`
  from {
    transform: translateY(5px);
  }
  to {
    transform: translateY(-5px);
  }
`;

export const Card = styled.div`
  width: 40px;
  height: 40px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  animation: 0.3s ${player} alternate-reverse infinite ease-out;
`;
