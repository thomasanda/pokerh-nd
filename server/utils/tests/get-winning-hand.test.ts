import { TPokerHand } from "@/server/types/poker-types";
import { getWinningHand } from "../get-winning-hand";
import { test, expect } from "vitest";

type TInputHand = TPokerHand & { id: number };

const mockHands = [
  {
    id: 1,
    hand: [
      {
        suit: "s",
        rank: "5",
        value: 5,
      },
      {
        suit: "h",
        rank: "5",
        value: 5,
      },
      {
        suit: "s",
        rank: "q",
        value: 12,
      },
      {
        suit: "h",
        rank: "9",
        value: 9,
      },
      {
        suit: "h",
        rank: "a",
        value: 14,
      },
    ],
    handType: "Par",
  },
  {
    id: 2,
    hand: [
      {
        suit: "s",
        rank: "6",
        value: 6,
      },
      {
        suit: "s",
        rank: "2",
        value: 2,
      },
      {
        suit: "r",
        rank: "2",
        value: 2,
      },
      {
        suit: "h",
        rank: "q",
        value: 12,
      },
      {
        suit: "r",
        rank: "3",
        value: 3,
      },
    ],
    handType: "Par",
  },
  {
    id: 3,
    hand: [
      {
        suit: "h",
        rank: "3",
        value: 3,
      },
      {
        suit: "h",
        rank: "9",
        value: 9,
      },
      {
        suit: "s",
        rank: "5",
        value: 5,
      },
      {
        suit: "k",
        rank: "q",
        value: 12,
      },
      {
        suit: "s",
        rank: "a",
        value: 14,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 4,
    hand: [
      {
        suit: "r",
        rank: "k",
        value: 13,
      },
      {
        suit: "h",
        rank: "8",
        value: 8,
      },
      {
        suit: "r",
        rank: "a",
        value: 14,
      },
      {
        suit: "h",
        rank: "6",
        value: 6,
      },
      {
        suit: "s",
        rank: "a",
        value: 14,
      },
    ],
    handType: "Par",
  },
  {
    id: 5,
    hand: [
      {
        suit: "k",
        rank: "2",
        value: 2,
      },
      {
        suit: "k",
        rank: "3",
        value: 3,
      },
      {
        suit: "h",
        rank: "a",
        value: 14,
      },
      {
        suit: "k",
        rank: "t",
        value: 10,
      },
      {
        suit: "s",
        rank: "9",
        value: 9,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 6,
    hand: [
      {
        suit: "r",
        rank: "k",
        value: 13,
      },
      {
        suit: "k",
        rank: "9",
        value: 9,
      },
      {
        suit: "r",
        rank: "4",
        value: 4,
      },
      {
        suit: "h",
        rank: "j",
        value: 11,
      },
      {
        suit: "s",
        rank: "9",
        value: 9,
      },
    ],
    handType: "Par",
  },
  {
    id: 7,
    hand: [
      {
        suit: "r",
        rank: "t",
        value: 10,
      },
      {
        suit: "r",
        rank: "k",
        value: 13,
      },
      {
        suit: "k",
        rank: "9",
        value: 9,
      },
      {
        suit: "k",
        rank: "7",
        value: 7,
      },
      {
        suit: "h",
        rank: "6",
        value: 6,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 8,
    hand: [
      {
        suit: "s",
        rank: "3",
        value: 3,
      },
      {
        suit: "r",
        rank: "6",
        value: 6,
      },
      {
        suit: "k",
        rank: "2",
        value: 2,
      },
      {
        suit: "r",
        rank: "8",
        value: 8,
      },
      {
        suit: "r",
        rank: "7",
        value: 7,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 9,
    hand: [
      {
        suit: "h",
        rank: "4",
        value: 4,
      },
      {
        suit: "h",
        rank: "7",
        value: 7,
      },
      {
        suit: "r",
        rank: "t",
        value: 10,
      },
      {
        suit: "k",
        rank: "6",
        value: 6,
      },
      {
        suit: "h",
        rank: "q",
        value: 12,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 10,
    hand: [
      {
        suit: "h",
        rank: "6",
        value: 6,
      },
      {
        suit: "h",
        rank: "k",
        value: 13,
      },
      {
        suit: "s",
        rank: "t",
        value: 10,
      },
      {
        suit: "k",
        rank: "2",
        value: 2,
      },
      {
        suit: "s",
        rank: "8",
        value: 8,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 11,
    hand: [
      {
        suit: "h",
        rank: "a",
        value: 14,
      },
      {
        suit: "h",
        rank: "t",
        value: 10,
      },
      {
        suit: "h",
        rank: "q",
        value: 12,
      },
      {
        suit: "s",
        rank: "4",
        value: 4,
      },
      {
        suit: "s",
        rank: "a",
        value: 14,
      },
    ],
    handType: "Par",
  },
  {
    id: 12,
    hand: [
      {
        suit: "s",
        rank: "a",
        value: 14,
      },
      {
        suit: "r",
        rank: "5",
        value: 5,
      },
      {
        suit: "h",
        rank: "3",
        value: 3,
      },
      {
        suit: "k",
        rank: "4",
        value: 4,
      },
      {
        suit: "h",
        rank: "6",
        value: 6,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 13,
    hand: [
      {
        suit: "k",
        rank: "9",
        value: 9,
      },
      {
        suit: "k",
        rank: "3",
        value: 3,
      },
      {
        suit: "s",
        rank: "2",
        value: 2,
      },
      {
        suit: "s",
        rank: "3",
        value: 3,
      },
      {
        suit: "k",
        rank: "t",
        value: 10,
      },
    ],
    handType: "Par",
  },
  {
    id: 14,
    hand: [
      {
        suit: "k",
        rank: "3",
        value: 3,
      },
      {
        suit: "s",
        rank: "4",
        value: 4,
      },
      {
        suit: "k",
        rank: "5",
        value: 5,
      },
      {
        suit: "s",
        rank: "5",
        value: 5,
      },
      {
        suit: "s",
        rank: "a",
        value: 14,
      },
    ],
    handType: "Par",
  },
  {
    id: 15,
    hand: [
      {
        suit: "s",
        rank: "2",
        value: 2,
      },
      {
        suit: "k",
        rank: "8",
        value: 8,
      },
      {
        suit: "s",
        rank: "t",
        value: 10,
      },
      {
        suit: "s",
        rank: "k",
        value: 13,
      },
      {
        suit: "r",
        rank: "8",
        value: 8,
      },
    ],
    handType: "Par",
  },
  {
    id: 16,
    hand: [
      {
        suit: "s",
        rank: "j",
        value: 11,
      },
      {
        suit: "h",
        rank: "4",
        value: 4,
      },
      {
        suit: "s",
        rank: "k",
        value: 13,
      },
      {
        suit: "r",
        rank: "j",
        value: 11,
      },
      {
        suit: "s",
        rank: "6",
        value: 6,
      },
    ],
    handType: "Par",
  },
  {
    id: 17,
    hand: [
      {
        suit: "r",
        rank: "7",
        value: 7,
      },
      {
        suit: "r",
        rank: "5",
        value: 5,
      },
      {
        suit: "r",
        rank: "a",
        value: 14,
      },
      {
        suit: "k",
        rank: "9",
        value: 9,
      },
      {
        suit: "h",
        rank: "3",
        value: 3,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 18,
    hand: [
      {
        suit: "k",
        rank: "q",
        value: 12,
      },
      {
        suit: "r",
        rank: "6",
        value: 6,
      },
      {
        suit: "s",
        rank: "q",
        value: 12,
      },
      {
        suit: "h",
        rank: "k",
        value: 13,
      },
      {
        suit: "h",
        rank: "3",
        value: 3,
      },
    ],
    handType: "Par",
  },
  {
    id: 19,
    hand: [
      {
        suit: "k",
        rank: "q",
        value: 12,
      },
      {
        suit: "s",
        rank: "6",
        value: 6,
      },
      {
        suit: "h",
        rank: "q",
        value: 12,
      },
      {
        suit: "r",
        rank: "7",
        value: 7,
      },
      {
        suit: "r",
        rank: "5",
        value: 5,
      },
    ],
    handType: "Par",
  },
  {
    id: 20,
    hand: [
      {
        suit: "k",
        rank: "8",
        value: 8,
      },
      {
        suit: "h",
        rank: "q",
        value: 12,
      },
      {
        suit: "k",
        rank: "7",
        value: 7,
      },
      {
        suit: "k",
        rank: "6",
        value: 6,
      },
      {
        suit: "r",
        rank: "6",
        value: 6,
      },
    ],
    handType: "Par",
  },
  {
    id: 21,
    hand: [
      {
        suit: "s",
        rank: "9",
        value: 9,
      },
      {
        suit: "k",
        rank: "j",
        value: 11,
      },
      {
        suit: "h",
        rank: "t",
        value: 10,
      },
      {
        suit: "s",
        rank: "q",
        value: 12,
      },
      {
        suit: "r",
        rank: "k",
        value: 13,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 22,
    hand: [
      {
        suit: "h",
        rank: "5",
        value: 5,
      },
      {
        suit: "k",
        rank: "k",
        value: 13,
      },
      {
        suit: "h",
        rank: "9",
        value: 9,
      },
      {
        suit: "s",
        rank: "t",
        value: 10,
      },
      {
        suit: "r",
        rank: "t",
        value: 10,
      },
    ],
    handType: "Par",
  },
  {
    id: 23,
    hand: [
      {
        suit: "h",
        rank: "t",
        value: 10,
      },
      {
        suit: "h",
        rank: "a",
        value: 14,
      },
      {
        suit: "h",
        rank: "6",
        value: 6,
      },
      {
        suit: "k",
        rank: "9",
        value: 9,
      },
      {
        suit: "k",
        rank: "t",
        value: 10,
      },
    ],
    handType: "Par",
  },
  {
    id: 24,
    hand: [
      {
        suit: "k",
        rank: "t",
        value: 10,
      },
      {
        suit: "r",
        rank: "3",
        value: 3,
      },
      {
        suit: "k",
        rank: "8",
        value: 8,
      },
      {
        suit: "h",
        rank: "3",
        value: 3,
      },
      {
        suit: "h",
        rank: "6",
        value: 6,
      },
    ],
    handType: "Par",
  },
  {
    id: 25,
    hand: [
      {
        suit: "k",
        rank: "a",
        value: 14,
      },
      {
        suit: "s",
        rank: "a",
        value: 14,
      },
      {
        suit: "k",
        rank: "q",
        value: 12,
      },
      {
        suit: "s",
        rank: "k",
        value: 13,
      },
      {
        suit: "k",
        rank: "9",
        value: 9,
      },
    ],
    handType: "Par",
  },
  {
    id: 26,
    hand: [
      {
        suit: "r",
        rank: "5",
        value: 5,
      },
      {
        suit: "k",
        rank: "2",
        value: 2,
      },
      {
        suit: "k",
        rank: "9",
        value: 9,
      },
      {
        suit: "h",
        rank: "9",
        value: 9,
      },
      {
        suit: "s",
        rank: "7",
        value: 7,
      },
    ],
    handType: "Par",
  },
  {
    id: 27,
    hand: [
      {
        suit: "r",
        rank: "9",
        value: 9,
      },
      {
        suit: "s",
        rank: "3",
        value: 3,
      },
      {
        suit: "r",
        rank: "8",
        value: 8,
      },
      {
        suit: "h",
        rank: "k",
        value: 13,
      },
      {
        suit: "k",
        rank: "5",
        value: 5,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 28,
    hand: [
      {
        suit: "k",
        rank: "q",
        value: 12,
      },
      {
        suit: "h",
        rank: "7",
        value: 7,
      },
      {
        suit: "s",
        rank: "8",
        value: 8,
      },
      {
        suit: "s",
        rank: "j",
        value: 11,
      },
      {
        suit: "h",
        rank: "a",
        value: 14,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 29,
    hand: [
      {
        suit: "s",
        rank: "q",
        value: 12,
      },
      {
        suit: "h",
        rank: "7",
        value: 7,
      },
      {
        suit: "r",
        rank: "4",
        value: 4,
      },
      {
        suit: "s",
        rank: "k",
        value: 13,
      },
      {
        suit: "h",
        rank: "3",
        value: 3,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 30,
    hand: [
      {
        suit: "r",
        rank: "5",
        value: 5,
      },
      {
        suit: "k",
        rank: "3",
        value: 3,
      },
      {
        suit: "r",
        rank: "6",
        value: 6,
      },
      {
        suit: "r",
        rank: "8",
        value: 8,
      },
      {
        suit: "r",
        rank: "3",
        value: 3,
      },
    ],
    handType: "Par",
  },
  {
    id: 31,
    hand: [
      {
        suit: "r",
        rank: "3",
        value: 3,
      },
      {
        suit: "k",
        rank: "a",
        value: 14,
      },
      {
        suit: "k",
        rank: "7",
        value: 7,
      },
      {
        suit: "k",
        rank: "3",
        value: 3,
      },
      {
        suit: "s",
        rank: "j",
        value: 11,
      },
    ],
    handType: "Par",
  },
  {
    id: 32,
    hand: [
      {
        suit: "s",
        rank: "j",
        value: 11,
      },
      {
        suit: "s",
        rank: "t",
        value: 10,
      },
      {
        suit: "s",
        rank: "q",
        value: 12,
      },
      {
        suit: "k",
        rank: "8",
        value: 8,
      },
      {
        suit: "r",
        rank: "a",
        value: 14,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 33,
    hand: [
      {
        suit: "r",
        rank: "3",
        value: 3,
      },
      {
        suit: "h",
        rank: "j",
        value: 11,
      },
      {
        suit: "s",
        rank: "7",
        value: 7,
      },
      {
        suit: "s",
        rank: "2",
        value: 2,
      },
      {
        suit: "r",
        rank: "8",
        value: 8,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 34,
    hand: [
      {
        suit: "k",
        rank: "3",
        value: 3,
      },
      {
        suit: "k",
        rank: "6",
        value: 6,
      },
      {
        suit: "h",
        rank: "a",
        value: 14,
      },
      {
        suit: "h",
        rank: "t",
        value: 10,
      },
      {
        suit: "h",
        rank: "8",
        value: 8,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 35,
    hand: [
      {
        suit: "s",
        rank: "5",
        value: 5,
      },
      {
        suit: "h",
        rank: "2",
        value: 2,
      },
      {
        suit: "r",
        rank: "2",
        value: 2,
      },
      {
        suit: "r",
        rank: "a",
        value: 14,
      },
      {
        suit: "s",
        rank: "3",
        value: 3,
      },
    ],
    handType: "Par",
  },
  {
    id: 36,
    hand: [
      {
        suit: "k",
        rank: "q",
        value: 12,
      },
      {
        suit: "s",
        rank: "j",
        value: 11,
      },
      {
        suit: "r",
        rank: "8",
        value: 8,
      },
      {
        suit: "k",
        rank: "j",
        value: 11,
      },
      {
        suit: "k",
        rank: "7",
        value: 7,
      },
    ],
    handType: "Par",
  },
  {
    id: 37,
    hand: [
      {
        suit: "k",
        rank: "7",
        value: 7,
      },
      {
        suit: "s",
        rank: "k",
        value: 13,
      },
      {
        suit: "r",
        rank: "4",
        value: 4,
      },
      {
        suit: "k",
        rank: "6",
        value: 6,
      },
      {
        suit: "r",
        rank: "9",
        value: 9,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 38,
    hand: [
      {
        suit: "k",
        rank: "6",
        value: 6,
      },
      {
        suit: "h",
        rank: "q",
        value: 12,
      },
      {
        suit: "s",
        rank: "3",
        value: 3,
      },
      {
        suit: "h",
        rank: "j",
        value: 11,
      },
      {
        suit: "r",
        rank: "9",
        value: 9,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 39,
    hand: [
      {
        suit: "k",
        rank: "q",
        value: 12,
      },
      {
        suit: "r",
        rank: "6",
        value: 6,
      },
      {
        suit: "k",
        rank: "2",
        value: 2,
      },
      {
        suit: "r",
        rank: "q",
        value: 12,
      },
      {
        suit: "s",
        rank: "j",
        value: 11,
      },
    ],
    handType: "Par",
  },
  {
    id: 40,
    hand: [
      {
        suit: "k",
        rank: "q",
        value: 12,
      },
      {
        suit: "r",
        rank: "8",
        value: 8,
      },
      {
        suit: "r",
        rank: "a",
        value: 14,
      },
      {
        suit: "k",
        rank: "4",
        value: 4,
      },
      {
        suit: "k",
        rank: "7",
        value: 7,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 41,
    hand: [
      {
        suit: "r",
        rank: "j",
        value: 11,
      },
      {
        suit: "h",
        rank: "5",
        value: 5,
      },
      {
        suit: "r",
        rank: "t",
        value: 10,
      },
      {
        suit: "k",
        rank: "6",
        value: 6,
      },
      {
        suit: "s",
        rank: "a",
        value: 14,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 42,
    hand: [
      {
        suit: "s",
        rank: "5",
        value: 5,
      },
      {
        suit: "s",
        rank: "7",
        value: 7,
      },
      {
        suit: "r",
        rank: "2",
        value: 2,
      },
      {
        suit: "r",
        rank: "k",
        value: 13,
      },
      {
        suit: "s",
        rank: "a",
        value: 14,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 43,
    hand: [
      {
        suit: "s",
        rank: "7",
        value: 7,
      },
      {
        suit: "s",
        rank: "t",
        value: 10,
      },
      {
        suit: "h",
        rank: "6",
        value: 6,
      },
      {
        suit: "s",
        rank: "j",
        value: 11,
      },
      {
        suit: "k",
        rank: "9",
        value: 9,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 44,
    hand: [
      {
        suit: "s",
        rank: "5",
        value: 5,
      },
      {
        suit: "s",
        rank: "t",
        value: 10,
      },
      {
        suit: "h",
        rank: "5",
        value: 5,
      },
      {
        suit: "k",
        rank: "2",
        value: 2,
      },
      {
        suit: "h",
        rank: "j",
        value: 11,
      },
    ],
    handType: "Par",
  },
  {
    id: 45,
    hand: [
      {
        suit: "h",
        rank: "9",
        value: 9,
      },
      {
        suit: "h",
        rank: "t",
        value: 10,
      },
      {
        suit: "r",
        rank: "7",
        value: 7,
      },
      {
        suit: "h",
        rank: "j",
        value: 11,
      },
      {
        suit: "k",
        rank: "7",
        value: 7,
      },
    ],
    handType: "Par",
  },
  {
    id: 46,
    hand: [
      {
        suit: "k",
        rank: "9",
        value: 9,
      },
      {
        suit: "k",
        rank: "2",
        value: 2,
      },
      {
        suit: "h",
        rank: "8",
        value: 8,
      },
      {
        suit: "k",
        rank: "4",
        value: 4,
      },
      {
        suit: "s",
        rank: "7",
        value: 7,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 47,
    hand: [
      {
        suit: "k",
        rank: "4",
        value: 4,
      },
      {
        suit: "r",
        rank: "6",
        value: 6,
      },
      {
        suit: "k",
        rank: "k",
        value: 13,
      },
      {
        suit: "r",
        rank: "9",
        value: 9,
      },
      {
        suit: "s",
        rank: "6",
        value: 6,
      },
    ],
    handType: "Par",
  },
  {
    id: 48,
    hand: [
      {
        suit: "s",
        rank: "t",
        value: 10,
      },
      {
        suit: "k",
        rank: "a",
        value: 14,
      },
      {
        suit: "r",
        rank: "2",
        value: 2,
      },
      {
        suit: "s",
        rank: "j",
        value: 11,
      },
      {
        suit: "r",
        rank: "a",
        value: 14,
      },
    ],
    handType: "Par",
  },
  {
    id: 49,
    hand: [
      {
        suit: "r",
        rank: "7",
        value: 7,
      },
      {
        suit: "s",
        rank: "t",
        value: 10,
      },
      {
        suit: "s",
        rank: "9",
        value: 9,
      },
      {
        suit: "k",
        rank: "q",
        value: 12,
      },
      {
        suit: "s",
        rank: "q",
        value: 12,
      },
    ],
    handType: "Par",
  },
  {
    id: 50,
    hand: [
      {
        suit: "s",
        rank: "5",
        value: 5,
      },
      {
        suit: "s",
        rank: "8",
        value: 8,
      },
      {
        suit: "s",
        rank: "9",
        value: 9,
      },
      {
        suit: "r",
        rank: "k",
        value: 13,
      },
      {
        suit: "r",
        rank: "q",
        value: 12,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 51,
    hand: [
      {
        suit: "s",
        rank: "k",
        value: 13,
      },
      {
        suit: "r",
        rank: "q",
        value: 12,
      },
      {
        suit: "k",
        rank: "t",
        value: 10,
      },
      {
        suit: "k",
        rank: "9",
        value: 9,
      },
      {
        suit: "h",
        rank: "8",
        value: 8,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 52,
    hand: [
      {
        suit: "s",
        rank: "k",
        value: 13,
      },
      {
        suit: "h",
        rank: "9",
        value: 9,
      },
      {
        suit: "h",
        rank: "7",
        value: 7,
      },
      {
        suit: "h",
        rank: "a",
        value: 14,
      },
      {
        suit: "s",
        rank: "j",
        value: 11,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 53,
    hand: [
      {
        suit: "h",
        rank: "5",
        value: 5,
      },
      {
        suit: "r",
        rank: "6",
        value: 6,
      },
      {
        suit: "h",
        rank: "2",
        value: 2,
      },
      {
        suit: "k",
        rank: "j",
        value: 11,
      },
      {
        suit: "r",
        rank: "8",
        value: 8,
      },
    ],
    handType: "Høyt kort",
  },
  {
    id: 54,
    hand: [
      {
        suit: "r",
        rank: "a",
        value: 14,
      },
      {
        suit: "r",
        rank: "9",
        value: 9,
      },
      {
        suit: "r",
        rank: "k",
        value: 13,
      },
      {
        suit: "r",
        rank: "6",
        value: 6,
      },
      {
        suit: "k",
        rank: "3",
        value: 3,
      },
    ],
    handType: "Høyt kort",
  },
] as TInputHand[];

test("Returns best hand", () => {
  const bestHand = getWinningHand(mockHands);
  expect(bestHand).toBe(25);
});
