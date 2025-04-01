const myLibrary = [];

// book constructor
function Book(title, author, pages, read, rating = 0) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
}

// add the book to the library
function addBookToLibrary(title, author, pages, read, rating) {
    const book = new Book(title, author, pages, read, rating);
    myLibrary.push(book); // adds book to library array + sorts by rating
    sortBooksByRating();
    displayBooks(); 
}

// remove book from library
function removeBook(index) {
    myLibrary.splice(index, 1); // removes book 
    displayBooks();
}

// read book yes or no
function toggleRead(index) {
    myLibrary[index].read = !myLibrary[index].read; // read status
    displayBooks();
}

// rating update
function updateRating(index, newRating) {
    myLibrary[index].rating = parseInt(newRating, 10); 
    sortBooksByRating(); // sorts again based on rating
    displayBooks();
}

// sorts the books by rating order (highest first)
function sortBooksByRating() {
    myLibrary.sort((a, b) => b.rating - a.rating); 
}


// displays the books in the added library
function displayBooks() {
    const bookListDiv = document.getElementById('bookList');
    bookListDiv.innerHTML = ''; // clear existing books

    if (myLibrary.length === 0) {
        return; // doesnt display card if library is empty
    }

    // make the book cards as added
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index', index);

        // make+set txt for book info
        const bookTitle = document.createElement('p');
        bookTitle.textContent = `Title: ${book.title}`;
        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `Author: ${book.author}`;
        const bookPages = document.createElement('p');
        bookPages.textContent = `Pages: ${book.pages}`;
        const bookRead = document.createElement('p');
        bookRead.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;

        // rating Display
        const bookRating = document.createElement('p');
        bookRating.textContent = `Rating: ${book.rating}/5`;

        // input for rating + update
        const ratingInput = document.createElement('input');
        ratingInput.type = 'number';
        ratingInput.min = '0';
        ratingInput.max = '5';
        ratingInput.value = book.rating;
        ratingInput.addEventListener('change', () => updateRating(index, ratingInput.value));

        // read status
        const toggleReadBtn = document.createElement('button');
        toggleReadBtn.textContent = book.read ? 'Mark as Unread' : 'Mark as Read';
        toggleReadBtn.addEventListener('click', () => toggleRead(index));

        // button to remove book
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => removeBook(index));

        // appends to book card + book list 
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookRead);
        bookCard.appendChild(bookRating);
        bookCard.appendChild(ratingInput);
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
    event.preventDefault(); // form wont refresh

    // gets input from form
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    const rating = document.getElementById('rating').value || 0; // Ensure rating is captured

    addBookToLibrary(title, author, pages, read, parseInt(rating, 10));

    // resets form + hide container
    document.getElementById('bookForm').reset();
    document.getElementById('bookFormContainer').style.display = 'none';
});

// event listener closes the form
document.getElementById('closeFormBtn').addEventListener('click', () => {
    document.getElementById('bookFormContainer').style.display = 'none';
});