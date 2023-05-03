// import request from "supertest";
// import app from "./app";
// import mongoose from "mongoose";
// import { MONGODB_URL } from "./config";

// // Configura la conexión a MongoDB antes de que se ejecuten las pruebas
// beforeAll(async () => {
//   await mongoose.connect(MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });

// // Cierra la conexión a MongoDB después de que se hayan ejecutado las pruebas
// afterAll(async () => {
//   await mongoose.connection.close();
// });

// // Resto de tus pruebas aquí
// // ...

// describe("users", () => {
//   //   it("creates a new user", async () => {
//   //     Aumentar el límite de tiempo a 10 segundos (10000 ms)
//   //     jest.setTimeout(10000);

//   //     const response = await request(app)
//   //       .post("/api/auth/signup")
//   //       .send({
//   //         username: "williams3",
//   //         email: "williams3@gmail.com",
//   //         password: "soto1023",
//   //         roles: ["admin"], // Utiliza el nombre de rol "admin" junto con la ID del rol como valor
//   //       })
//   //       .set("Accept", "application/json");

//   //     expect(response.status).toBe(200); // Verificar que la respuesta tenga un estado HTTP 200 OK
//   //     expect(response.body.username).toBe("williams3"); // Verificar que el nombre de usuario sea "williams"
//   //     expect(response.body.email).toBe("williams3@gmail.com"); // Verificar que el correo electrónico sea "williams@gmail.com"
//   //     expect(response.body.password).not.toBe("soto1023"); // Verificar que la contraseña no sea igual a "soto1023" (porque debería haber sido encriptada)
//   //     expect(response.body.roles).toEqual(
//   //       expect.arrayContaining([expect.any(String)])
//   //     ); // Verificar que la respuesta contiene una ID de rol en formato de cadena
//   //   });

//   it("log an user", async () => {
//     // Aumentar el límite de tiempo a 10 segundos (10000 ms)
//     jest.setTimeout(10000);

//     const response = await request(app)
//       .post("/api/auth/signin")
//       .send({
//         email: "williams3@gmail.com",
//         password: "soto1023",
//       })
//       .set("Accept", "application/json");

//     expect(response.status).toBe(200); // Verificar que la respuesta tenga un estado HTTP 200 OK
//     // expect(response.body.userFound.email).toBe("williams3@gmail.com"); // Verificar que el correo electrónico sea "williams@gmail.com"
//     // expect(response.body.userFound.password).not.toBe("soto1023"); // Verificar que la contraseña no sea igual a "soto1023" (porque debería haber sido encriptada)
//   });

//   //   it("GET users", async () => {
//   //     Aumentar el límite de tiempo a 10 segundos (10000 ms)
//   //     jest.setTimeout(10000);

//   //     const response = await request(app)
//   //       .get("/api/users")
//   //       .set(
//   //         "x-access-token",
//   //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTE1ODMzMzljNTFhNjI3NWI3NTQ3MiIsImlhdCI6MTY4MzA3NjY3MSwiZXhwIjoxNjgzMTYzMDcxfQ.AkNKJLpFcnfoWOlBBRLMQoV0-hrsVG7HQcgM17_aCTU"
//   //       );

//   //     expect(response.status).toBe(200); // Verificar que la respuesta tenga un estado HTTP 200 OK
//   //     expect(response.body.userFound.email).toBe("williams3@gmail.com"); // Verificar que el correo electrónico sea "williams@gmail.com"
//   //     expect(response.body.userFound.password).not.toBe("soto1023"); // Verificar que la contraseña no sea igual a "soto1023" (porque debería haber sido encriptada)
//   //   });

//   //   it("PATCH user by ID", async () => {
//   //     jest.setTimeout(10000);

//   //     const userId = "644871b066daf7ca5f2ecbae"; // reemplaza "yourUserId" con el ID del usuario que deseas actualizar

//   //     const response = await request(app)
//   //       .patch(`/api/users/${userId}`) // usa el endpoint que corresponde a la actualización del usuario con la ID proporcionada
//   //       .set(
//   //         "x-access-token",
//   //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTE1ODMzMzljNTFhNjI3NWI3NTQ3MiIsImlhdCI6MTY4MzA3NjY3MSwiZXhwIjoxNjgzMTYzMDcxfQ.AkNKJLpFcnfoWOlBBRLMQoV0-hrsVG7HQcgM17_aCTU"
//   //       ) // si es necesario, establece el token de acceso en el header correspondiente
//   //       .send({ username: "John" }); // envía los datos que deseas actualizar en el cuerpo de la solicitud

//   //     expect(response.status).toBe(200);
//   //   });

//   //   it("DELETE user by ID", async () => {
//   //     jest.setTimeout(10000);

//   //     const userId = "64487269253c44d27d55805a"; // reemplaza "yourUserId" con el ID del usuario que deseas eliminar

