import "dotenv/config";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { createTodoHandler } from "./server/create-todo-handler";
import { vikeHandler } from "./server/vike-handler";
import { createHandler, createMiddleware } from "@universal-middleware/express";
import { dbMiddleware } from "./server/db-middleware";
import express from "express";
import { createDevMiddleware } from "vike";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = __dirname;
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const hmrPort = process.env.HMR_PORT ? parseInt(process.env.HMR_PORT, 10) : 24678;

export default (await startServer()) as unknown;

async function startServer() {
  const app = express();

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(`${root}/dist/client`));
  } else {
    // Instantiate Vite's development server and integrate its middleware to our server.
    // ⚠️ We should instantiate it *only* in development. (It isn't needed in production
    // and would unnecessarily bloat our server in production.)
    const viteDevMiddleware = (
      await createDevMiddleware({
        root,
        viteConfig: {
          server: { hmr: { port: hmrPort } },
        },
      })
    ).devMiddleware;
    app.use(viteDevMiddleware);
  }

  app.use(createMiddleware(dbMiddleware)());

  app.post("/api/todo/create", createHandler(createTodoHandler)());

  /**
   * Vike route
   *
   * @link {@see https://vike.dev}
   **/
  app.all("{*vike}", createHandler(vikeHandler)());

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });

  return app;
}
