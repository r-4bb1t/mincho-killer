import { useState } from "react";
import * as S from "./styles";

export default function Monster() {
  const [heart, setHeart] = useState(3);
  return (
    <S.Monster>
      <img src="/assets/monster.png" />
      <S.Heart percent={(heart / 3) * 100}></S.Heart>
    </S.Monster>
  );
}
