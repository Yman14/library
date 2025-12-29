document.querySelector("h1").textContent = "Welcome to the Library";

const myLibrary = [];

function Book(title, author, year, pages, status) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages || "Unknown";
    this.status = status || "not-read";
    this.uuid = crypto.randomUUID();
}

function addBookToLibrary(title, author, year, pages, status) {
    const newBook = new Book(title, author, year, pages, status);
    myLibrary.push(newBook);
}
// Sample books
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 1925, 180,"read");
addBookToLibrary("1984", "George Orwell", 1949);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 1960);

console.table(myLibrary);

function addBookButtonHandler() {
    const addBookBtn = document.getElementById("add-book-btn");
    const dialog = document.getElementById("add-book-dialog");
    const confirmBtn = document.getElementById("confirm-btn");
    const outputBox = document.querySelector("output");
    outputBox.value = "outputBox.";
    addBookBtn.addEventListener("click", () => {
        dialog.showModal();
    });

    dialog.addEventListener("close", (e) => {
        outputBox.value =
            dialog.returnValue === "default"
                ? "No return value."
                : `ReturnValue: ${dialog.returnValue}.`;
    });

    confirmBtn.addEventListener("click", (event) => {
        event.preventDefault(); //Prevent the default form submission that refreshes the page

        const form = document.getElementById("add-book-form");
        const formData = new FormData(form);
        const title = formData.get("title");
        const author = formData.get("author");
        const year = formData.get("year");
        const pages = formData.get("pages");
        const status = formData.get("status");

        addBookToLibrary(title, author, year, pages, status);
        displayBooks();
        dialog.close("Book Added");
        });


}
addBookButtonHandler();


function displayBooks() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    myLibrary.forEach(book => {
        const bookItem = document.createElement("div");
        bookItem.className = "book-item";
        bookItem.textContent = `${book.title} by ${book.author} (${book.year}) - UUID: ${book.uuid}`;
        bookList.appendChild(bookItem);
    });
}
displayBooks();