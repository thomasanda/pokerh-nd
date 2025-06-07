import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shuffle, Trophy, Zap } from "lucide-react";

type PlayingCard = {
  suit: "h" | "r" | "k" | "s";
  rank: string;
  value: number;
};

type PokerHand = {
  id: string;
  hand: PlayingCard[];
  handType: string;
  timestamp: Date;
};

export default function Page() {
  const [previousHands, setPreviousHands] = useState<PokerHand[]>([]);
  const [selectedHands, setSelectedHands] = useState<Set<string>>(new Set());
  const [currentHand, setCurrentHand] = useState<any>(null);
  const [comparisonResult, setComparisonResult] = useState<{
    winner: PokerHand;
    hands: PokerHand[];
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSelectHand = (handId: string) => {
    const newSelected = new Set(selectedHands);
    if (newSelected.has(handId)) {
      newSelected.delete(handId);
    } else {
      newSelected.add(handId);
    }
    setSelectedHands(newSelected);
    setComparisonResult(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/poker/all-hands", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setPreviousHands(result.hands);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);
  const getSuitSymbol = (suit: string) => {
    switch (suit) {
      case "h":
        return "♥";
      case "r":
        return "♦";
      case "k":
        return "♣";
      case "s":
        return "♠";
      default:
        return "";
    }
  };

  const getSuitColor = (suit: string) => {
    return suit === "h" || suit === "r" ? "text-red-500" : "text-black";
  };

  const getRank = (rank: string) => {
    switch (rank) {
      case "t":
        return "10";
      default:
        return rank.toUpperCase();
    }
  };

  const handleGenerateNewHand = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch("/api/poker/new-hand");
      const result = await response.json();
      if (result.status === "OK") {
        setIsGenerating(false);
        setCurrentHand(result.result);
        if (currentHand) {
          setPreviousHands((prev) => [...prev, result.result]);
        }
      }
    } catch (e) {
      setIsGenerating(false);
      console.error(e);
    }
  };

  const handleDisplayHand = (hand: PokerHand) => {
    setCurrentHand(hand);
    setComparisonResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-2">
            <Zap className="h-8 w-8 text-yellow-400" />
            Pokerhånd Generator
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Nåværende Hånd</CardTitle>
                  <Button
                    onClick={handleGenerateNewHand}
                    disabled={isGenerating}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                  >
                    <Shuffle className="mr-2 h-4 w-4" />
                    {isGenerating ? "Deler ut..." : "Del ny pokerhånd"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {currentHand ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-3 justify-center">
                      {currentHand.hand.map(
                        (card: PlayingCard, index: number) => (
                          <div
                            key={index}
                            className="bg-white rounded-lg p-3 shadow-lg border-2 border-gray-200 min-w-[80px] text-center transform hover:scale-105 transition-transform"
                          >
                            <div
                              className={`text-2xl font-bold ${getSuitColor(card.suit)}`}
                            >
                              {getRank(card.rank)}
                            </div>
                            <div
                              className={`text-3xl ${getSuitColor(card.suit)}`}
                            >
                              {getSuitSymbol(card.suit)}
                            </div>
                          </div>
                        ),
                      )}
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
                    <p>Klikk "Del ny pokerhånd" for å starte!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Comparison Result */}
            {comparisonResult && (
              <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 border-yellow-300">
                <CardHeader>
                  <CardTitle className="text-black flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Comparison Result
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-black font-semibold text-lg">
                      Winner: {comparisonResult.winner.handType}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {comparisonResult.winner.hand.map((card, index) => (
                        <div
                          key={index}
                          className="bg-white rounded p-2 shadow text-center min-w-[60px]"
                        >
                          <div
                            className={`text-sm font-bold ${getSuitColor(card.suit)}`}
                          >
                            {getRank(card.rank)}
                          </div>
                          <div className={`text-lg ${getSuitColor(card.suit)}`}>
                            {getSuitSymbol(card.suit)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Previous Hands Sidebar */}
          <div className="space-y-4">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Tidligere hender</CardTitle>
                <div className="flex gap-2">
                  <Button
                    // onClick={handleCompareHands}
                    disabled={selectedHands.size < 2}
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Sammenlign hender ({selectedHands.size})
                  </Button>
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
                          <input
                            type="checkbox"
                            checked={selectedHands.has(hand.id)}
                            onChange={(e) => {
                              e.stopPropagation();
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
                                className={`font-bold ${getSuitColor(card.suit)}`}
                              >
                                {getRank(card.rank)}
                              </div>
                              <div className={getSuitColor(card.suit)}>
                                {getSuitSymbol(card.suit)}
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
        </div>
      </div>
    </div>
  );
}
