export type TCard = {
  suit: "h" | "r" | "k" | "s";
  rank: string;
  value: number;
};

export type TPokerHand = {
  hand: TCard[];
  handType: string;
};

export enum HandType {
  StraightFlush = "Straight flush",
  FireLike = "Fire like",
  FulltHus = "Fullt hus",
  Flush = "Flush",
  Straight = "Straight",
  TreLike = "Tre like",
  ToPar = "To par",
  Par = "Par",
  HøytKort = "Høyt kort",
}
