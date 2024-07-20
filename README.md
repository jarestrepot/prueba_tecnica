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
  PORT=number_port_server
  MYSQL_DB=databesa_name
  MYSQL_ROOT=client_mysql
  MYSQL_PASSWORD=password_client_mysql
  MYSQL_HOST=host_mysql
  MYSQL_PORT=port_mysql
```



Run the server as a developer
```
  npm run dev
```

Run the server as a production
```
  npm run start
```



