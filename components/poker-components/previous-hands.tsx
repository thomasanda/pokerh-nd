import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ActionsType,
  TPokerHand,
  TReducerAction,
} from "@/store/poker-hand-reducer";
import { usePokerApi, pokerApi } from "@/lib/api/poker-api";
import {
  getRank,
  getSuitColor,
  getSuitSymbol,
} from "@/lib/helpers/get-card-suit.helpers";
import { Checkbox } from "@/components/ui/checkbox";

type TPreviousHandsProps = {
  previousHands: TPokerHand[];
  dispatch: React.ActionDispatch<[action: TReducerAction]>;
  selectedHands: Set<number>;
};

const PreviousHands = ({
  previousHands,
  dispatch,
  selectedHands,
}: TPreviousHandsProps) => {
  const { call } = usePokerApi();

  const handleDisplayHand = (hand: TPokerHand) => {
    dispatch({ type: ActionsType.SetCurrentHand, payload: hand });
    dispatch({ type: ActionsType.SetComparisonResult, payload: null });
  };

  const handleCompareHands = async () => {
    try {
      const result = await call(() =>
        pokerApi.compareHands(Array.from(selectedHands)),
      );
      dispatch({
        type: ActionsType.SetComparisonResult,
        payload: previousHands.find((hand) => hand.id === result.id) ?? null,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectHand = (handId: number) => {
    const newSelected = new Set(selectedHands);
    if (newSelected.has(handId)) {
      newSelected.delete(handId);
    } else {
      newSelected.add(handId);
    }

    dispatch({ type: ActionsType.SetSelectedHands, payload: newSelected });
    dispatch({ type: ActionsType.SetComparisonResult, payload: null });
  };

  const handleSelectAll = () => {
    let allIds;
    if (selectedHands.size === previousHands.length) {
      allIds = new Set<number>();
    } else {
      allIds = new Set(previousHands.map((h) => h.id));
    }

    dispatch({ type: ActionsType.SetSelectedHands, payload: allIds });
    dispatch({ type: ActionsType.SetComparisonResult, payload: null });
  };
  return (
    <div className="space-y-4">
      <Card className="bg-white/10 backdrop-blur border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Tidligere hender</CardTitle>
          <div className="flex items-center justify-between">
            <Button
              onClick={handleCompareHands}
              disabled={selectedHands.size < 2}
              size="sm"
              className="bg-blue-500 hover:bg-blue-600"
            >
              Sammenlign hender ({selectedHands.size})
            </Button>
            <Checkbox
              className="m-3"
              onCheckedChange={handleSelectAll}
              checked={selectedHands.size === previousHands.length}
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-2">
              {previousHands.map((hand) => (
                <div
                  key={hand.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedHands.has(hand.id)
                      ? "bg-blue-500/20 border-blue-400"
                      : "bg-white/5 border-white/20 hover:bg-white/10"
                  }`}
                  onClick={() => handleDisplayHand(hand)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="outline"
                      className="text-xs text-white border-white/30"
                    >
                      {hand.handType}
                    </Badge>
                    <Checkbox
                      checked={selectedHands.has(hand.id)}
                      onCheckedChange={() => {
                        handleSelectHand(hand.id);
                      }}
                      className="rounded"
                    />
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {hand.hand.map((card, index) => (
                      <div
                        key={index}
                        className="bg-white rounded text-xs p-1 text-center min-w-[30px]"
                      >
                        <div
                          className={`font-bold ${getSuitColor(card.suit)} mr-3`}
                        >
                          {getRank(card.rank)}
                        </div>
                        <div className={getSuitColor(card.suit)}>
                          {getSuitSymbol(card.suit)}
                        </div>
                        <div
                          className={`font-bold ${getSuitColor(card.suit)} rotate-180 ml-3`}
                        >
                          {getRank(card.rank)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {previousHands.length === 0 && (
                <div className="text-center text-white/60 py-8">
                  Ingen hender er generert
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviousHands;
