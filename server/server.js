import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import mongoose from 'mongoose'

mongoose.connect(mongoDB)
    .then(async () => {

        const { url } = await startStandaloneServer(server, {
            listen: { port: 4000 },
        });
        console.log(`🚀  Server ready at: ${url}`);
    }).catch(e => {
        console.log(`mongo error ${e}`);
    })

const typeDefs = `
    type Book {
        title: String
        author: String
    }

    type Query {
        getBooks: [Book]
        getBookByAuthor(author:String!): Book
    }
`;

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const resolvers = {

    Query: {

        getBooks: () => books,
        getBookByAuthor: (parent, args) => {
            const filteredBooks = books.filter(book => book.author === args.author);
            return filteredBooks.length > 0 ? filteredBooks[0] : null;
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});


