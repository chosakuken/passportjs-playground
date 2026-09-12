import passport from "passport";
import { DigestStrategy } from "passport-http";
import { UserModel } from "../models/user.js";

export function setupPassport() {
  // Digest 認証を用いる
  passport.use(
    new DigestStrategy({ qop: "auth" }, async (username, done) => {
      let user;
      try {
        user = await UserModel.findOne({
          where: {
            username: username,
          },
        });
      } catch (error) {
        done(error, false);
        return;
      }
      if (!user) {
        done(null, false);
        return;
      }
      // コールバックでパスワードの検証をする
      done(null, user, user.password);
    }),
  );
}
