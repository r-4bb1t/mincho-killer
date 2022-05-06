export interface cardInterface {
  name: string;
  type: actionType;
  action: { y?: number; x?: number; num?: number }[];
}

export enum actionType {
  attack,
  move,
  heal,
  maxHeal,
  draw,
  tp,
  newCards,
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
  {
    id: 3,
    name: "체력 3 회복",
    type: actionType.heal,
    action: [{ num: 3 }],
  },
  {
    id: 4,
    name: "체력 모두 회복",
    type: actionType.maxHeal,
    action: [],
  },
  {
    id: 5,
    name: "랜덤 위치로 순간이동",
    type: actionType.tp,
    action: [],
  },
  {
    id: 6,
    name: "모든 카드 랜덤 변환",
    type: actionType.newCards,
    action: [],
  },
];
