import type { TInputHand } from "../types/poker-types";

export const findBestHand = (
  hands: TInputHand[],
  getComparisonValues: (hand: TInputHand) => number[],
): number => {
  const handValues = hands.map((hand) => ({
    hand,
    values: getComparisonValues(hand),
  }));

  let best = handValues[0];

  for (let i = 1; i < handValues.length; i++) {
    const current = handValues[i];
    for (let j = 0; j < current.values.length; j++) {
      const currVal = current.values[j];
      const bestVal = best.values[j];

      if (currVal > bestVal) {
        best = current;
        break;
      } else if (currVal < bestVal) {
        break;
      }
    }
  }

  return best.hand.id;
};
