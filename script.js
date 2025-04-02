const myLibrary = [];

class Book {
  constructor(title, author, pages, status, fave) {
    this.title = title;

    this.author = author;

    this.pages = pages;

    this.status = status;

    this.fave = fave;
  }
}

function addBookToLibrary(title, author, pages, status, fave) {
  const newBook = new Book(title, author, pages, status, fave);

  myLibrary.push(newBook);
}

const fullWrap = document.querySelector(".full-wrap");

function displayBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    const div = document.createElement("div");

    //gives each card an index number, so it can be easily deleted
    div.dataset.indexNumber = i;

    div.setAttribute("class", "card");

    //add star fave button on card
    div.appendChild(makeFaveBtn());

    for (let j = 0; j < Object.keys(myLibrary[i]).length; j++) {
      const h2 = document.createElement("h2");
      h2.textContent =
        Object.keys(myLibrary[i])
          [j] //capitalise
          .charAt(0)
          .toUpperCase() + Object.keys(myLibrary[i])[j].slice(1);

      const p = document.createElement("p");
      p.textContent =
        //get value from selected key
        myLibrary[i][Object.keys(myLibrary[i])[j]];

      div.appendChild(h2);
      div.appendChild(p);
    }

    //button to remove card
    div.appendChild(makeRemoveBtn());

    //setting initial fave stars
    if (div.querySelector("p:last-of-type").textContent === "Yes") {
      div.querySelector(".star").textContent = "★";
    } else {
      div.querySelector(".star").textContent = "☆";
    }

    fullWrap.appendChild(div);
  }
}

function makeFaveBtn() {
  const faveBtn = document.createElement("button");

  function currentStar(e) {
    if (e.target.parentElement.querySelector(".star").textContent === "☆") {
      //change star
      e.target.parentElement.querySelector(".star").textContent = "★";

      //change fave text
      e.target.parentElement.querySelector("p:last-of-type").textContent =
        "Yes";

      //change fave in arr
      myLibrary[e.target.parentElement.dataset.indexNumber].fave = "Yes";
    } else {
      //change star
      e.target.parentElement.querySelector(".star").textContent = "☆";

      //change fave text
      e.target.parentElement.querySelector("p:last-of-type").textContent = "No";

      //change fave in arr
      myLibrary[e.target.parentElement.dataset.indexNumber].fave = "No";
    }
  }

  faveBtn.textContent = "☆";
  faveBtn.setAttribute("class", "star");

  faveBtn.addEventListener("click", function (e) {
    faveBtn.value = currentStar(e);
  });

  return faveBtn;
}

function makeRemoveBtn() {
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "remove book";
  removeBtn.setAttribute("class", "remove-book");

  removeBtn.addEventListener("click", function (e) {
    //remove from dom
    e.target.parentElement.remove();

    //remove from array
    myLibrary.splice(e.target.parentElement.dataset.indexNumber, 1);
  });

  return removeBtn;
}

// user adds book

// open and close "add book" form
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".add-book");
const closeButton = document.querySelector(".close-dialog");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

//adding the book to grid
const submitButton = document.querySelector(".submit");

// display recently added book
function displayAddedBook() {
  for (let i = myLibrary.length - 1; i < myLibrary.length; i++) {
    const div = document.createElement("div");

    //gives each card an index number, so it can be easily deleted
    div.dataset.indexNumber = i;

    div.setAttribute("class", "card");

    //add star fave button on card
    div.appendChild(makeFaveBtn());

    for (let j = 0; j < Object.keys(myLibrary[i]).length; j++) {
      const h2 = document.createElement("h2");
      h2.textContent =
        Object.keys(myLibrary[i])
          [j] //capitalise
          .charAt(0)
          .toUpperCase() + Object.keys(myLibrary[i])[j].slice(1);

      const p = document.createElement("p");
      p.textContent =
        //get value from selected key
        myLibrary[i][Object.keys(myLibrary[i])[j]];

      div.appendChild(h2);
      div.appendChild(p);
    }

    //button to remove card
    div.appendChild(makeRemoveBtn());

    //setting initial fave stars
    if (div.querySelector("p:last-of-type").textContent === "Yes") {
      div.querySelector(".star").textContent = "★";
    } else {
      div.querySelector(".star").textContent = "☆";
    }

    fullWrap.appendChild(div);
  }
}

