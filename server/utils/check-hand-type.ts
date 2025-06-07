import { HandType, TCard } from "@/server/types/poker-types";

export const checkHandType = (hand: TCard[]) => {
  const values = hand.map((card) => card.value);
  const suits = hand.map((card) => card.suit);

  const isFlush = suits.every((suit) => suit === suits[0]);
  const isStraight = values.every(
    (value, idx) => idx === 0 || value === values[idx - 1] + 1,
  );
  const valueCounts = values.reduce(
    (acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number },
  );
  const sortedValueCounts = Object.values(valueCounts).sort((a, b) => b - a);
  if (isFlush && isStraight) {
    return HandType.StraightFlush;
  } else if (sortedValueCounts[0] === 4) {
    return HandType.FireLike;
  } else if (sortedValueCounts[0] === 3 && sortedValueCounts[1] == 2) {
    return HandType.FulltHus;
  } else if (isFlush) {
    return HandType.Flush;
  } else if (isStraight) {
    return HandType.Straight;
  } else if (sortedValueCounts[0] === 3) {
    return HandType.TreLike;
  } else if (sortedValueCounts[0] === 2 && sortedValueCounts[1] === 2) {
    return HandType.ToPar;
  } else if (sortedValueCounts[0] === 2) {
    return HandType.Par;
  } else {
    return HandType.HøytKort;
  }
};