//   //     const response = await request(app)
//   //       .delete(`/api/users/${userId}`) // usa el endpoint que corresponde a la eliminación del usuario con la ID proporcionada
//   //       .set(
//   //         "x-access-token",
//   //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTE1ODMzMzljNTFhNjI3NWI3NTQ3MiIsImlhdCI6MTY4MzA3NjY3MSwiZXhwIjoxNjgzMTYzMDcxfQ.AkNKJLpFcnfoWOlBBRLMQoV0-hrsVG7HQcgM17_aCTU"
//   //       ); // si es necesario, establece el token de acceso en el header correspondiente

//   //     expect(response.status).toBe(200);
//   //   });
// });

// // describe("ads", () => {
// //   it("create a new ad", async () => {
// //     // Aumentar el límite de tiempo a 10 segundos (10000 ms)
// //     jest.setTimeout(10000);

// //     const response = await request(app)
// //       .post("/api/ads")
// //       .send({
// //         titulo: "hola",
// //         descripcion: "soy nuevo",
// //         tipo: "noticias",
// //         set: "activo",
// //       })
// //       .set(
// //         "x-access-token",
// //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTE1ODMzMzljNTFhNjI3NWI3NTQ3MiIsImlhdCI6MTY4MzA3NjY3MSwiZXhwIjoxNjgzMTYzMDcxfQ.AkNKJLpFcnfoWOlBBRLMQoV0-hrsVG7HQcgM17_aCTU"
// //       );

// //     expect(response.status).toBe(201); // Verificar que la respuesta tenga un estado HTTP 200 OK
// //   });

// //   //   it("GET ads", async () => {
// //   //     // Aumentar el límite de tiempo a 10 segundos (10000 ms)
// //   //     jest.setTimeout(10000);

// //   //     const response = await request(app).get("/api/ads");
// //   //     // .set(
// //   //     //   "x-access-token",
// //   //     //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDg3MjY5MjUzYzQ0ZDI3ZDU1ODA1YSIsImlhdCI6MTY4Mjk1NTA3MiwiZXhwIjoxNjgzMDQxNDcyfQ.mPfylSx_fF19WGj7y0RLm1PTfGNtTxoOReuFlJTQ_2M"
// //   //     // );

// //   //     expect(response.status).toBe(200); // Verificar que la respuesta tenga un estado HTTP 200 OK
// //   //     // expect(response.body.userFound.email).toBe("williams3@gmail.com"); // Verificar que el correo electrónico sea "williams@gmail.com"
// //   //     // expect(response.body.userFound.password).not.toBe("soto1023"); // Verificar que la contraseña no sea igual a "soto1023" (porque debería haber sido encriptada)
// //   //   });

// //   //   it("PATCH ad by ID", async () => {
// //   //     jest.setTimeout(10000);

// //   //     const adId = "640a6c8194eb8ffefae46b06"; // reemplaza "yourUserId" con el ID del usuario que deseas actualizar

// //   //     const response = await request(app)
// //   //       .patch(`/api/ads/${adId}`) // usa el endpoint que corresponde a la actualización del usuario con la ID proporcionada
// //   //       .send({
// //   //         titulo: "PRIMER ANUNCIO",
// //   //         descripcion: "soy PRIMER ANUNCIO",
// //   //         tipo: "noticias",
// //   //         set: "activo",
// //   //       })
// //   //       .set(
// //   //         "x-access-token",
// //   //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTE1ODMzMzljNTFhNjI3NWI3NTQ3MiIsImlhdCI6MTY4MzA3NjY3MSwiZXhwIjoxNjgzMTYzMDcxfQ.AkNKJLpFcnfoWOlBBRLMQoV0-hrsVG7HQcgM17_aCTU"
// //   //       );

// //   //     expect(response.status).toBe(200);
// //   //   });

// //   //   it("DELETE ad by ID", async () => {
// //   //     jest.setTimeout(10000);

// //   //     const adId = "645158aeeaf38f02fff35ad9"; // reemplaza "yourUserId" con el ID del usuario que deseas eliminar

// //   //     const response = await request(app)
// //   //       .delete(`/api/ads/${adId}`) // usa el endpoint que corresponde a la eliminación del usuario con la ID proporcionada
// //   //       .set(
// //   //         "x-access-token",
// //   //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NTE1ODMzMzljNTFhNjI3NWI3NTQ3MiIsImlhdCI6MTY4MzA1MjYxNCwiZXhwIjoxNjgzMTM5MDE0fQ.GZxxtcVLHfUMh9fg1W9NyWvEGRwEI2kNimfG-f428oM"
// //   //       ); // si es necesario, establece el token de acceso en el header correspondiente

// //   //     expect(response.status).toBe(201);
// //   //   });
// // });
