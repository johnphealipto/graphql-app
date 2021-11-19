const graphql  = require("graphql");

const { 
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt
} = graphql;

// Dummy Data
var books = [
  { name: "Name of the wind", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3"}
]

var authors = [
  { name: "James Stome", age: 42, id: "1"},
  { name: "Kemp Clement", age: 64, id: "2"},
  { name: "Brown John", age: "26", id: "3"}
]

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "All the books",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
})

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "All the authors",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return books.find(book => book.id === args.id)
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return authors.find(author => author.id === args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});