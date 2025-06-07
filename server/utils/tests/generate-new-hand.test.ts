import { generateNewHand } from "../generate-new-hand";
import { test, expect } from "vitest";

test("generateNewHand returns a valid hand", () => {
  const hand = generateNewHand();
  expect(hand).toHaveProperty("cards");
  expect(hand).toHaveProperty("handType");
  expect(Array.isArray(hand.hand)).toBe(true);
  expect(hand.hand.length).toBe(5);

  hand.hand.forEach((card) => {
    expect(card).toHaveProperty("suit");
    expect(card).toHaveProperty("rank");
    expect(card).toHaveProperty("value");
  });

  const uniqueCards = new Set(
    hand.hand.map((card) => `${card.suit}-${card.rank}`),
  );
  expect(uniqueCards.size).toBe(hand.hand.length);

  expect(typeof hand.handType).toBe("string");
  expect(typeof hand.hand).toBe("object");
});
