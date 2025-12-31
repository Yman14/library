document.querySelector("h1").textContent = "Welcome to the Library";

const myLibrary = [];

function Book(title, author, year, pages, status) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages || "0-8";
    this.status = status || "not-read";
    this.uuid = crypto.randomUUID();

    function statusToggle(status) {
        this.status = status;
    }
}

function addBookToLibrary(title, author, year, pages, status) {
    const newBook = new Book(title, author, year, pages, status);
    myLibrary.push(newBook);
}
// Sample books
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 1925, 180,"read");
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 1960);
addBookToLibrary("Nineteen Eighty-Four", "George Orwell", 1949, 328, "reading");
addBookToLibrary("hello world", "lee", 2026, 1, "reading");
addBookToLibrary("book", "author", 2020, 100, "not-read");
console.table(myLibrary);


function addBookButtonHandler() {
    const addBookBtn = document.getElementById("add-book-btn");
    const dialog = document.getElementById("add-book-dialog");
    const confirmBtn = document.getElementById("confirm-btn");
    const cancelBtn = document.getElementById("cancel-btn");
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
        form.reset();
        dialog.close("Book Added");
    });
    cancelBtn.addEventListener("click", (event) => {
        event.preventDefault();
        dialog.close("Cancelled");
    });


}
addBookButtonHandler();

function removeBook() {
    const bookList = document.getElementById("book-list");
    bookList.addEventListener("click", (e) => {
        if(e.target.classList.contains("remove-button")){
            console.log("clicked " + e.target.parentElement.parentElement.className);
            e.target.parentElement.parentElement.remove();
        }
    })
}
//bookStatusUpdate();
removeBook();


function displayBooks() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    myLibrary.forEach(book => {
        const bookItem = document.createElement("div");
        bookItem.className = "book-item";
        //bookItem.textContent = `${book.title} by ${book.author} (${book.year}) - UUID: ${book.uuid}`;
        bookList.appendChild(bookItem);

        //content of book item
        const titleCover = document.createElement("h2");
        const yearCover = document.createElement("h5");
        const authorCover = document.createElement("h4");
        const btnsCover = document.createElement("div");
        const pagesCover = document.createElement("p");
        titleCover.classList.add("title-cover");
        yearCover.classList.add("year-cover");
        authorCover.classList.add("author-cover");
        btnsCover.classList.add("btns-cover");
        pagesCover.classList.add("pages-cover");        
        titleCover.textContent = book.title;
        yearCover.textContent = `(${book.year})`;
        authorCover.textContent = book.author;
        pagesCover.textContent = book.pages;
        bookItem.append(titleCover, yearCover, authorCover, btnsCover, pagesCover);

        //buttons of book item
        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-button");
        removeBtn.textContent = "=";
        btnsCover.appendChild(removeBtn);
    });
}
displayBooks();