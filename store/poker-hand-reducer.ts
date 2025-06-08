export type TPlayingCard = {
  suit: "h" | "r" | "k" | "s";
  rank: string;
  value: number;
};

export type TPokerHand = {
  id: number;
  hand: TPlayingCard[];
  handType: string;
  timestamp: Date;
};

export enum ActionsType {
  SetPreviousHands = "SetPreviousHands",
  SetSelectedHands = "SetSelectedHands",
  SetCurrentHand = "SetCurrentHand",
  SetComparisonResult = "SetComparisonResult",
  UpdateCurrentAndPrevious = "UpdateCurrentAndPrevious",
}

export type TState = {
  previousHands: TPokerHand[];
  selectedHands: Set<number>;
  currentHand: TPokerHand | null;
  comparisonResult: TPokerHand | null;
};

export type TReducerAction =
  | { type: ActionsType.SetPreviousHands; payload: TPokerHand[] | [] }
  | { type: ActionsType.SetSelectedHands; payload: Set<number> }
  | { type: ActionsType.SetCurrentHand; payload: TPokerHand | null }
  | { type: ActionsType.SetComparisonResult; payload: TPokerHand | null }
  | {
      type: ActionsType.UpdateCurrentAndPrevious;
      payload: { result: TPokerHand; previousHands: TPokerHand[] };
    };

export const pokerHandReducer = (
  state: TState,
  action: TReducerAction,
): TState => {
  switch (action.type) {
    case ActionsType.SetPreviousHands:
      return { ...state, previousHands: action.payload };
    case ActionsType.SetSelectedHands:
      return {
        ...state,
        selectedHands: action.payload,
        comparisonResult: null,
      };
    case ActionsType.SetCurrentHand:
      return { ...state, currentHand: action.payload, comparisonResult: null };
    case ActionsType.SetComparisonResult:
      return { ...state, comparisonResult: action.payload };
    case ActionsType.UpdateCurrentAndPrevious:
      return {
        ...state,
        currentHand: action.payload.result,
        previousHands: [action.payload.result, ...action.payload.previousHands],
        comparisonResult: null,
        selectedHands: new Set<number>(),
      };
    default:
      return state;
  }
};
