import { useEffect, useState } from "react";
import Boss from "../../component/boss";
import Card from "../../component/card";
import Player from "../../component/player";
import { cardList } from "../../constant/card";
import { cell } from "../../constant/cell";
import useGame from "./hooks";
import * as S from "./styles";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Monster from "../../component/monster";
import { Heart, RefreshCcw } from "lucide-react";

export default function Game() {
  const {
    board,
    cards,
    handleAction,
    removingIndex,
    heart,
    isGameover,
    isWin,
    disabled,
    attacked,
    turn,
  } = useGame();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 680 && !isMobile) setIsMobile(true);
      else if (window.innerWidth > 680) setIsMobile(false);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <S.Layout>
      {isGameover && (
        <S.GameoverContainer>
          <S.Gameover>GAME OVER</S.Gameover>
          <S.RestartButton onClick={() => window.location.reload()}>
            <RefreshCcw />
          </S.RestartButton>
        </S.GameoverContainer>
      )}
      {isWin && (
        <S.GameoverContainer>
          <S.Gameover>💕YOU WIN💕</S.Gameover>
          <S.Turn>
            <b>{turn}턴</b>만에 민초보스를 먹어치웠습니다!
          </S.Turn>
          <S.RestartButton onClick={() => window.location.reload()}>
            <RefreshCcw />
          </S.RestartButton>
        </S.GameoverContainer>
      )}
      <S.GameSection>
        <S.HeartContainer>
          {[...Array(heart)].map((n, i) => (
            <Heart
              key={i}
              style={{
                fill: "#e94b4b",
              }}
            />
          ))}
        </S.HeartContainer>
        <S.Board>
          {board.map((y, yi) =>
            y.map((x, xi) => (
              <S.BoardCell $animationIndex={yi + xi} key={yi * 100 + xi}>
                {
                  {
                    [cell.none]: <></>,
                    [cell.player]: <Player attacked={attacked} />,
                    [cell.card]: <Card />,
                    [cell.boss]: (
                      <Boss
                        heart={board[yi][xi].heart!}
                        attacked={board[yi][xi].attacked!}
                      />
                    ),
                    [cell.monster]: (
                      <Monster
                        heart={board[yi][xi].heart!}
                        attacked={board[yi][xi].attacked!}
                      />
                    ),
                  }[board[yi][xi].cell]
                }
              </S.BoardCell>
            ))
          )}
        </S.Board>
      </S.GameSection>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={true}
        draggable={false}
      />
      <S.CardsSection>
        <S.CardContainer>
          {cards.map((id: number, index: number) => (
            <S.Card
              $index={isMobile ? index % 3 : index % 5}
              $lineIndex={
                isMobile
                  ? index >= Math.floor(cards.length / 3) * 3
                    ? cards.length % 3
                    : 3
                  : index >= Math.floor(cards.length / 5) * 5
                  ? cards.length % 5
                  : 5
              }
              $allIndex={cards.length}
              $y={isMobile ? Math.floor(index / 3) : Math.floor(index / 5)}
              onClick={(e) => {
                if (removingIndex === -1 && !disabled)
                  handleAction(index, cardList[id].type, cardList[id].action);
              }}
              $removing={removingIndex === index}
              $type={cardList[id].type}
              $disabled={disabled}
              key={index}
            >
              <S.CardTitle>{cardList[id].name}</S.CardTitle>
              <S.CardIcon>
                <GetIcon id={id} />
              </S.CardIcon>
              <S.CardDescription>{cardList[id].description}</S.CardDescription>
            </S.Card>
          ))}
        </S.CardContainer>
      </S.CardsSection>
    </S.Layout>
  );
}

const GetIcon = ({ id }: { id: number }) => {
  const Icon = cardList[id].icon;
  return <Icon size={32} />;
};
