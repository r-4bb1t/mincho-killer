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
import { SvgIcon } from "@material-ui/core";
import { Autorenew, Favorite } from "@material-ui/icons";
import Monster from "../../component/monster";

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
  } = useGame();
  return (
    <S.Layout>
      {isGameover && (
        <S.GameoverContainer>
          <S.Gameover>GAME OVER</S.Gameover>
          <S.RestartButton onClick={() => window.location.reload()}>
            <Autorenew />
          </S.RestartButton>
        </S.GameoverContainer>
      )}
      {isWin && (
        <S.GameoverContainer>
          <S.Gameover>💕YOU WIN💕</S.Gameover>
          <S.RestartButton onClick={() => window.location.reload()}>
            <Autorenew />
          </S.RestartButton>
        </S.GameoverContainer>
      )}
      <S.GameSection>
        <S.HeartContainer>
          {[...Array(heart)].map((n, i) => (
            <Favorite key={n} />
          ))}
        </S.HeartContainer>
        <S.Board>
          {board.map((y, yi) =>
            y.map((x, xi) => (
              <S.BoardCell animationIndex={yi + xi} key={yi * 100 + xi}>
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
              index={index % 5}
              lineIndex={
                index >= Math.floor(cards.length / 5) * 5 ? cards.length % 5 : 5
              }
              allIndex={cards.length}
              y={Math.floor(index / 5)}
              onClick={(e) => {
                if (removingIndex === -1 && !disabled)
                  handleAction(index, cardList[id].type, cardList[id].action);
              }}
              removing={removingIndex === index}
              type={cardList[id].type}
              disabled={disabled}
              key={index}
            >
              <S.CardTitle>{cardList[id].name}</S.CardTitle>{" "}
              <S.CardIcon>
                <SvgIcon component={cardList[id].icon} />
              </S.CardIcon>
              <S.CardDescription>{cardList[id].description}</S.CardDescription>
            </S.Card>
          ))}
        </S.CardContainer>
      </S.CardsSection>
    </S.Layout>
  );
}
