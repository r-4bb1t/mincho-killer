import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  HeartPulseIcon,
  MapPin,
  PackagePlus,
  Shuffle,
  Sparkle,
  Sparkles,
} from "lucide-react";

export interface cardInterface {
  name: string;
  type: actionType;
  action: { y?: number; x?: number; num?: number }[];
  icon: any;
  description: string;
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
    icon: ArrowLeft,
    action: [{ y: 0, x: -1 }],
    description:
      "왼쪽으로 한 칸 이동합니다. 이동할 수 없는 경우 아무 것도 하지 않습니다.",
  },
  {
    id: 1,
    name: "오른쪽으로 한 칸 이동",
    type: actionType.move,
    action: [{ y: 0, x: 1 }],
    icon: ArrowRight,
    description:
      "오른쪽으로 한 칸 이동합니다. 이동할 수 없는 경우 아무 것도 하지 않습니다.",
  },
  {
    id: 2,
    name: "위쪽으로 한 칸 이동",
    type: actionType.move,
    action: [{ y: -1, x: 0 }],
    icon: ArrowUp,
    description:
      "위쪽으로 한 칸 이동합니다. 이동할 수 없는 경우 아무 것도 하지 않습니다.",
  },
  {
    id: 3,
    name: "아래쪽으로 한 칸 이동",
    type: actionType.move,
    action: [{ y: 1, x: 0 }],
    icon: ArrowDown,
    description:
      "아래쪽으로 한 칸 이동합니다. 이동할 수 없는 경우 아무 것도 하지 않습니다.",
  },
  {
    id: 4,
    name: "카드 한 장 뽑기",
    type: actionType.draw,
    action: [{ num: 1 }],
    icon: PackagePlus,
    description: "카드를 한 장 뽑습니다.",
  },
  {
    id: 5,
    name: "왼쪽으로 두 칸 이동",
    type: actionType.move,
    icon: ArrowLeft,
    action: [
      { y: 0, x: -1 },
      { y: 0, x: -1 },
    ],
    description:
      "왼쪽으로 두 칸 이동합니다. 이동할 수 없는 경우 아무 것도 하지 않습니다.",
  },
  {
    id: 6,
    name: "오른쪽으로 두 칸 이동",
    type: actionType.move,
    action: [
      { y: 0, x: 1 },
      { y: 0, x: 1 },
    ],
    icon: ArrowRight,
    description:
      "오른쪽으로 두 칸 이동합니다. 이동할 수 없는 경우 아무 것도 하지 않습니다.",
  },
  {
    id: 7,
    name: "위쪽으로 두 칸 이동",
    type: actionType.move,
    action: [
      { y: -1, x: 0 },
      { y: -1, x: 0 },
    ],
    icon: ArrowUp,
    description:
      "위쪽으로 두 칸 이동합니다. 이동할 수 없는 경우 아무 것도 하지 않습니다.",
  },
  {
    id: 8,
    name: "아래쪽으로 두 칸 이동",
    type: actionType.move,
    action: [
      { y: 1, x: 0 },
      { y: 1, x: 0 },
    ],
    icon: ArrowDown,
    description:
      "아래쪽으로 두 칸 이동합니다. 이동할 수 없는 경우 아무 것도 하지 않습니다.",
  },
  {
    id: 9,
    name: "사방향 기본 공격",
    type: actionType.attack,
    action: [
      { y: 1, x: 0, num: 1 },
      { y: 0, x: 1, num: 1 },
      { y: -1, x: 0, num: 1 },
      { y: 0, x: -1, num: 1 },
    ],
    icon: Sparkle,
    description: "왼쪽, 오른쪽, 위쪽, 아래쪽 사방향에 기본 공격을 날립니다.",
  },
  {
    id: 10,
    name: "체력 포션",
    type: actionType.heal,
    action: [{ num: 3 }],
    icon: HeartPulseIcon,
    description: "체력을 3 회복합니다.",
  },
  {
    id: 11,
    name: "파워 엘릭서",
    type: actionType.heal,
    icon: HeartPulseIcon,
    description: "체력을 모두 회복합니다.",
    action: [{ num: 5 }],
  },
  {
    id: 12,
    name: "순간이동",
    type: actionType.tp,
    icon: MapPin,
    description: "순간이동합니다. 어디로 갈지는 몰라요!",
    action: [],
  },
  {
    id: 13,
    name: "이게 아니야!",
    type: actionType.newCards,
    icon: Shuffle,
    description: "모든 카드를 새로운 카드로 교체합니다.",
    action: [],
  },
  {
    id: 14,
    name: "사방향 강한 공격",
    type: actionType.attack,
    action: [
      { y: 1, x: 0, num: 2 },
      { y: 0, x: 1, num: 2 },
      { y: -1, x: 0, num: 2 },
      { y: 0, x: -1, num: 2 },
    ],
    icon: Sparkles,
    description: "왼쪽, 오른쪽, 위쪽, 아래쪽 사방향에 강한 공격을 날립니다.",
  },
  {
    id: 15,
    name: "대각선 기본 공격",
    type: actionType.attack,
    action: [
      { y: 1, x: 1, num: 1 },
      { y: -1, x: 1, num: 1 },
      { y: 1, x: -1, num: 1 },
      { y: -1, x: -1, num: 1 },
    ],
    icon: Sparkle,
    description: "인접한 대각선 네 칸에 기본 공격을 날립니다.",
  },
  {
    id: 16,
    name: "대각선 강한 공격",
    type: actionType.attack,
    action: [
      { y: 1, x: 1, num: 2 },
      { y: -1, x: 1, num: 2 },
      { y: 1, x: -1, num: 2 },
      { y: -1, x: -1, num: 2 },
    ],
    icon: Sparkles,
    description: "인접한 대각선 네 칸에 강한 공격을 날립니다.",
  },
];
