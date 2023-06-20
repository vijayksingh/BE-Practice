import { Book, bookSchema, booksData } from "./util";

export const getBook = (title: string) =>
  booksData.find((item) => item.title === title);

export const addBook = (book: Book) => {
  const validatedBook = bookSchema.parse(book);

  const { title } = validatedBook;

  const index = booksData.findIndex((item) => item.title === title);

  if (index !== -1) {
    throw new Error("This book already exist");
  }

  booksData.push({ ...validatedBook, id: booksData.length });
};

export const updateBook = (book: Book) => {
  if (!book.title) {
    throw new Error("Title is required");
  }
  const { title } = book;
  const index = booksData.findIndex((item) => item.title === title);

  if (index === -1) {
    throw new Error("This book doesn't exist");
  }

  let existingBook = booksData[index];
  existingBook = { ...existingBook, ...book };

  booksData[index] = existingBook;
};

export const deleteBook = (title: string) => {
  if (!title) {
    throw new Error("Title is required");
  }
  const index = booksData.findIndex((item) => item.title === title);

  if (index === -1) {
    throw new Error("This book doesn't exist");
  }

  booksData.splice(index, 1);
};
