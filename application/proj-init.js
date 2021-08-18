const dotenv = require('dotenv')
dotenv.config()
const colors = require('colors')
const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'school',
  port: '3306'
})

db.connect(err => {
  if (err) {
    console.log(err.message)
    console.log(colors.red(`Error connecting to MySQL database...`))
    return
  }
  console.log(colors.blue(`Database Connnected...`))
  //
})

db.query('DROP TABLE IF EXISTS Comment')
db.query('DROP TABLE IF EXISTS Image')
db.query('DROP TABLE IF EXISTS User')

db.query(
  'CREATE TABLE User( id int AUTO_INCREMENT PRIMARY KEY, username VARCHAR(240) NOT NULL UNIQUE, password VARCHAR(200) NOT NULL);',
  (err, result) => {
    if (!err) {
      console.log(colors.green('User table created'))
    }
  }
)

db.query(
  'CREATE TABLE Image( id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, path VARCHAR(1000) NOT NULL, name VARCHAR(240) NOT NULL, user INT NOT NULL, FOREIGN KEY (user) REFERENCES User(id));',
  (err, result) => {
    if (!err) {
      console.log(colors.green('Images Table created'))
    }
  }
)

db.query(
  'CREATE TABLE Comment( id INT PRIMARY KEY AUTO_INCREMENT, author INT NOT NULL, content VARCHAR(1000) NOT NULL, image INT NOT NULL, FOREIGN KEY(author) REFERENCES User(id), FOREIGN KEY(image) REFERENCES Image(id));',
  (err, result) => {
    if (!err) {
      console.log(colors.green('Comments table created'))
      console.log(colors.green('All tables created.'))
      db.end()
    }
  }
)
