import { useEffect, useState } from "react";
import { actionType, cardList } from "../../constant/card";
import { cell } from "../../constant/cell";
import { toast } from "react-toastify";

function sleep(sec: number) {
  return new Promise((resolve) => setTimeout(resolve, sec));
}

export default function useGame() {
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
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.monster, heart: 3, attacked: false },
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
      { cell: cell.monster, heart: 3, attacked: false },
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
      { cell: cell.monster, heart: 3, attacked: false },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
    ],
  ] as { cell: cell; heart?: number; attacked?: boolean }[][]);
  const [heart, setHeart] = useState(5);
  const [loading, setLoading] = useState(true);
  const [isGameover, setIsGameover] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [bossHeart, setBossHeart] = useState(10);
  const [bossAttacked, setBossAttacked] = useState(false);

  useEffect(() => {
    for (let i = 0; i < 7; i++) {
      const randomCard = Math.floor(Math.random() * cardList.length);
      setCards((c) => [...c, cardList[randomCard].id]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && removingIndex === -1 && cards.length === 0) {
      gameover();
    }
  }, [cards]);

  useEffect(() => {
    if (!loading && removingIndex === -1 && heart <= 0) {
      gameover();
    }
    async function yourTurn() {
      await sleep(1000);
      board.map((y, yi) =>
        y.map((x, xi) => {
          if (board[yi][xi].cell === cell.monster) {
            const dir = [
              [1, 0],
              [-1, 0],
              [0, 1],
              [0, -1],
            ];
            for (let i = 0; i < 4; i++) {
              if (
                yi + dir[i][0] < 0 ||
                yi + dir[i][0] >= 7 ||
                xi + dir[i][1] < 0 ||
                xi + dir[i][1] >= 7
              )
                continue;
              if (board[yi + dir[i][0]][xi + dir[i][1]].cell === cell.player) {
                setHeart((h) => h - 1);
              }
            }
          }
        })
      );
      await sleep(500);
      setDisabled(false);
    }
    if (turn % 2 === 1) {
      setDisabled(true);
      setTurn((t) => t + 1);
      yourTurn();
    }
  }, [turn]);

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
            cy + aa.y! >= 7 ||
            cx + aa.x! < 0 ||
            cx + aa.x! >= 7
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
      case actionType.draw:
        for (let i = 0; i < a[0]!.num!; i++) {
          const randomCard = Math.floor(Math.random() * cardList.length);
          setCards((c) => [...c, cardList[randomCard].id]);
          notify("새 카드를 얻었습니다.");
        }
        break;
      case actionType.attack:
        a.forEach(async (aa) => {
          if (
            cy + aa.y! < 0 ||
            cy + aa.y! >= 7 ||
            cx + aa.x! < 0 ||
            cx + aa.x! >= 7
          ) {
          } else {
            let bb = Array.from(board);
            if (bb[cy + aa.y!][cx + aa.x!].cell === cell.monster) {
              bb[cy + aa.y!][cx + aa.x!].heart! -= aa.num!;
              bb[cy + aa.y!][cx + aa.x!].attacked! = true;
              setBoard(bb);
              await sleep(300);
              let bbb = Array.from(bb);
              bbb[cy + aa.y!][cx + aa.x!].attacked! = false;
              setBoard(bbb);
            }
          }
        });
        break;
      case actionType.heal:
        a.forEach((aa) => setHeart((h) => Math.max(h + aa.num!, 5)));
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
    disabled,
    bossAttacked,
    bossHeart,
  };
}
