import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import Server from '../src/models/Server';
import request from 'supertest';
import routerUser from '../src/router/user';
import routerCity from '../src/router/city';
import { CONSTANTES } from '../src/global/constantes';
import User from '../src/models/entities/User';

let serverInstance: Server;

let dataUserMockCreate!: User;

// Crear el usuario.
let mockDataCrate = {
  nick_name: "Super Test",
  name: "test",
  password: "superAdmin1",
  surname: "test",
  secondSurname: "testA",
  email: "testtest@gmail.com",
  token: null,
  address: {
    post_code: 8902,
    street: "test",
    number_street: 121,
    apartment: "test",
    city: 52
  }
}

beforeAll(async () => {
  serverInstance = Server.instance;
  await serverInstance.initDatabase(); 
  const corsGeneral = {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  serverInstance.routes(routerUser, '/user', corsGeneral);
  serverInstance.routes(routerCity, '/cities', corsGeneral);
  // await new Promise<void>((resolve) => {
  //   serverInstance.app.listen(serverInstance.port, resolve); 
  // });

  let response = await request(serverInstance.app).post('/user/register').send(mockDataCrate)
  if( response.status == 404 ){
    const mockData = {
      nick_name: 'Super Test',
      password: 'superAdmin1'
    }
    response = await request(serverInstance.app).post('/user/login').send(mockData);
  }
  dataUserMockCreate = response.body.data;
});

afterAll(async () => {

});

describe("Server", () => {
  test(`should be server run in port 3001`, () => {
    expect(serverInstance.port).toBe('3001');
  });

  test('It should get the status 200 /cities', async () => {
    const response = await request(serverInstance.app).get('/cities').send();
    expect(response.status).toBe(200);
  });

  test(`It should get the message: '${CONSTANTES.CITY.ALL}' /cities`, async () => {
    const response = await request(serverInstance.app).get('/cities').send();
    expect(response.body.msg).toEqual(CONSTANTES.CITY.ALL);
  });

  test('It should get the cities from daba base /cities', async () => {
    const response = await request(serverInstance.app).get('/cities').send();
    expect(response.body.data[0]).toBeInstanceOf(Object)
  });


  test('It should respond with user not found /user/login', async () => {
    let mockData = {
      email: 'test@example.com',
      password: 'password'
    }
    const response = await request(serverInstance.app).post('/user/login').send(mockData);
    expect(response.status).toBe(404)
    expect(response.body.msg).toEqual(CONSTANTES.USER.NOT_FOUND)
    expect(response.body.success).toBeFalsy()
    expect(response.body.data).toEqual([])
  })

  test('It should respond with data user /user/login', async () => {
    let { nick_name, password, email } = mockDataCrate;
    const response = await request(serverInstance.app).post('/user/login').send({nick_name, password});
    expect(response.status).toBe(200)
    expect(response.body.data.email).toContain(email)
    expect(response.body.data).toHaveProperty('token');
    expect(typeof response.body.data.token).toBe('string');
  })

  test('It should respond with a failed response when getting the user due to access denied. /user/:id', async () => {
    const response = await request(serverInstance.app).get(`/user/${dataUserMockCreate.id}`)
      .set('Authorization', `Bearer ${dataUserMockCreate.token}`);
    expect(response.status).toBe(401);
    expect(response.body.msg).toEqual(CONSTANTES.ACCESS_DENIED);
  })
});

