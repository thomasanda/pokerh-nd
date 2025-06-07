import type { TPokerHand } from "@/server/types/poker-types";
import type { Database } from "better-sqlite3";

export const insertNewHand = (db: Database, hand: TPokerHand) => {
  return db
    .prepare(
      "INSERT INTO hands (hand, hand_type) VALUES (?, ?) RETURNING id, hand, hand_type",
    )
    .get(JSON.stringify(hand.hand), hand.handType);
};

export const getAllHands = (db: Database) => {
  return db.prepare("SELECT id, hand, hand_type FROM hands").all();
};
