const mongoose = require('mongoose');
// Define the book schema
const bookSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
);
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;