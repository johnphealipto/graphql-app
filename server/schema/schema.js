const graphql  = require("graphql");

const { 
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// Dummy Data
var books = [
  { name: "Name of the wind", genre: "Fantasy", id: "1", authorId: "2" },
  { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "3" },
  { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "1"},
  { name: "The Little Man", genre: "Comedy", id: "4", authorId: "3"},
  { name: "Way Down", genre: "Tragic", id: "5", authorId: "3"},
  { name: "Lust & Lies", genre: "Romance", id: "6", authorId: "2"},
]

var authors = [
  { name: "James Stome", age: 42, id: "1"},
  { name: "Kemp Clement", age: 64, id: "2"},
  { name: "Brown John", age: 26, id: "3"}
]

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "All the books",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: { type: GraphQLString },
    author: {
      type: AuthorType,
      description: "An author of a book",
      resolve: (parent, args) => {
        return authors.find(author => author.id === parent.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "All the authors",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      description: "All books by an author",
      resolve: (parent, args) => {
        return books.filter(book => book.authorId === parent.id)
      }
    }
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
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: () => {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => {
        return authors
      }
    }
  }
})


const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: { 
    addBook: {
      type: BookType,
      description: "Add book",
      args: { 
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: (parent, args) => {
        let newBook = { 
          id: authors.length + 1, 
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        }
        books.push(newBook)
        return newBook
      }
    },
    addAuthor: {
      type: AuthorType,
      description: "Add author",
      args: { 
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        let newAuthor = { 
          id: authors.length + 1, 
          name: args.name,
          age: args.age
        }
        authors.push(newAuthor)
        return newAuthor
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});