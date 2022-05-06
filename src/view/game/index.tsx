import { useState } from "react";
import Card from "../../component/card";
import Player from "../../component/player";
import { cardList } from "../../constant/card";
import { cell } from "../../constant/cell";
import useGame from "./hooks";
import * as S from "./styles";

export default function Game() {
  const { board, cards, handleAction, removingIndex } = useGame();
  return (
    <S.Layout>
      <S.GameSection>
        <S.Board>
          {board.map((y, yi) =>
            y.map((x, xi) => (
              <S.BoardCell animationIndex={yi + xi}>
                {
                  {
                    [cell.none]: <></>,
                    [cell.player]: <Player />,
                    [cell.card]: <Card />,
                  }[board[yi][xi]]
                }
              </S.BoardCell>
            ))
          )}
        </S.Board>
      </S.GameSection>
      <S.CardsSection>
        {cards.map((id: number, index: number) => (
          <S.Card
            index={index}
            allIndex={cards.length}
            onClick={(e) =>
              handleAction(index, cardList[id].type, cardList[id].action)
            }
            removing={removingIndex === index}
          >
            <S.CardTitle>{cardList[id].name}</S.CardTitle>
          </S.Card>
        ))}
      </S.CardsSection>
    </S.Layout>
  );
}
