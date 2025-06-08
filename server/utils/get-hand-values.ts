import { TInputHand } from "../types/poker-types";

export const getHandValues = (hand: TInputHand, groupSizes: number[]) => {
  // generer object med antall forekomster av hver kortverdi
  const counts = hand.hand.reduce<Record<number, number>>((acc, card) => {
    acc[card.value] = (acc[card.value] || 0) + 1;
    return acc;
  }, {});

  const result: number[] = [];
  const usedValues = new Set<number>();

  // filtrer ut gjentatte verdier i størrelsesorden som er angitt i groupSizes array
  for (const size of groupSizes) {
    const groups = Object.keys(counts)
      .filter((v) => counts[+v] === size && !usedValues.has(+v))
      .map(Number)
      .sort((a, b) => b - a);

    result.push(...groups);
    groups.forEach((v) => usedValues.add(v));
  }

  const kickers = hand.hand
    .filter((c) => !usedValues.has(c.value))
    .map((c) => c.value)
    .sort((a, b) => b - a);

  return [...result, ...kickers];
};
