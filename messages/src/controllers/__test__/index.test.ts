import request from "supertest";
import app from "../../app";
import Message from "../../models/message";

const buildMessage = async (payload: string, groupId: string) => {
  const message = Message.build({
    groupId,
    sender: "fdsaf",
    payload,
  });
  await message.save();
};

it("Responds with a group's list of messages", async () => {
  const groupId = "fdagafdadg";
  await buildMessage("Hello there.", groupId);
  await buildMessage("Kenobi...", groupId);
  await buildMessage("I've got a bad feeling about this.", groupId);

  const { body: messages } = await request(app)
    .get(`/api/messages/${groupId}`)
    .set("Cookie", global.signup())
    .send()
    .expect(200);

  expect(messages).toHaveLength(3);
});
