const express = require('express');

const { ApolloServer } = require('apollo-server-express');

const db = require('./db');

const models = require('./models');

require('dotenv').config()

const port = process.env.PORT || 4000;

// const typeDefs = gql`
//  type Query {
//     hello: String
//  }
// `;

// const resolvers = {
//     Query: {
//        hello: () => 'Hello world!'
//     }
//    };

// GraphQL's schema ‘Query’
const typeDefs = require('./schema');

// create resolver functions for Query schema
const resolvers = require('./resolvers');

const app = express();

// Connect to the database
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;
const DB_URL = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`
db.connect(DB_URL);

// const server = new ApolloServer({ typeDefs, resolvers });

let apolloServer = null;
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => {
            return { models };
         }
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: '/api' });
}

startServer();

app.get('/', (req, res) => res.send('working...!'));

app.listen({port}, () => console.log("app is listning on port "+port));