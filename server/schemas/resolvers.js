const { Book, User} = require('../models');
const { countDocuments } = require('../models/User');
const auth = require('../utils/auth');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return Users.find().populate('')
        },
    },

    Mutation: {
        addUser: async (parent,{username,email,password}) => {
            const user = await User.create({username,email,password});
            const token = signToken(user);
            return {token, user};
        },
        login: async(parent,{email,password}) => {
            const user = await User.findOne({email});

            if(!user){
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){
                throw AuthenticationError;
            }

            const token = signToken(user);

            return {token,user}
        },
        saveBook: async (parent, {description, title, bookId, image,link, authors},context) => {
            if(context.user){
                return User.savedBooks.findOneAndUpdate(
                    {}
                );
            }

            throw AuthenticationError;
        },
        removeBook: async (parent,bookId,context) => {
            if(context.user){
                return User.savedBooks.findOneAndUpdate(
                    {bookId: bookId},
                    {
                        $pull: {
                            savedBooks:{
                                bookId:bookId,
                            },
                        },
                    },
                    {new:true}
                );
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;