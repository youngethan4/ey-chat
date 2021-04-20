import request from "supertest";
import app from "../../app";
import Group from "../../models/group";
import Participant from "../../models/participant";
import mongoose from "mongoose";

it("Errors with no userId", async () => {
  const group = Group.build({ name: "new" });
  await group.save();

  await request(app)
    .post(`/api/groups/${group.id}/participants`)
    .set("Cookie", global.signup())
    .send()
    .expect(400);
});

it("creates a participant", async () => {
  const group = Group.build({ name: "new" });
  await group.save();

  const { body: participant } = await request(app)
    .post(`/api/groups/${group.id}/participants`)
    .set("Cookie", global.signup())
    .send({ username: "fdsafdsafd" })
    .expect(201);

  const storedParticipant = await Participant.findById(participant.id);
  expect(storedParticipant!.username).toEqual(participant.username);
});

it("errors with invalid group id", async () => {
  const groupId = mongoose.Types.ObjectId().toHexString();

  await request(app)
    .post(`/api/groups/${groupId}/participants`)
    .set("Cookie", global.signup())
    .send({ username: "fdsafdsafd" })
    .expect(400);
});
