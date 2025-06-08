import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getRank,
  getSuitColor,
  getSuitSymbol,
} from "@/lib/helpers/get-card-suit.helpers";
import { TPokerHand } from "@/store/poker-hand-reducer";
import { Trophy } from "lucide-react";

const ComparisonResult = ({
  comparisonResult,
}: {
  comparisonResult: TPokerHand | null;
}) => {
  return (
    <>
      {comparisonResult && (
        <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 border-yellow-300">
          <CardHeader>
            <CardTitle className="text-black flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Resultat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-black font-semibold text-lg">
                Vinner: {comparisonResult.handType}
              </div>
              <div className="flex flex-wrap gap-2">
                {comparisonResult.hand.map((card, index) => (
                  <div
                    key={index}
                    className="bg-white rounded p-2 shadow text-center min-w-[60px]"
                  >
                    <div
                      className={`text-sm font-bold ${getSuitColor(card.suit)} mr-6`}
                    >
                      {getRank(card.rank)}
                    </div>
                    <div className={`text-lg ${getSuitColor(card.suit)}`}>
                      {getSuitSymbol(card.suit)}
                    </div>
                    <div
                      className={`text-sm font-bold ${getSuitColor(card.suit)} ml-6 rotate-180`}
                    >
                      {getRank(card.rank)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ComparisonResult;
