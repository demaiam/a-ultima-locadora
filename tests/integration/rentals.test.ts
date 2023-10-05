import { cleanDb } from "../utils";
import supertest from "supertest";
import app from "app";
import httpStatus from "http-status";

const api = supertest(app);

beforeEach(() => {
  cleanDb();
})

describe("Rentals Service Integration Tests", () => {
  it("should return 422 if no value is given", async () => {
    const result = await api.post("/rentals").send({});
    expect(result.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });
})