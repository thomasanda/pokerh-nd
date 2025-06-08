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

export enum HandTypeRank {
  HøytKort = 1,
  Par,
  ToPar,
  TreLike,
  Straight,
  Flush,
  FulltHus,
  FireLike,
  StraightFlush,
}

export const HandTypeRankMap: Record<string, HandTypeRank> = {
  [HandType.HøytKort]: HandTypeRank.HøytKort,
  [HandType.Par]: HandTypeRank.Par,
  [HandType.ToPar]: HandTypeRank.ToPar,
  [HandType.TreLike]: HandTypeRank.TreLike,
  [HandType.Straight]: HandTypeRank.Straight,
  [HandType.Flush]: HandTypeRank.Flush,
  [HandType.FulltHus]: HandTypeRank.FulltHus,
  [HandType.FireLike]: HandTypeRank.FireLike,
  [HandType.StraightFlush]: HandTypeRank.StraightFlush,
};

export type TInputHand = TPokerHand & { id: number };
