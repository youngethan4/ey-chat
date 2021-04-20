import request from "supertest";
import app from "../../app";
import Group from "../../models/group";
import Participant from "../../models/participant";

const GROUP_ENDPOINT = "/api/groups";

it("Errors with no name sent", async () => {
  await request(app)
    .post(GROUP_ENDPOINT)
    .set("Cookie", global.signup())
    .send({})
    .expect(400);
});

it("Creates a new group with no participants", async () => {
  const { body: group } = await request(app)
    .post(GROUP_ENDPOINT)
    .set("Cookie", global.signup())
    .send({ name: "new" })
    .expect(201);

  const storedGroup = await Group.findById(group.id);

  expect(storedGroup).not.toBeNull();
  expect(storedGroup!.name).toEqual(group.name);
});

it("creates a new group with participants", async () => {
  const newGroup = {
    name: "new",
    users: ["fdareafds", "ffesefds", "fdaefdse", "fdaesdfe"],
  };

  const { body: group } = await request(app)
    .post(GROUP_ENDPOINT)
    .set("Cookie", global.signup())
    .send(newGroup)
    .expect(201);

  const storedGroup = await Group.findById(group.id);
  const storedParticipant = await Participant.findOne({
    username: newGroup.users[0],
  }).populate("group");

  expect(storedGroup).not.toBeNull();
  expect(storedGroup!.name).toEqual(group.name);
  expect(storedParticipant).not.toBeNull();
  expect(storedParticipant!.group.name).toEqual(group.name);
});
