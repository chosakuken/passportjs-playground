import { type Express, type Request, type Response } from "express";
import { setupExpress } from "./configs/express.js";

const app: Express = setupExpress();
const PORT = 3000;
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("Example app listening on port" + String(PORT));
});
