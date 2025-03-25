const myLibrary = [];

// book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// add the book to the library
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooks();
}

// remove book from library
function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

// read book yes or no
function toggleRead(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
}

// displays the books in the added library
function displayBooks() {
    const bookListDiv = document.getElementById('bookList');
    bookListDiv.innerHTML = '';  // list clears 

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div'); // makes the book card
        bookCard.classList.add('book-card'); // book card css
        bookCard.setAttribute('data-index', index);  // extra data

        const bookTitle = document.createElement('p'); // create new paragraph for title
        bookTitle.textContent = `Title: ${book.title}`;
        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `Author: ${book.author}`;
        const bookPages = document.createElement('p');
        bookPages.textContent = `Pages: ${book.pages}`;
        const bookRead = document.createElement('p');
        bookRead.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;

        const toggleReadBtn = document.createElement('button');
        toggleReadBtn.textContent = book.read ? 'Mark as Unread' : 'Mark as Read';
        toggleReadBtn.addEventListener('click', () => toggleRead(index));

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => removeBook(index));

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookRead);
        bookCard.appendChild(toggleReadBtn);
        bookCard.appendChild(removeBtn);
        bookListDiv.appendChild(bookCard);
    });
}

// event listener shows form for adding new books
document.getElementById('newBookBtn').addEventListener('click', () => {
    document.getElementById('bookFormContainer').style.display = 'block';
});

// event listener for form submit
document.getElementById('bookForm').addEventListener('submit', (event) => {
    event.preventDefault(); //form wont refresh page

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);

    //form fields reset
    document.getElementById('bookForm').reset();
    document.getElementById('bookFormContainer').style.display = 'none';
});

// event listener closes the form
document.getElementById('closeFormBtn').addEventListener('click', () => {
    document.getElementById('bookFormContainer').style.display = 'none';
});
