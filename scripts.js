document.querySelector("h1").textContent = "Welcome to the Library"; //verification of linking

const myLibrary = [];

function Book(title, author, year, pages, status) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages || "0-8";
    this.status = status || "not-read";
    this.uuid = crypto.randomUUID();
}

//updating status of the book and updating console for testing
Book.prototype.statusToogle = function(value) {
    this.status = value;
    console.table(myLibrary);
}

//adding book to the library array
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

//all functionality related to the button addButton in the site
function addBookButtonHandler() {
    const addBookBtn = document.getElementById("add-book-btn");
    const dialog = document.getElementById("add-book-dialog");
    const confirmBtn = document.getElementById("confirm-btn");
    const cancelBtn = document.getElementById("cancel-btn");
    const outputBox = document.querySelector("output");
    outputBox.value = "outputBox.";

    //show the form when the button is clicked
    addBookBtn.addEventListener("click", () => {
        dialog.showModal();
    });

    //for testing purpose to know what returns when the form is closed
    dialog.addEventListener("close", (e) => {
        outputBox.value =
            dialog.returnValue === "default"
                ? "No return value."
                : `ReturnValue: ${dialog.returnValue}.`;
    });

    //collecting data from form after confirm button was pressed
    confirmBtn.addEventListener("click", (event) => {
        event.preventDefault(); //Prevent the default form submission that refreshes the page

        const form = document.getElementById("add-book-form");
        const formData = new FormData(form);
        const title = formData.get("title");
        const author = formData.get("author");
        const year = formData.get("year");
        const pages = formData.get("pages");
        const status = formData.get("status");

        //add the collected data to the library array
        addBookToLibrary(title, author, year, pages, status);

        //update the library being display on site
        displayBooks();

        //remove all the data inputted in form after the confirm button was pressed
        form.reset();

        //for testing purpose
        dialog.close("Book Added");
    });

    //prevent the default submission when cancel button was pressed so that data will not lose
    cancelBtn.addEventListener("click", (event) => {
        event.preventDefault();
        dialog.close("Cancelled");
    });


}
addBookButtonHandler();

//removing the book in the library
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

//when the user click the button to change status
function statusButtonHandler() {
    const bookList = document.getElementById("book-list");
    bookList.addEventListener("change", (e) => {
        const selectedValue = e.target.value;
        const parent = e.target.closest(".book-item");
        bookStatusUpdate(selectedValue, parent.dataset.uuid);     
    })
}
statusButtonHandler();

//update the book status not-read/reading/read in myLibrary 
function bookStatusUpdate(value, uuid) {
    if(book = myLibrary.find(item => item.uuid === uuid))
    {
        book.statusToogle(value);
    }
    else{
        console.log("Book not found!");
    }
}

//rendering the myLibrary array in the site
function displayBooks() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    myLibrary.forEach(book => {
        const bookItem = document.createElement("div");
        bookItem.className = "book-item";
        bookItem.dataset.uuid = book.uuid;
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

        //select custom
        const statusUpdate = document.createElement("select");
        statusUpdate.id = "status-select";
        statusUpdate.name = "status";
        statusUpdate.classList = "status";

        const options = document.createElement("optGroup");
        options.label = "STATUS";

        const opt1 = new Option("Not Read", "not-read");
        const opt2 = new Option("Reading", "reading");
        const opt3 = new Option("Read", "read");

        options.append(opt1, opt2, opt3);
        statusUpdate.appendChild(options);
        btnsCover.appendChild(statusUpdate);
        statusUpdate.value = book.status;

    });
}
displayBooks();