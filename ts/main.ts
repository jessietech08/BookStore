/**
 * Represents a individual book that can be purchased
 */
class Book {
    isbn: string; // these are properties
    title: string;
    price: number;
    releaseDate: Date;
}

// book object test code
let myBook = new Book();
myBook.isbn = "123";
myBook.price = 9.99;
myBook.title = "Programming for beginners";
myBook.releaseDate = new Date(2024, 3, 22); // months start at index 0

console.log(myBook);