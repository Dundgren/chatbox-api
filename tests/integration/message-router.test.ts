import request from "supertest";
import app from "../../index";

test("Adding a message", async () => {
    await request(app)
        .post("/api/v1/message")
        .send(JSON.stringify({
            username: "Dundgren",
            message: "Hellooo"
        }))
        .expect(200)
});
