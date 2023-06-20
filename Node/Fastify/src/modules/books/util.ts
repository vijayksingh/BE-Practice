export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  description: string;
  price: number;
}

export const booksData: Book[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    publishedYear: 1925,
    description: "The Great Gatsby is a novel written by American author F. Scott Fitzgerald...",
    price: 12.99
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    publishedYear: 1960,
    description: "To Kill a Mockingbird is a novel by Harper Lee...",
    price: 10.99
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publishedYear: 1949,
    description: "1984 is a dystopian novel by George Orwell...",
    price: 9.99
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Classic",
    publishedYear: 1813,
    description: "Pride and Prejudice is a novel of manners...",
    price: 8.99
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Coming-of-Age",
    publishedYear: 1951,
    description: "The Catcher in the Rye is a novel by J.D. Salinger...",
    price: 11.99
  }
];
