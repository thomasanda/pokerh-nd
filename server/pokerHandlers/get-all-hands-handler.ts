import { Get, UniversalHandler } from "@universal-middleware/core";
import type { db as sqliteDb } from "@/database/sqlite/db";
import * as sqliteQueries from "@/database/sqlite/queries/hands";
import { TPokerHandDbType } from "@/database/sqlite/types/poker-types.db";

export const getAllHandsHandler: Get<
  [],
  UniversalHandler<Universal.Context & { db: ReturnType<typeof sqliteDb> }>
> = () => async (_request, _context) => {
  const results = sqliteQueries.getAllHands(_context.db) as TPokerHandDbType[];

  const hands = results.map((row) => ({
    id: row.id,
    hand: JSON.parse(row.hand),
    handType: row.hand_type,
  }));

  return new Response(JSON.stringify({ status: "OK", hands }), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
};
