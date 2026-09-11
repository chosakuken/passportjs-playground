import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// 実行ディレクトリの解決
const APP_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

// 設定済み Express インスタンスを返す
export function setupExpress() {
  const app = express();
  app.set("view engine", "ejs");
  app.set("views", path.join(APP_DIR, "views"));
  return app;
}
