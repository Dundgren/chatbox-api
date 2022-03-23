import { MessageHandler } from "../../helpers/message-handler";
import { Message } from "../../helpers/message";

let messageHandler: MessageHandler;

beforeEach(() => {
    messageHandler = new MessageHandler();
});

test("Adding a message to MessageHandler", () => {
    messageHandler.addMessage("MyUsername", "My Message");

    expect(
        messageHandler.messages[0]
    ).toBeInstanceOf(Message);
});
