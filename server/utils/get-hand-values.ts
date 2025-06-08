import { TInputHand } from "../types/poker-types";

export const getHandValues = (hand: TInputHand, groupSizes: number[]) => {
  // generer objekt med antall forekomster av hver kortverdi
  const counts = hand.hand.reduce<Record<number, number>>((acc, card) => {
    acc[card.value] = (acc[card.value] || 0) + 1;
    return acc;
  }, {});

  const result: number[] = [];

  /* filtrer ut gjentatte verdier i størrelsesorden som er angitt i groupSizes array
   * To Par: groupSizes = [2]
   * Tre like: groupSizes = [3]
   * Fullt hus: groupSizes = [3, 2]
   * - finner verdier i counts objektet hvor key === size og sortere synkende
   */
  for (const size of groupSizes) {
    const groups = Object.keys(counts)
      .filter((v) => counts[+v] === size)
      .map(Number)
      .sort((a, b) => b - a);

    result.push(...groups);
  }

  const kickers = hand.hand
    .filter((c) => !result.includes(c.value))
    .map((c) => c.value)
    .sort((a, b) => b - a);

  return [...result, ...kickers];
};
