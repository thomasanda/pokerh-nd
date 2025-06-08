import { useEffect, useReducer } from "react";
import {
  ActionsType,
  pokerHandReducer,
  type TPokerHand,
} from "@/store/poker-hand-reducer";
import { usePokerApi, pokerApi } from "@/lib/api/poker-api";
import PreviousHands from "@/components/poker-components/previous-hands";
import ComparisonResult from "@/components/poker-components/comparison-result";
import PokerHeader from "@/components/poker-components/poker-header";
import CurrentCard from "@/components/poker-components/current-card";

const initialState = {
  previousHands: [] as TPokerHand[],
  selectedHands: new Set<number>(),
  currentHand: null,
  comparisonResult: null,
};

export default function Page() {
  const { call } = usePokerApi();
  const [state, dispatch] = useReducer(pokerHandReducer, initialState);
  const { previousHands, selectedHands, currentHand, comparisonResult } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = (await call(pokerApi.getAllHands)) as TPokerHand[];
        dispatch({ type: ActionsType.SetPreviousHands, payload: result });
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <PokerHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <CurrentCard
              dispatch={dispatch}
              currentHand={currentHand}
              previousHands={previousHands}
            />
            <ComparisonResult comparisonResult={comparisonResult} />
          </div>
          <PreviousHands
            previousHands={previousHands}
            dispatch={dispatch}
            selectedHands={selectedHands}
          />
        </div>
      </div>
    </div>
  );
}
