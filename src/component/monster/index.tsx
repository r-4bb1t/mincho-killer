import { useEffect, useState } from "react";
import * as S from "./styles";

interface MonsterProps {
  heart: number;
  attacked: boolean;
}

export default function Monster({ heart, attacked }: MonsterProps) {
  return (
    <S.MonsterContainer>
      <S.Monster>
        <img src="/assets/monster.png" />
        <S.Heart percent={(heart / 2) * 100}></S.Heart>
      </S.Monster>
      {attacked && (
        <S.AttackEffect>
          <img src="/assets/player_attackeffect.gif" />
        </S.AttackEffect>
      )}
    </S.MonsterContainer>
  );
}
