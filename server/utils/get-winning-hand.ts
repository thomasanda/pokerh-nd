import {
  HandType,
  HandTypeRankMap,
  type TInputHand,
} from "../types/poker-types";
import { findBestHand } from "./find-best-hand";
import { getHandValues } from "./get-hand-values";

export const getWinningHand = (hands: TInputHand[]) => {
  let bestRank = -Infinity;
  let bestHands: TInputHand[] = [];

  for (const hand of hands) {
    const rank = HandTypeRankMap[hand.handType];
    if (rank > bestRank) {
      bestRank = rank;
      bestHands = [hand];
    } else if (rank === bestRank) {
      bestHands.push(hand);
    }
  }

  if (bestHands.length === 1) {
    return bestHands[0].id;
  }

  switch (bestHands[0].handType) {
    case HandType.StraightFlush:
    case HandType.Straight:
    case HandType.Flush:
    case HandType.HøytKort:
      return findBestHand(bestHands, (hand) => getHandValues(hand, []));
    case HandType.FireLike:
      return findBestHand(bestHands, (hand) => getHandValues(hand, [4]));
    case HandType.FulltHus:
      return findBestHand(bestHands, (hand) => getHandValues(hand, [3, 2]));
    case HandType.TreLike: {
      return findBestHand(bestHands, (hand) => getHandValues(hand, [3]));
    }
    case HandType.ToPar:
    case HandType.Par:
      return findBestHand(bestHands, (hand) => getHandValues(hand, [2]));
  }
};
