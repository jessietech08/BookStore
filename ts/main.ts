/**
 * Represents a individual book that can be purchased
 */
class Book {
    /**
     * The 13 digit ISBN number
     */
    isbn: string; // these are properties
    /**
     * The title of the book
     */
    title: string;
    /**
     * The retail price of the book 
     */
    price: number;
    /**
     * The date the book was first published. This could be
     * a future date, if the book is not yet released
     */
    releaseDate: Date;
}

// book object test code
let myBook = new Book();
myBook.isbn = "123";
myBook.price = 9.99;
myBook.title = "Programming for beginners";
myBook.releaseDate = new Date(2024, 3, 22); // months start at index 0

console.log(myBook);