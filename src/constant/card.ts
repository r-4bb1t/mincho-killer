export interface cardInterface {
  name: string;
  type: actionType;
  action: { y?: number; x?: number; num?: number }[];
}

export enum actionType {
  attack,
  move,
  heal,
  draw,
  //item
  //random
}

export const cardList = [
  {
    id: 0,
    name: "왼쪽으로 한 칸 이동",
    type: actionType.move,
    action: [{ y: 0, x: -1 }],
  },
  {
    id: 1,
    name: "오른쪽으로 한 칸 이동",
    type: actionType.move,
    action: [{ y: 0, x: 1 }],
  },
  {
    id: 2,
    name: "카드 한 장 뽑기",
    type: actionType.draw,
    action: [{ num: 1 }],
  },
];
