import type { TPokerHand } from "@/server/types/poker-types";
import type { Database } from "better-sqlite3";
import { TPokerHandDbType } from "@/database/sqlite/types/poker-types.db";

export const insertNewHand = (db: Database, hand: TPokerHand) => {
  return db
    .prepare(
      "INSERT INTO hands (hand, hand_type) VALUES (?, ?) RETURNING id, hand, hand_type",
    )
    .get(JSON.stringify(hand.hand), hand.handType);
};

export const getAllHands = (db: Database) => {
  return db
    .prepare("SELECT id, hand, hand_type FROM hands ORDER BY id DESC")
    .all();
};

export const getHandsById = (db: Database, ids: number[]) => {
  const placeholders = ids.map(() => "?").join(",");
  const rows = db
    .prepare(
      `SELECT id, hand, hand_type FROM hands WHERE id IN (${placeholders})`,
    )
    .all(ids) as TPokerHandDbType[];

  return rows.map((row: TPokerHandDbType) => ({
    id: row.id,
    hand: JSON.parse(row.hand),
    handType: row.hand_type,
  }));
};
