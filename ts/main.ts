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

window.onload = function() {
    // set up button click for add book form
    // # find element with id of add-book
    let addBookBtn = document.querySelector("#add-book") as HTMLButtonElement; 
    addBookBtn.onclick = processBook;
}

function processBook() {
    let userBook = getBook();
    if (userBook != null) {
        addBookToWebPage(userBook);
        addBookToStorage(userBook);
    }
}

/**
 * this function will retrieve all the book
 * data from the HTML page. If all data is valid 
 * a book object will be returned. If any data 
 * is invalid, null will be returned and error messages
 * will be shown on page.
 */
function getBook():Book {
    clearAllErrorMessages();

    // get all inputs
    let isbnTextBox = document.querySelector("#isbn") as HTMLInputElement;
    let titleTextBox = document.querySelector("#title") as HTMLInputElement;
    let priceTextBox = document.querySelector("#price") as HTMLInputElement;
    let releaseDateTextBox = document.querySelector("#release-date") as HTMLInputElement;

    // validate data
    let isValidData:boolean = true;

    // validate ISBN
    let isbn:string = isbnTextBox.value // gets input from text box
    if (!isValidIsbn(isbn)) { // if not valid
        isValidData = false;
        isbnTextBox.nextElementSibling.textContent = "ISBN must be 13 digits only";    
    }

    // validate title
    let title:string = titleTextBox.value;
    if (title.trim() == "") { // trims empty white space
        isValidData = false;
        let titleErrorSpan = titleTextBox.nextElementSibling;
        titleErrorSpan.textContent = "You must enter a title"
    }

    // validate price
    let price = parseFloat(priceTextBox.value);
    if (isNaN(price) || price < 0) {
        isValidData = false;
        priceTextBox.nextElementSibling.textContent = "Price must be a positive number";
    }

    // validate release date
    let releaseDate = releaseDateTextBox.value;
    let releaseDateCheck = Date.parse(releaseDate); // if invalid, this will return NaN
    if (isNaN(releaseDateCheck)) {
        isValidData = false;
        releaseDateTextBox.nextElementSibling.textContent = "Release date must be a valid date";
    }

    if (isValidData) { // if is true
        // create and populate Book object if all data is valid
        let addedBook = new Book();
        addedBook.isbn = isbn;
        addedBook.price = price;
        addedBook.title = title;

        // the value of input type date is off 
        // by one day because of time zone issue.
        // this solution resolves time zone issue
        // split date string into array "2024-5-22"
        // result would be {"2024", "10", "24"}
        const dateParts:string[] = releaseDate.split("-");
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // subtract 1 because months are index based
        const day = parseInt(dateParts[2]);
        const correctDate = new Date(year, month, day);

        addedBook.releaseDate = new Date(correctDate);

        return addedBook;
    }
    
    return null; // return null if any invalid data is present
    
} 

/**
 * this validates an ISBN 13 number
 * if the ISBN only consists of 13 digits characters
 * @param data the string to be validated
 * @returns true if the data is valid ISBN 13
 */
function isValidIsbn(data:string) {
    let regex = /^\d{13}$/; // match 13 digits exactly
    return regex.test(data); 
}

/**
 * adds a Book object to web page. Assumes
 * all data is valid
 * @param b the Book containing valid data to be added
 */
function addBookToWebPage(b:Book):void {
    console.log(b);

    // add the book to the web page 
    //  grabbing inner div
    let bookDiv:HTMLDivElement = document.createElement("div");

    // grabbing h2 element within div
    let titleHeading:HTMLHeadingElement = document.createElement("h2");
    titleHeading.textContent = `${b.title} : ${b.isbn}`;
    bookDiv.appendChild(titleHeading); // add h2 to bookDiv <div><h2>Title : ISBN </h2><div>

    let bookDescription:HTMLParagraphElement = document.createElement("p");
    // formats price as currency
    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency", 
        currency: "USD",
    });
    let formattedPrice = currencyFormatter.format(b.price);

    bookDescription.textContent = `Book was released on  ${b.releaseDate} and costs ${formattedPrice}`;
    bookDiv.appendChild(bookDescription);

    // add bookDiv to web page
    let bookListDisplay:HTMLDivElement = document.querySelector("#book-display");
    bookListDisplay.appendChild(bookDiv); // add the newly created book
    
    document.querySelector("#book-display").appendChild(bookDiv);
}

/**
 * adds a single book object to existing Book list in storage
 * if no books are currently stored a new list will be created and stored
 * @param b the book that will be added to localStorage
 */
function addBookToStorage(b:Book):void {
    const BookStorageKey = "Books";
    // read existing books out of storage
    let bookData = localStorage.getItem("Books");

    // initialize with existing bookData is not null, or empty array if null
    // this is a JS ternary/conditional operator
    let books:Book[] = bookData? JSON.parse(bookData) : [];
    
    books.push(b);

    // add to localStorage
    bookData = JSON.stringify(books);
    localStorage.setItem(BookStorageKey, bookData);
    
}

/**
 * clears all the validation error message spans
 * in the form
 */
function clearAllErrorMessages() {
    // get all error spans
    // grabs all span elements named error-msg in the form
    let allSpans = document.querySelectorAll("form span.error-msg");

    // loop through and set each span to an empty string
    for (let i = 0; i < allSpans.length; i++) {
        let currentSpan = allSpans[i];
        currentSpan.textContent = "";

        // same as above
        // allSpans[i].textContent = "";
    }
}