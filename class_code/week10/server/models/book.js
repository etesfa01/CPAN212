import mongoose from "mongoose";

/* {
            "title": "The Pragmatic Programmer",
            "author": "Andrew Hunt, David Thomas",
            "publisher": "Addison-Wesley",
            "pages": 352,
            "release_date": "1999-10-30",
            "ISBN": "978-0201616224"
          },
    */

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  publisher: {
    type: String,
    require: true,
  },
  pages: {
    type: Number,
    require: true,
  },
  releaseDate: {
    type: String,
  },
  ISBN: {
    type: String,
  },
});

const Book = mongoose.model("books", bookSchema);
export default Book;
