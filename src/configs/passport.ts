import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../models/user.js";

export function setupPassport() {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      // LocalStrategy が求めるコールバックがvoid のため、await なし実装
      UserModel.findOne({
        where: {
          username: username,
        },
      })
        .then((user) => {
          if (!user) {
            done(null, false);
            return;
          }
          if (user.password !== password) {
            done(null, false);
            return;
          }
          done(null, user);
        })
        .catch((error: unknown) => {
          done(error, false);
        });
    }),
  );
}
