import type { TInputHand } from "../types/poker-types";

export const findBestHand = (
  hands: TInputHand[],
  getHandValues: (hand: TInputHand) => number[],
): number => {
  const handValues = hands.map((hand) => ({
    hand,
    values: getHandValues(hand),
  }));

  const best = handValues.reduce((best, current) => {
    for (let i = 0; i < current.values.length; i++) {
      if (current.values[i] > best.values[i]) return current;
      if (current.values[i] < best.values[i]) return best;
    }
    return best;
  }, handValues[0]);

  return best.hand.id;
};
