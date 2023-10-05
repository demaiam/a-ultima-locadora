import prisma from "database";
import { faker } from "@faker-js/faker";

export async function createMovie(forAdults: boolean) {
  return prisma.movie.create({
    data: {
      name: faker.lorem.words(),
      adultsOnly: forAdults
    }
  })
}