## Winkel [POC]

> Manage interactions with current and potential product suppliers. Keep up to date with offers on the market, and engage with vendors through messages and purchase offers.

### About
The intent of this project is to implement a modern approach towards integrating a data layer into a single page application. Learn and understand how application data may be structured, using types and schemas to define what resources are available to the client.

Utilizes [GraphQL](https://bit.ly/2DFKJkp) and [Apollo Server](https://bit.ly/2XzLJx1) to implement an API and provide a schema for querying a [MongoDB](https://bit.ly/1VKPNp7) database. [Mongoose](https://bit.ly/2fSdrBd) models and schemas are used to keep data consistent. The front end is a [React.JS](https://bit.ly/2B7E1yR) application using [Redux](https://bit.ly/2hSHL2s) as the data store layer.

### Demo
Link to demo: https://winkel.obie.dev

### Developing

- Install [Yarn](https://bit.ly/2Td7ST9) (preferred for version locking).

#### Server
- Install mongodb: `brew install mongodb` (Reference: https://bit.ly/2hVc4Sr)
- Start the mongo server: `mongod`
- Navigate to server directory: `cd server/`
- Install project dependencies: `npm install`
- Seed the database: `npm run seed`
- Start the Apollo Server: `npm run build:dev` (http://localhost:9001)
- Generate a new User/API key

#### Client
- Navigate to client directory: `cd client`
- Install project dependencies: `npm install`
- Create `.env` file and set API key: `API_KEY=${API_KEY}`
- Start the app: `npm start` (http://localhost:8080)

### Testing

#### API
- `cd server/`
- All tests: `yarn test`
- Schema tests: `yarn test:schema`
- Resolvers tests: `yarn test:resolvers`
