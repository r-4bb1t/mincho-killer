import { useEffect, useState } from "react";
import { actionType, cardList } from "../../constant/card";
import { cell } from "../../constant/cell";
import { toast } from "react-toastify";

function sleep(sec: number) {
  return new Promise((resolve) => setTimeout(resolve, sec));
}

export default function useGame() {
  const [hp, setHp] = useState(3);
  const max_hp = 10;
  const [turn, setTurn] = useState(0);
  const [cards, setCards] = useState([] as number[]);
  const [removingIndex, setRemovingIndex] = useState(-1);
  const [board, setBoard] = useState([
    [
      { cell: cell.player },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
    ],
    [
      { cell: cell.monster },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
    ],
    [
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.card },
    ],
    [
      { cell: cell.none },
      { cell: cell.card },
      { cell: cell.none },
      { cell: cell.boss },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
    ],
    [
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.monster },
    ],
    [
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
    ],
    [
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.monster },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
    ],
  ] as { cell: cell }[][]);
  const [heart, setHeart] = useState(3);
  const [loading, setLoading] = useState(true);
  const [isGameover, setIsGameover] = useState(false);

  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      const randomCard = Math.floor(Math.random() * cardList.length);
      setCards((c) => [...c, cardList[randomCard].id]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (
      !loading &&
      removingIndex === -1 &&
      (cards.length === 0 || heart === 0)
    ) {
      gameover();
    }
  }, [cards]);

  const notify = (message: string) => toast(message);

  const gameover = () => {
    setIsGameover(true);
  };

  const handleArrive = (arrivedCell: cell) => {
    switch (arrivedCell) {
      case cell.card:
        const randomCard = Math.floor(Math.random() * cardList.length);
        setCards((c) => [...c, cardList[randomCard].id]);
        notify("새 카드를 얻었습니다.");
        return true;
      case cell.monster || cell.boss:
        setHeart((h) => h - 1);
        notify("몬스터에게 한 대 맞았습니다.");
        return false;
      default:
        return true;
    }
  };

  const handleAction = async (
    index: number,
    type: actionType,
    a: { y?: number; x?: number; num?: number }[]
  ) => {
    setRemovingIndex(index);
    setTimeout(() => {
      setCards((c) => {
        setRemovingIndex(-1);
        let cc = Array.from(c);
        cc.splice(index, 1);
        return cc;
      });
    }, 500);
    await sleep(500);
    let cy = 0,
      cx = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (board[i][j].cell === cell.player) {
          cy = i;
          cx = j;
        }
      }
    }
    switch (type) {
      case actionType.move:
        let flag = false;
        a.forEach(async (aa) => {
          if (flag) return;
          if (
            cy + aa.y! < 0 ||
            cy + aa.y! > 7 ||
            cx + aa.x! < 0 ||
            cx + aa.x! > 7
          ) {
            notify("이동할 수 없습니다.");
            flag = true;
          } else {
            let bb = Array.from(board);
            if (handleArrive(bb[cy + aa.y!][cx + aa.x!].cell)) {
              bb[cy][cx].cell = cell.none;
              bb[cy + aa.y!][cx + aa.x!].cell = cell.player;
              cy += aa.y!;
              cx += aa.x!;
              setBoard(bb);
            } else flag = true;
          }
        });
        break;

      case actionType.heal:
        a.forEach((aa) => {
          setHp(Math.min(hp + aa.num!, max_hp));
        });
        break;

      case actionType.maxHeal:
        setHp(max_hp);
        break;

      case actionType.tp:
        let new_x = Math.floor(Math.random() * 7);
        let new_y = Math.floor(Math.random() * 7);
        let bb = Array.from(board);
        if (handleArrive(bb[new_y][new_x].cell)) {
          bb[cy][cx].cell = cell.none;
          bb[new_y][new_x].cell = cell.player;
          cy += new_y;
          cx += new_x;
          setBoard(bb);
        } else flag = true;
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

      case actionType.draw:
        for (let i = 0; i < a[0]!.num!; i++) {
          const randomCard = Math.floor(Math.random() * cardList.length);
          setCards((c) => [...c, cardList[randomCard].id]);
          notify("새 카드를 얻었습니다.");
        }
        break;
    }
    setTurn((t) => t + 1);
  };
  return {
    cards,
    board,
    heart,
    setBoard,
    handleAction,
    removingIndex,
    isGameover,
  };
}
