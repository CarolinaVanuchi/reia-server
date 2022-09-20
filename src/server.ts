import express, {json} from "express";
import { db } from "./database/db";
import { router } from "./routes/routes";

const app = express();
app.use(json());
app.use(router);

app.get('/', (req, res) => {
    res.status(200).json("Wellcome...");
});

app.listen(80, async () => {
    await db.sync();
    console.log(`Server running ${process.env.PROJECT_NAME}`);
});