import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";

const GROUP_ENDPOINT = "/api/groups";
const INDEX_PARTICIPANTS_ENDPOINT = "/api/participants/groups";

it("gathers all current user's groups", async () => {
  const username = "test-user";
  const user = global.signup({ username });

  await request(app)
    .post(GROUP_ENDPOINT)
    .set("Cookie", user)
    .send({ name: "new", users: [username] })
    .expect(201);
  await request(app)
    .post(GROUP_ENDPOINT)
    .set("Cookie", user)
    .send({ name: "test", users: [username] })
    .expect(201);

  const { body: groups } = await request(app)
    .get(INDEX_PARTICIPANTS_ENDPOINT)
    .set("Cookie", user)
    .send()
    .expect(200);
  expect(groups).toHaveLength(2);
});
