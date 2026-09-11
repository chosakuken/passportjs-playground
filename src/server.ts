import {
  type Express,
  type Request,
  type RequestHandler,
  type Response,
} from "express";
import { setupExpress } from "./configs/express.js";
import { setupSequelize } from "./configs/sequelize.js";
import { UserModel } from "./models/user.js";
import { setupPassport } from "./configs/passport.js";
import passport from "passport";

const app: Express = setupExpress();
const PORT = 3000;

type authBody = {
  username: string;
  password: string;
};

const authHundler = passport.authenticate("basic", {
  session: false,
}) as RequestHandler;

app.get("/", authHundler, (req: Request, res: Response) => {
  const me = req.user as UserModel;
  res.render("home", {
    username: me.username,
  });
});

app.get("/signin", (req: Request, res: Response) => {
  res.render("signin");
});

app.get("/signup", (req: Request, res: Response) => {
  res.render("signup");
});

app.post(
  "/signup",
  async (req: Request<"", unknown, authBody>, res: Response) => {
    const username: string = req.body.username;
    const password: string = req.body.password;
    await UserModel.create({
      username,
      password,
    });
    res.redirect("/signin");
  },
);

async function main() {
  await setupSequelize();
  setupPassport();
  app.listen(PORT, () => {
    console.log("Example app listening on port" + String(PORT));
  });
}

main().catch((e: unknown) => {
  console.error(e);
});
