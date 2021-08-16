# Build/Run Instructions

## Build Instructions

### Create the tables

User Table:

```sql
CREATE TABLE User(
id int AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(240) NOT NULL UNIQUE,
password VARCHAR(200) NOT NULL
);
```

Image Table:

```sql
CREATE TABLE Image(
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
path VARCHAR(1000) NOT NULL,
name VARCHAR(240) NOT NULL,
user INT NOT NULL,
FOREIGN KEY (user) REFERENCES User(id)
);
```

Comment Table:

```sql
CREATE TABLE Comment(
id INT PRIMARY KEY AUTO_INCREMENT,
author INT NOT NULL,
content VARCHAR(1000) NOT NULL,
image INT NOT NULL,
FOREIGN KEY(author) REFERENCES User(id),
FOREIGN KEY(image) REFERENCES Image(id)
);
```

Create .env file in the root directory.

Add these variables inside the .env file:

- JWT_SECRET=<something_secret>
- DB_HOST=<your_host>
- DB_USER=<database_user>
- DB_PASSWORD=<database_user_password>
- DB=<database_name>

## Run Instructions

npm install
npm start
