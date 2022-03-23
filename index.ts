import express from "express";
import bodyParser from "body-parser";
import { messageRouter } from "./routes/message-router";

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/message", messageRouter);

app.get("/", (req, res) => {
    res.send("Up and running");
});

app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