const form = document.querySelector("form");

const title = document.querySelector("#title");
const titleError = document.querySelector("#title + span.error");

const author = document.querySelector("#author");
const authorError = document.querySelector("#author + span.error");

const pages = document.querySelector("#pages");
const pagesError = document.querySelector("#pages + span.error");

const currentStatus = document.querySelector("#status");
const currentStatusError = document.querySelector("#status + span.error");

const fave = document.querySelector("#fave");
const faveError = document.querySelector("#fave + span.error");

title.addEventListener("input", (event) => {
  if (title.validity.valid) {
    titleError.textContent = "";
    titleError.className = "error";
  } else {
    showError(title, titleError);
  }
});

author.addEventListener("input", (event) => {
  if (author.validity.valid) {
    authorError.textContent = "";
    authorError.className = "error";
  } else {
    showError(author, authorError);
  }
});

pages.addEventListener("input", (event) => {
  if (pages.validity.valid) {
    pagesError.textContent = "";
    pagesError.className = "error";
  } else {
    showError(pages, pagesError);
  }
});

currentStatus.addEventListener("input", (event) => {
  if (currentStatus.validity.valid) {
    currentStatusError.textContent = "";
    currentStatusError.className = "error";
  } else {
    showError(currentStatus, currentStatusError);
  }
});

fave.addEventListener("input", (event) => {
  if (fave.validity.valid) {
    faveError.textContent = "";
    faveError.className = "error";
  } else {
    showError(fave, faveError);
  }
});

form.addEventListener("submit", (event) => {
  if (!title.validity.valid) {
    showError(title, titleError);
    event.preventDefault();
  }
});

function showError(field, fieldError) {
  if (field.validity.valueMissing) {
    fieldError.textContent = "This field is required.";
  }
  fieldError.className = "error active";
}

form.addEventListener("submit", (e) => {
  if (!title.validity.valid) {
    showError(title, titleError);
    e.preventDefault();

  } else if (!author.validity.valid) {
    showError(author,authorError);
    e.preventDefault(); 

  } else if (!pages.validity.valid) {
    showError(pages,pagesError);
    e.preventDefault(); 

  }else if (!currentStatus.validity.valid) {
    showError(currentStatus,currentStatusError);
    e.preventDefault(); 

  }else if (!fave.validity.valid) {
    showError(fave,faveError);
    e.preventDefault(); 

  }else{

      e.preventDefault();

      const newTitle = title.value;
      const newAuthor = author.value;
      const newPages = pages.value;
      const newStatus = currentStatus.value;
      const newFave = fave.value;
    
      addBookToLibrary(newTitle, newAuthor, newPages, newStatus, newFave);
    
      displayAddedBook();
    
      // restores to default values
      document.querySelector("#title").value = "";
      document.querySelector("#author").value = "";
      document.querySelector("#pages").value = "";
      document.querySelector("#status").value = "finished";
      document.querySelector("#fave").value = "no";
    
      submitButton.parentElement.parentElement.close();

    }
  }
)
     

  

// initial books
addBookToLibrary(
  "There's No Such Thing as an Easy Job",
  "Kikuko Tsumura",
  416,
  "Finished",
  "Yes"
);
addBookToLibrary("If You Should Fail", "Joe Moran", 168, "Finished", "Yes");
addBookToLibrary(
  "The Myth of Sisyphus and Other Essays",
  "Albert Camus",
  224,
  "Reading",
  "No"
);
addBookToLibrary(
  "Semicolon: The Past, Present, and Future of a Misunderstood Mark",
  "Cecelia Watson",
  224,
  "Reading",
  "No"
);
addBookToLibrary("Sweet Bean Paste", "Durian Sukegawa", 224, "Unread", "No");

displayBooks();
