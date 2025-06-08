export type TPlayingCard = {
  suit: "h" | "r" | "k" | "s";
  rank: string;
  value: number;
};

export type TPokerHand = {
  id: string;
  hand: TPlayingCard[];
  handType: string;
  timestamp: Date;
};

export enum ActionsType {
  SetPreviousHands = "SetPreviousHands",
  SetSelectedHands = "SetSelectedHands",
  SetCurrentHand = "SetCurrentHand",
  SetComparisonResult = "SetComparisonResult",
}

export type TState = {
  previousHands: TPokerHand[];
  selectedHands: Set<string>;
  currentHand: TPokerHand | null;
  comparisonResult: TPokerHand | null;
};

export type TReducerAction =
  | { type: ActionsType.SetPreviousHands; payload: TPokerHand[] | [] }
  | { type: ActionsType.SetSelectedHands; payload: Set<string> }
  | { type: ActionsType.SetCurrentHand; payload: TPokerHand | null }
  | { type: ActionsType.SetComparisonResult; payload: TPokerHand | null };

export const pokerHandReducer = (
  state: TState,
  action: TReducerAction,
): TState => {
  switch (action.type) {
    case ActionsType.SetPreviousHands:
      return { ...state, previousHands: action.payload };
    case ActionsType.SetSelectedHands:
      return { ...state, selectedHands: action.payload };
    case ActionsType.SetCurrentHand:
      return { ...state, currentHand: action.payload };
    case ActionsType.SetComparisonResult:
      return { ...state, comparisonResult: action.payload };
    default:
      return state;
  }
};
