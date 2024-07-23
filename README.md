# server 

Navigate to the root of the backend 🗂️

For Windows
```
cd .\backend\
```

For Unix
```
cd backend/
```

## Api reference

### Commands / Steps 👣👣

Install dependencies
```
  npm install
```

<hr>

### Packages used for the backend 🗂️

- 🦾 TypeScript 
- 💻 express 
- ⚙️ cors
- 🔐 jsonWebToken
- 📑 TypeOrm
- 🔗 bcrype

<hr>

Database configuration
1. Create database in MySQL.
2. Database configuration with the name you see appropriate.
3. Default charset: 'utf8mb4' 
4. Default Collaction: 'utf8mb4_unicode_ci'


Create a file with the name .env in the root of the backend folder and add the environment variables for the mysql connection.
```
  PORT=server_port_number
  MYSQL_DB=database_name
  MYSQL_ROOT=client_mysql
  MYSQL_PASSWORD=password_client_mysql
  MYSQL_HOST=host_mysql
  MYSQL_PORT=port_mysql
  SECRET_KEY_JWT:your_secret_key
```

Run the insert of the master data found in the following directory (incremental.sql) for the database that has been created.
```
  cd /backend/bd
```


Run the server as a developer
```
  npm run dev
```

Run the server as a production
```
  npm run start
```
<hr>

## API ENDPOINTS

### Create user - /user/register
```
  body  {
  "nick_name": "test",
  "name": "test",
  "password": "test",
  "surname": "test",
  "secondSurname": "test" || null,
  "email": "test@test.com",
  "token": null,
  "address": {
    "post_code": number_post_code,
    "street": "test_street",
    "number_street": your_number_street,
    "apartment": "test_apartament",
    "city": id_city || null
  } || null || {}
}
```

Response 
```
  {
    "msg": "User test Super Test test found",
    "success": true,
    "status": 200,
    "data": {
      "createdAt": "2024-07-22T10:08:51.866Z",
      "updatedAt": "2024-07-22T10:08:51.866Z",
      "id": "f85e523c-de90-409d-ae13-78d3b57f585d",
      "nick_name": "Super Test",
      "name": "test",
      "password": "$2b$12$PrtTUAN0WItrs/h0ZbBKJ.MN.VngGe9bA2SaN8PNx5GxcVB9cDF2W",
      "surname": "test",
      "secondSurname": null,
      "email": "testtest@gmail.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R0ZXN0QGdtYWlsLmNvbSIsIm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNzIxNjQyOTMxLCJleHAiOjE3MjE3MjkzMzF9.ixeyCadQ44_tOZg8lNEanqGup4klw7W9JaJcuGUfPBY",
      "address": {
        "createdAt": "2024-07-22T10:08:51.800Z",
        "updatedAt": "2024-07-22T10:08:51.800Z",
        "id": "5b00a0f2-2c12-4ba5-b838-2ddb38805c52",
        "post_code": 8902,
        "street": "test",
        "number_street": 121,
        "apartment": "test",
        "city": {
          "createdAt": "2024-07-22T10:05:06.589Z",
          "updatedAt": "2024-07-22T10:05:06.589Z",
          "id": 51,
          "name": "Bareclona",
          "country": {
            "createdAt": "2024-07-22T10:05:06.554Z",
            "updatedAt": "2024-07-22T10:05:06.554Z",
            "id": "112083-2ptddfjml44km-sjdo",
            "name": "España"
          }
        }
      }
    }
  }
```

### Login user - user/login

Body (It must be sent in the body or the email or the nickname)
```
  {
    "nick_name": "Super Test",
    "email": "testtest@gmail.com",
    "password": "your_password"
  }
```


### Update user - user/update

Requires sending the user token through the request headers
```
Authorization : `Bearer ${your_token}` 
```

Body  (Only the user ID should be sent and the other fields are used for comparison in the database)
```
  {
  "id": "833c238a-be75-4b4e-b062-378024cb93cb",
  "nick_name": "Poca",
  "name": "Sanchez",
  "password": "2412",
  "surname": "Ontas",
  "secondSurname": "Ontas",
  "email": "test@gmail.com",
  "address": {
    ...Address details
  }
}
```


### User detail - user/:id
Requires sending the user token through the request headers
```
Authorization : `Bearer ${your_token}` 
```
The response gets all the user data


### User delete - user/delete/:id
Requires sending the user token through the request headers
```
Authorization : `Bearer ${your_token}` 
```
Delete user by id


### All Cities /cities
Returns all created cities and their associations.



# FrontEnd

Navigate to the root of the frontend 🗂️

For Windows
```
cd .\frontend\
```

For Unix
```
cd frontend/
```

### Commands / Steps 👣👣

Install dependencies
```
  npm install
```

<hr>

### Packages used for the backend 🗂️

- 🦾 TypeScript 
- 💻 React 
- ⚙️ Tailwindcss
- 🫸🏽 react-router-dom
- 📑 react-use
- 🔐 formik
- 🧱  yup
- 🗨️ notistack

<hr>

## Steps

<strong>To enter the application you must first fill out the registration form and then log in.</strong

1. Register
2. Login
3. Browse


