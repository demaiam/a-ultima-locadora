import { createUser } from "../factories/user-factory";
import rentalsRepository from "repositories/rentals-repository";
import rentalsService from "services/rentals-service";
import moviesRepository from "repositories/movies-repository";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Rentals Service Unit Tests", () => {
  it("should return an error if more than 4 movies are rented", async () => {
   /*
    
   */
  })

  it("should return an error if user has a pending rental", async () => {
    jest.spyOn(rentalsRepository, "getRentalsByUserId").mockImplementationOnce((): any => {
      return [
        { id: 1, closed: false, date: new Date(), endDate: new Date(), userId: 1 }
      ]
    });

    const result = rentalsService.checkUserAbleToRental(1);

    expect(result).rejects.toEqual({
      name: "PendentRentalError",
      message: "Movie rental is pending"
    })

  })

  it("should return an error if user is underage and is trying to rent an adult movie", async () => {
    const user = await createUser(new Date("2010-01-01"));

    jest.spyOn(moviesRepository, "getById").mockImplementationOnce((): any => {
      return {
        id: 1,
        name: "Lorem Ipsum",
        adultsOnly: false
      }
    });

    const result = rentalsService.checkMoviesValidForRental([1], user);
    expect(result).rejects.toEqual({
      name: "InsufficientAgeError",
      message: "Insufficient Age"
    })
  })
})