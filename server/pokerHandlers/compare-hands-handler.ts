import { UniversalHandler, Get } from "@universal-middleware/core";
import * as sqliteQueries from "@/database/sqlite/queries/hands";
import { getWinningHand } from "../utils/get-winning-hand";

export const compareHandsHandler: Get<
  [],
  UniversalHandler<Universal.Context & { id: number }>
> = () => async (request, context) => {
  const body = await request.json();
  const hands = sqliteQueries.getHandsById(context.db, body);
  const id = getWinningHand(hands);
  return new Response(
    JSON.stringify({
      status: "OK",
      result: {
        id,
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
