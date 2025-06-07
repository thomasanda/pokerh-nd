import { expect, test } from "vitest";
import { checkHandType } from "@/server/utils/check-hand-type";
import { HandType, TCard } from "@/server/types/poker-types";

test("Sjekk for straight flush", () => {
  const hand: TCard[] = [
    { suit: "h", rank: "10", value: 10 },
    { suit: "h", rank: "J", value: 11 },
    { suit: "h", rank: "Q", value: 12 },
    { suit: "h", rank: "K", value: 13 },
    { suit: "h", rank: "A", value: 14 },
  ];
  expect(checkHandType(hand)).toBe(HandType.StraightFlush);
});

test("Sjekk for fire like", () => {
  const hand: TCard[] = [
    { suit: "h", rank: "9", value: 9 },
    { suit: "s", rank: "9", value: 9 },
    { suit: "r", rank: "9", value: 9 },
    { suit: "k", rank: "9", value: 9 },
    { suit: "h", rank: "K", value: 13 },
  ];
  expect(checkHandType(hand)).toBe(HandType.FireLike);
});

test("Sjekk for fullt hus", () => {
  const hand: TCard[] = [
    { suit: "h", rank: "t", value: 10 },
    { suit: "k", rank: "t", value: 10 },
    { suit: "s", rank: "t", value: 10 },
    { suit: "k", rank: "a", value: 14 },
    { suit: "h", rank: "a", value: 14 },
  ];
  expect(checkHandType(hand)).toBe(HandType.FulltHus);
});

test("Sjekk for flush", () => {
  const hand: TCard[] = [
    { suit: "h", rank: "2", value: 2 },
    { suit: "h", rank: "3", value: 3 },
    { suit: "h", rank: "4", value: 4 },
    { suit: "h", rank: "5", value: 5 },
    { suit: "h", rank: "7", value: 7 },
  ];
  expect(checkHandType(hand)).toBe(HandType.Flush);
});

test("Sjekk for straight", () => {
  const hand: TCard[] = [
    { suit: "h", rank: "2", value: 2 },
    { suit: "r", rank: "3", value: 3 },
    { suit: "k", rank: "4", value: 4 },
    { suit: "s", rank: "5", value: 5 },
    { suit: "h", rank: "6", value: 6 },
  ];
  expect(checkHandType(hand)).toBe(HandType.Straight);
});

test("Sjekk for tre like", () => {
  const hand: TCard[] = [
    { suit: "h", rank: "2", value: 2 },
    { suit: "r", rank: "2", value: 2 },
    { suit: "k", rank: "2", value: 2 },
    { suit: "s", rank: "5", value: 5 },
    { suit: "h", rank: "6", value: 6 },
  ];
  expect(checkHandType(hand)).toBe(HandType.TreLike);
});

test("Sjekk for to par", () => {
  const hand: TCard[] = [
    { suit: "h", rank: "2", value: 2 },
    { suit: "r", rank: "2", value: 2 },
    { suit: "k", rank: "4", value: 4 },
    { suit: "s", rank: "4", value: 4 },
    { suit: "h", rank: "6", value: 6 },
  ];
  expect(checkHandType(hand)).toBe(HandType.ToPar);
});

test("Sjekk for høyt kort", () => {
  const hand: TCard[] = [
    { suit: "h", rank: "2", value: 2 },
    { suit: "r", rank: "3", value: 3 },
    { suit: "k", rank: "4", value: 4 },
    { suit: "s", rank: "9", value: 9 },
    { suit: "h", rank: "6", value: 6 },
  ];
  expect(checkHandType(hand)).toBe(HandType.HøytKort);
});
