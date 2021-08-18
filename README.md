# Build/Run Instructions

## Build Instructions

- Run `npm install`

### Initiate the project

Before initiating the project please make sure you have the right configurations selected inside `application/proj-init.js` once you changed the right configurations, in the root directory run `npm run proj-init` The tables should be created and you should see `All tables created` when the process exits.

Create .env file in the root directory.

Add these variables inside the .env file:

- `JWT_SECRET=<something_secret>`
- `DB_HOST=<database_host>`
- `DB_USER=<database_user>`
- `DB_PASSWORD=<database_password>`
- `DB=<database_name>`

## Run Instructions

- Run `npm start` (for production)
- Run `npm run dev` (for development)
- Go to `http://localhost:5000` to access the web app.
