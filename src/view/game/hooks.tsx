import { useEffect, useState } from "react";
import { actionType, cardList } from "../../constant/card";
import { cell } from "../../constant/cell";

function sleep(sec: number) {
  return new Promise((resolve) => setTimeout(resolve, sec));
}

export default function useGame() {
  const [hp, setHp] = useState(3);
  const [cards, setCards] = useState([0, 1, 2, 3, 4, 5, 0]);
  const [removingIndex, setRemovingIndex] = useState(-1);
  const [board, setBoard] = useState([
    [
      cell.player,
      cell.none,
      cell.card,
      cell.none,
      cell.none,
      cell.none,
      cell.none,
    ],
    [
      cell.none,
      cell.none,
      cell.none,
      cell.none,
      cell.none,
      cell.none,
      cell.none,
    ],
    [
      cell.none,
      cell.none,
      cell.none,
      cell.none,
      cell.none,
      cell.none,
      cell.none,
    ],
    [
      cell.none,
      cell.none,
      cell.none,
      cell.none,
      cell.none,
      cell.none,
      cell.none,
    ],
    [
      cell.none,
      cell.none,
      cell.none,
      cell.none,
      cell.none,
      cell.none,
      cell.none,
    ],
    [
      cell.none,
      cell.none,
      cell.none,
      cell.none,
      cell.none,
      cell.none,
      cell.none,
    ],
    [
      cell.none,
      cell.none,
      cell.none,
      cell.none,
      cell.none,
      cell.none,
      cell.none,
    ],
  ] as cell[][]);

  const handleArrive = (arrivedCell: cell) => {
    switch (arrivedCell) {
      case cell.card:
        setCards([
          ...cards,
          cardList[Math.floor(Math.random() * cardList.length)].id,
        ]);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    console.log(cards);
  }, [cards]);

  const handleAction = async (
    index: number,
    type: actionType,
    a: { y?: number; x?: number; num?: number }[]
  ) => {
    setRemovingIndex(index);
    setTimeout(() => {
      setCards((c) => {
        let cc = Array.from(c);
        cc.splice(index, 1);
        return cc;
      });
      setRemovingIndex(-1);
      return true;
    }, 500);
    await sleep(501);
    let cy = 0,
      cx = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (board[i][j] === cell.player) {
          cy = i;
          cx = j;
        }
      }
    }
    switch (type) {
      case actionType.move:
        setBoard((b) => {
          let bb = Array.from(b);
          a.forEach((aa) => {
            if (
              cy + aa.y! < 0 ||
              cy + aa.y! > 7 ||
              cx + aa.x! < 0 ||
              cx + aa.x! > 7
            )
              return;
            bb[cy][cx] = cell.none;
            handleArrive(bb[cy + aa.y!][cx + aa.x!]);
            bb[cy + aa.y!][cx + aa.x!] = cell.player;
          });
          return bb;
        });
        break;

      case actionType.heal:
        a.forEach((aa) => {
          setHp(hp + aa.num!);
        });
        break;

      case actionType.tp:
        let new_x = Math.floor(Math.random() * 8);
        let new_y = Math.floor(Math.random() * 8);
        setBoard((b) => {
          let bb = Array.from(b);
          bb[cy][cx] = cell.none;
          handleArrive(bb[new_y][new_x]);
          bb[new_y][new_x] = cell.player;
          return bb;
        });
        break;

      case actionType.newCards:
        const newcards = [];
        for (let i = 0; i < 7; i++) {
          newcards.push(
            cardList[Math.floor(Math.random() * cardList.length)].id
          );
        }
        setCards(newcards);
        break;
    }
  };

  return {
    cards,
    board,
    setBoard,
    setCards,
    handleAction,
    removingIndex,
  };
}
