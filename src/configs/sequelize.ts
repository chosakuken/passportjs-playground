import { Sequelize } from "sequelize";
import { UserAttributes, UserModel } from "../models/user.js";

// sequelize のインスタンス化
export const sequelize = new Sequelize({
  dialect: "sqlite", // DB の種類
  storage: "./db/database.db", // SQLite を置く場所
});

// sequelize を作るための関数
export async function setupSequelize() {
  try {
    await sequelize.authenticate(); // 接続を確立する(ガバガバ理解)
    console.log("Connection Success");
  } catch (e) {
    console.error("Connection Error: " + String(e));
    return;
  }
  UserModel.init(UserAttributes, {
    sequelize,
    tableName: "users",
  });
  await sequelize.sync(); // テーブル設定を同期する
  console.log("Sequelize config done");
}
