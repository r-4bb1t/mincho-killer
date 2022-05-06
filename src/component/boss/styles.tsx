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
  width: 60px;
  height: 60px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  animation: 0.5s ${boss} infinite alternate-reverse ease-in-out;
  transform-origin: bottom center;
`;
