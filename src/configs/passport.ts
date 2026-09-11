import passport from "passport";
import { BasicStrategy } from "passport-http";
import { UserModel } from "../models/user.js";

export function setupPassport() {
  // Basic 認証を用いる
  passport.use(
    new BasicStrategy(async (username, password, done) => {
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
      if (user.password !== password) {
        done(null, false);
        return;
      }
      done(null, user);
    }),
  );
}
