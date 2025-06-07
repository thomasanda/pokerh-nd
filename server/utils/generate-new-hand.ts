import { TCard, TPokerHand } from "../types/poker-types";
import { checkHandType } from "./check-hand-type";

const suits: TCard["suit"][] = ["h", "r", "k", "s"];
const ranks = [
  { rank: "2", value: 2 },
  { rank: "3", value: 3 },
  { rank: "4", value: 4 },
  { rank: "5", value: 5 },
  { rank: "6", value: 6 },
  { rank: "7", value: 7 },
  { rank: "8", value: 8 },
  { rank: "9", value: 9 },
  { rank: "t", value: 10 },
  { rank: "j", value: 11 },
  { rank: "k", value: 12 },
  { rank: "q", value: 13 },
  { rank: "a", value: 14 },
];

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#JavaScript_implementation
const shuffleCards = (deck: TCard[]) => {
  for (let i = deck.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
};

export const generateNewHand = (): TPokerHand => {
  const deck: TCard[] = [];
  for (const suit of suits) {
    for (const { rank, value } of ranks) {
      deck.push({ suit, rank, value });
    }
  }
  shuffleCards(deck);
  const hand = deck.slice(0, 5);
  const handType = checkHandType(hand);
  return { hand, handType };
};
