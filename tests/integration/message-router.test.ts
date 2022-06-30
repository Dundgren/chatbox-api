import request from "supertest";
import app from "../../index";

test("Adding a message", async () => {
    await request(app)
        .post("/api/v1/message")
        .send(JSON.stringify({
            user: "1",
            message: "Hellooo",
        }))
        .expect(201)
});
