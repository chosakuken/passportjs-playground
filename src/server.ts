import { type Express, type Request, type Response } from "express";
import { setupExpress } from "./configs/express.js";
import { setupSequelize } from "./configs/sequelize.js";

const app: Express = setupExpress();
const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.render("home", {
    username: "admin",
  });
});

app.get("/signin", (req: Request, res: Response) => {
  res.render("signin");
});

app.get("/signup", (req: Request, res: Response) => {
  res.render("signup");
});

async function main() {
  await setupSequelize();
  app.listen(PORT, () => {
    console.log("Example app listening on port" + String(PORT));
  });
}

main().catch((e: unknown) => {
  console.error(e);
});
