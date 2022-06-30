import request from "supertest";
import app from "../../index";

test("Adding a message", async () => {
    await request(app)
        .post("/api/v1/messages")
        .send({
            "user": "1",
            "message": "hi"
        })
        .expect(201)
});
