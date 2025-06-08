import { TPokerHand } from "@/server/types/poker-types";
import { getWinningHand } from "../get-winning-hand";
import { test, expect } from "vitest";

type TInputHand = TPokerHand & { id: number };

const mockHands = [
  {
    id: 1,
    hand: [
      {
        suit: "h",
        rank: "k",
        value: 13,
      },
      {
        suit: "s",
        rank: "k",
        value: 13,
      },
      {
        suit: "r",
        rank: "t",
        value: 10,
      },
      {
        suit: "h",
        rank: "t",
        value: 10,
      },
      {
        suit: "r",
        rank: "a",
        value: 14,
      },
    ],
    handType: "To par",
  },
  {
    id: 2,
    hand: [
      {
        suit: "r",
        rank: "a",
        value: 14,
      },
      {
        suit: "k",
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
        rank: "6",
        value: 6,
      },
      {
        suit: "h",
        rank: "4",
        value: 4,
      },
    ],
    handType: "To par",
  },
] as TInputHand[];

test("Returns best hand", () => {
  const bestHand = getWinningHand(mockHands);
  expect(bestHand).toBe(2);
});
