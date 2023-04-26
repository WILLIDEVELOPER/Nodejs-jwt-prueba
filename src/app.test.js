import request from "supertest";
import app from "./app";
import mongoose from "mongoose";
import { MONGODB_URL } from "./config";

// Configura la conexión a MongoDB antes de que se ejecuten las pruebas
beforeAll(async () => {
  await mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Cierra la conexión a MongoDB después de que se hayan ejecutado las pruebas
afterAll(async () => {
  await mongoose.connection.close();
});

// Resto de tus pruebas aquí
// ...

describe("POST /api/auth/signup", () => {
  it("creates a new user", async () => {
    // Aumentar el límite de tiempo a 10 segundos (10000 ms)
    jest.setTimeout(10000);

    const response = await request(app)
      .post("/api/auth/signup")
      .send({
        username: "williams3",
        email: "williams3@gmail.com",
        password: "soto1023",
        roles: ["admin"], // Utiliza el nombre de rol "admin" junto con la ID del rol como valor
      })
      .set("Accept", "application/json");

    expect(response.status).toBe(200); // Verificar que la respuesta tenga un estado HTTP 200 OK
    expect(response.body.username).toBe("williams3"); // Verificar que el nombre de usuario sea "williams"
    expect(response.body.email).toBe("williams3@gmail.com"); // Verificar que el correo electrónico sea "williams@gmail.com"
    expect(response.body.password).not.toBe("soto1023"); // Verificar que la contraseña no sea igual a "soto1023" (porque debería haber sido encriptada)
    expect(response.body.roles).toEqual(
      expect.arrayContaining([expect.any(String)])
    ); // Verificar que la respuesta contiene una ID de rol en formato de cadena
  });
});
