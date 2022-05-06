import * as S from "./styles";

interface PlayerProps {
  attacked: boolean;
}

export default function Player({ attacked }: PlayerProps) {
  return (
    <S.PlayerContainer>
      <S.Player>
        <img src="/assets/player.png" />
      </S.Player>
      {attacked && (
        <S.AttackEffect>
          <img src="/assets/monster_attackeffect.gif" />
        </S.AttackEffect>
      )}
    </S.PlayerContainer>
  );
}
