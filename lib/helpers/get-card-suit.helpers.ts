export const getSuitSymbol = (suit: string) => {
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

export const getSuitColor = (suit: string) => {
  return suit === "h" || suit === "r" ? "text-red-500" : "text-black";
};

export const getRank = (rank: string) => {
  switch (rank) {
    case "t":
      return "10";
    default:
      return rank.toUpperCase();
  }
};
