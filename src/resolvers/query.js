const models = require('../models');

module.exports = {
    hello: () => 'Hello world!',
    books: async () => {
        return await models.Book.find()
    },
    book: async (parent, args) => {
        return await models.Book.findById(args.id);
    }
}