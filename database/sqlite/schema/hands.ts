import "dotenv/config";
import { db } from "../db";

const client = db();

/**
 * SQLite Schema
 * `hands`
 */
client.exec(`CREATE TABLE IF NOT EXISTS hands (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hand TEXT NOT NULL,
    hand_type TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
