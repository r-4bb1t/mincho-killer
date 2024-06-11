import Boss from "../../component/boss";
import Monster from "../../component/monster";
import { Heart } from "lucide-react";
import * as S from "./styles";

export default function Main() {
  return (
    <S.Layout>
      <S.CharacterContainer>
        <Monster attacked={false} heart={0} />
        <Boss attacked={false} heart={0} />
        <Monster attacked={false} heart={0} />
      </S.CharacterContainer>
      <S.Title>민초킬러</S.Title>
      <S.Subtitle>민초가🌱세상을🌏지배👊한다👽💚</S.Subtitle>
      <S.Button>
        <a href="/game">START</a>
      </S.Button>
      <S.CardsSection>
        <S.CardContainer>
          <S.Card $index={0} $lineIndex={3} $allIndex={3} $y={0}>
            <S.CardTitle>김현채</S.CardTitle>
            <S.CardIcon>
              <Heart size={32} />
            </S.CardIcon>
            <S.CardDescription>
              게임 아이디어를 내고, 개발 전반을 담당하고, 웹 디자인을 했습니다.
              재미있게 해주세요!
            </S.CardDescription>
          </S.Card>
          <S.Card $index={1} $lineIndex={3} $allIndex={3} $y={0}>
            <S.CardTitle>류한욱</S.CardTitle>
            <S.CardIcon>
              <Heart size={32} />
            </S.CardIcon>
            <S.CardDescription>
              저는 게임 에셋을 담당했습니다. 내년엔 개발도 하겠습니다.
            </S.CardDescription>
          </S.Card>
          <S.Card $index={2} $lineIndex={3} $allIndex={3} $y={0}>
            <S.CardTitle>신영훈</S.CardTitle>
            <S.CardIcon>
              <Heart size={32} />
            </S.CardIcon>
            <S.CardDescription>민초를 사랑해주세요.</S.CardDescription>
          </S.Card>
        </S.CardContainer>
      </S.CardsSection>
    </S.Layout>
  );
}
