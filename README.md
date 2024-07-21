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

### Login user - user/login





