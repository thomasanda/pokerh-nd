import { Get, UniversalHandler } from "@universal-middleware/core";
import * as sqliteQueries from "@/database/sqlite/queries/hands";
import type { db as sqliteDb } from "@/database/sqlite/db";
import { generateNewHand } from "@/server/utils/generate-new-hand";
import type { TPokerHandDbType } from "@/database/sqlite/types/poker-types.db";

export const createNewHandHandler: Get<
  [],
  UniversalHandler<Universal.Context & { db: ReturnType<typeof sqliteDb> }>
> = () => async (_request, _context) => {
  const newHand = generateNewHand();
  const result = sqliteQueries.insertNewHand(
    _context.db,
    newHand,
  ) as TPokerHandDbType;

  const parsedHand = JSON.parse(result.hand);

  return new Response(
    JSON.stringify({
      status: "OK",
      result: {
        id: result.id,
        hand: parsedHand,
        handType: result.hand_type,
      },
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    },
  );
};
