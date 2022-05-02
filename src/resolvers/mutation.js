const models = require('../models');

module.exports = {
    addBook: async (parent, args, { models }) => {
        return await models.Book.create({
            title: args.title,
            author: args.author
        });
    },
    updateBook: async (parent, { id, title, author }, { models }) => {
        return await models.Book.findOneAndUpdate(
        {
            _id: id,
        },
        {
        $set: {
            title,
            author
        }
        },
        {
        new: true
        }
        );
    },
    deleteBook: async (parent, { id }, { models }) => {
        try {
            await models.Book.findOneAndRemove({ _id: id});
            return true;
        } catch (err) {
            return false;
        }
       },
}