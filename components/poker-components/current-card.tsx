import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { pokerApi, usePokerApi } from "@/lib/api/poker-api";
import {
  ActionsType,
  type TReducerAction,
  type TPlayingCard,
  type TPokerHand,
} from "@/store/poker-hand-reducer";
import { Shuffle } from "lucide-react";
import {
  getRank,
  getSuitColor,
  getSuitSymbol,
} from "@/lib/helpers/get-card-suit.helpers";

type TCurrentCardProps = {
  dispatch: React.ActionDispatch<[action: TReducerAction]>;
  currentHand: TPokerHand | null;
  previousHands: TPokerHand[];
};

const CurrentCard = ({
  dispatch,
  currentHand,
  previousHands,
}: TCurrentCardProps) => {
  const { loading, call } = usePokerApi();

  const handleGenerateNewHand = async () => {
    try {
      const result = await call(pokerApi.generateNewHand);
      if (result) {
        dispatch({ type: ActionsType.SetCurrentHand, payload: result });
        dispatch({
          type: ActionsType.SetPreviousHands,
          payload: [result, ...previousHands],
        });
        dispatch({ type: ActionsType.SetComparisonResult, payload: null });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Nåværende Hånd</CardTitle>
          <Button
            disabled={loading}
            onClick={handleGenerateNewHand}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
          >
            <Shuffle className="mr-2 h-4 w-4" />
            Generer pokerhånd
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {currentHand ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {currentHand.hand.map((card: TPlayingCard, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 shadow-lg border-2 border-gray-200 min-w-[80px] text-center transform hover:scale-105 transition-transform"
                >
                  <div
                    className={`text-2xl font-bold ${getSuitColor(card.suit)} mr-10`}
                  >
                    {getRank(card.rank)}
                  </div>
                  <div className={`text-3xl ${getSuitColor(card.suit)}`}>
                    {getSuitSymbol(card.suit)}
                  </div>
                  <div
                    className={`text-2xl font-bold ${getSuitColor(card.suit)} ml-10 rotate-180`}
                  >
                    {getRank(card.rank)}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Badge
                variant="secondary"
                className="text-lg px-4 py-2 bg-white/20 text-white"
              >
                {currentHand.handType}
              </Badge>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-white/60">
            <Shuffle className="mx-auto h-12 w-12 mb-4" />
            <p>Klikk "Generer pokerhånd" for å starte!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrentCard;
