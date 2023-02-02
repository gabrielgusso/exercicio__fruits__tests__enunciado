import app from "app"
import { FruitInput } from "services/fruits-service"
import supertest from "supertest"

describe("fruit tests", () => {
  it("should create a new fruit", async () => {
    const body: FruitInput = {
      name: "Maçã",
      price: 5,
    }

    const result = await supertest(app).post("/fruits").send(body)

    expect(result.status).toBe(201)
  })

  it("should return 422 if body is invalid", async () => {
    const body =  {
      name: "Maçã",
    }

    const result = await supertest(app).post("/fruits").send(body)

    expect(result.status).toBe(422)
  })

  it("should return 409 if fruit name already exist", async () => {
    const body: FruitInput =  {
      name: "Maçã",
      price: 8,
    }

    const result = await supertest(app).post("/fruits").send(body)

    expect(result.status).toBe(409)
  })

  it("should return all the fruits", async () => {
    const result = await supertest(app).get("/fruits")
    const response = result.body

    expect(response.length).toBe(1)
    expect(result.status).toBe(200)
  })

  it("should return specific fruits", async () => {
    const result = await supertest(app).get("/fruits/1")
    const response = result.body
    const fruitId1 = {
      id: 1,
      name: "Maçã",
      price: 5,
    }
    
    expect(response).toEqual(fruitId1)
    expect(result.status).toBe(200)
  })

  it("should return 401 if id does not exist", async () => {
    const result = await supertest(app).get("/fruits/2")

    expect(result.status).toBe(404)
  })
    

})
