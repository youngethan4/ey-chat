import request from "supertest";
import app from "../../app";

const GROUP_ENDPOINT = "/api/groups";

it("gathers all participants in a group", async () => {
  const newGroup = {
    name: "new",
    users: ["fdareafds", "ffesefds", "fdaefdse", "fdaesdfe"],
  };

  const { body: group } = await request(app)
    .post(GROUP_ENDPOINT)
    .set("Cookie", global.signup())
    .send(newGroup)
    .expect(201);

  const { body: participants } = await request(app)
    .get(`/api/groups/${group.id}/participants`)
    .set("Cookie", global.signup())
    .send()
    .expect(200);
  expect(participants).toHaveLength(4);
  console.log(participants);
});
