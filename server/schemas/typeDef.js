const typeDefs = `#graphql
    type User{
        _id: ID
        username: String
        email: String
        password: String
        bookCount: Integer
        savedBooks: [Book]!
    }

    type Book{
        bookId:
        authors: [String]!
        description: String
        title: String
        image: String
        link: String
    }

    type Auth{
        token: ID!
        user: User
    }

    type Query{
        users: [User]
        user(username: String!): User
        me: User
    }

    type Mutation{
        login(email:String!,username:String!): Auth
        addUser(username:String!, email:String!): Auth
        saveBook(bookId: ): Book
        removeBook(bookId: ): Book
    }
`