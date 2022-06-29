import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { messageRouter } from "./routes/message-router";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/messages", messageRouter);

app.get("/", (req, res) => {
    res.send("Up and running");
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`[server]: Server is running at ${PORT}`);
    });
}

export default app;
