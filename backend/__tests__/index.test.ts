
import { describe, expect, test, beforeAll } from '@jest/globals';
import Server from '../src/models/Server';
import request from 'supertest';
import routerUser from "../src/router/user";
import { CorsOptions } from 'cors';

let serverInstance: Server;
beforeAll(() => {
  serverInstance = Server.instance;
  serverInstance.initDatabase();
  const corsGeneral: CorsOptions = {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  serverInstance.routes(routerUser, '/login', corsGeneral); // Instace route
});

describe("Server", () => {
  test(`should to be server run in port 3001`, () => {
    expect(serverInstance.port).toBe("3001");
  });

  test('should to be Get /login', async () => {
    const response = await request(serverInstance.app).get('/login').send();
    expect(response.status).toBe(200);
  });

  test('We expect the request body to have a name and password in its body', async () => {
    let body = (await request(serverInstance.app).get('/login'));
    expect(body).toEqual({ nickname: 'jaleote', password: 'password'});
  })


});