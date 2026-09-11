import express from "express";
import session from "express-session";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";

// 実行ディレクトリの解決
const APP_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

// 設定済み Express インスタンスを返す
export function setupExpress() {
  const app = express();
  app.set("view engine", "ejs");
  app.set("views", path.join(APP_DIR, "views"));
  app.use(express.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(
    session({
      cookie: {
        httpOnly: false, // JavaScriptからアクセス不可
        maxAge: 3000 * 1000, // 有効期間
        path: "/", // パス
        secure: false, // HTTPでも使用可
        sameSite: "lax",
      }, // 型安全なCOOKIE_OPTIONSを使用
      resave: false,
      saveUninitialized: false,
      secret: "your-session-secret", // 環境変数などから取得するのが良い
    }),
  );
  app.use(passport.session());
  return app;
}
