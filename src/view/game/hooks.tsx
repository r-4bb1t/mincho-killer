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
      { cell: cell.none },
    ],
    [
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.boss, heart: 5, attacked: false },
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
      { cell: cell.none },
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
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
      { cell: cell.none },
    ],
  ] as { cell: cell; heart?: number; attacked?: boolean }[][]);
  const max_hp = 5;
  const [heart, setHeart] = useState(max_hp);
  const [loading, setLoading] = useState(true);
  const [isGameover, setIsGameover] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [attacked, setAttacked] = useState(false);

  useEffect(() => {
    for (let i = 0; i < 9; i++) {
      const randomCard = Math.floor(Math.random() * cardList.length);
      setCards((c) => [...c, cardList[randomCard].id]);
    }
    for (let i = 0; i < 5; i++) {
      let bb = Array.from(board);
      let new_x = Math.floor(Math.random() * 7);
      let new_y = Math.floor(Math.random() * 7);
      while (board[new_y][new_x].cell !== cell.none) {
        new_x = Math.floor(Math.random() * 7);
        new_y = Math.floor(Math.random() * 7);
      }
      bb[new_y][new_x] = { cell: cell.card };
      setBoard(bb);
    }
    for (let i = 0; i < 4; i++) {
      let bb = Array.from(board);
      let new_x = Math.floor(Math.random() * 7);
      let new_y = Math.floor(Math.random() * 7);
      while (board[new_y][new_x].cell !== cell.none) {
        new_x = Math.floor(Math.random() * 7);
        new_y = Math.floor(Math.random() * 7);
      }
      bb[new_y][new_x] = { cell: cell.monster, heart: 2, attacked: false };
      setBoard(bb);
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
  }, [cards, heart]);

  useEffect(() => {
    async function yourTurn() {
      await sleep(500);
      board.map((y, yi) =>
        y.map(async (x, xi) => {
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
                setAttacked(true);
                await sleep(800);
                setAttacked(false);
                setHeart((h) => Math.max(h - 1, 0));
              }
            }
          } else if (board[yi][xi].cell === cell.boss) {
            const dir = [
              [1, 0],
              [-1, 0],
              [0, 1],
              [0, -1],
              [1, 1],
              [-1, -1],
              [-1, 1],
              [1, -1],
            ];
            for (let i = 0; i < 8; i++) {
              if (
                yi + dir[i][0] < 0 ||
                yi + dir[i][0] >= 7 ||
                xi + dir[i][1] < 0 ||
                xi + dir[i][1] >= 7
              )
                continue;
              if (board[yi + dir[i][0]][xi + dir[i][1]].cell === cell.player) {
                setAttacked(true);
                await sleep(800);
                setAttacked(false);
                setHeart((h) => Math.max(h - 1, 0));
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
    if (!isWin) setIsGameover(true);
  };

  const handleArrive = (arrivedCell: cell) => {
    switch (arrivedCell) {
      case cell.card:
        for (let i = 0; i < 3; i++) {
          const randomCard = Math.floor(Math.random() * cardList.length);
          setCards((c) => [...c, cardList[randomCard].id]);
        }
        notify("새 카드들을 얻었습니다.");
        return true;
      case cell.monster || cell.boss:
        setHeart((h) => Math.max(h - 1, 0));
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

      case actionType.heal:
        a.forEach((aa) => {
          setHeart(Math.min(heart + aa.num!, max_hp));
        });
        break;

      case actionType.tp:
        let new_x = Math.floor(Math.random() * 7);
        let new_y = Math.floor(Math.random() * 7);
        while (
          board[new_y][new_x].cell === cell.monster ||
          board[new_y][new_x].cell === cell.boss
        ) {
          new_x = Math.floor(Math.random() * 7);
          new_y = Math.floor(Math.random() * 7);
        }
        let bb = Array.from(board);
        if (handleArrive(bb[new_y][new_x].cell)) {
          bb[cy][cx].cell = cell.none;
          bb[new_y][new_x].cell = cell.player;
          cy += new_y;
          cx += new_x;
          setBoard(bb);
        }
        notify("순간이동했어요!");
        break;

      case actionType.newCards:
        const newcards = [];
        for (let i = 0; i < cards.length; i++) {
          newcards.push(
            cardList[Math.floor(Math.random() * cardList.length)].id
          );
        }
        notify("카드가 모두 바뀌었습니다.");
        setCards(newcards);
        break;

      case actionType.draw:
        for (let i = 0; i < a[0]!.num!; i++) {
          const randomCard = Math.floor(Math.random() * cardList.length);
          setCards((c) => [...c, cardList[randomCard].id]);
        }
        notify("새 카드를 얻었습니다.");
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
            if (
              bb[cy + aa.y!][cx + aa.x!].cell === cell.monster ||
              bb[cy + aa.y!][cx + aa.x!].cell === cell.boss
            ) {
              bb[cy + aa.y!][cx + aa.x!].heart! -= aa.num!;
              bb[cy + aa.y!][cx + aa.x!].attacked! = true;
              setBoard(bb);
              await sleep(300);
              let bbb = Array.from(bb);
              bbb[cy + aa.y!][cx + aa.x!].attacked! = false;
              if (bbb[cy + aa.y!][cx + aa.x!].heart! <= 0) {
                if (bbb[cy + aa.y!][cx + aa.x!].cell === cell.boss) {
                  setIsWin(true);
                } else {
                  bbb[cy + aa.y!][cx + aa.x!].cell = cell.none;
                  for (let i = 0; i < 3; i++) {
                    const randomCard = Math.floor(
                      Math.random() * cardList.length
                    );
                    setCards((c) => [...c, cardList[randomCard].id]);
                  }
                  notify("몬스터를 처치하고 카드들을 얻었습니다.");
                }
              }
              setBoard(bbb);
            }
          }
        });
        break;
    }
    setTurn((t) => t + 1);
  };
  return {
    cards,
    board,
    heart,
    setBoard,
    attacked,
    handleAction,
    removingIndex,
    isGameover,
    disabled,
    isWin,
    turn,
  };
}
