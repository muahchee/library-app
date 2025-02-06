const myLibrary = [];

function Book(title, author, pages, status){
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.status = status
}

function addBookToLibrary(title, author, pages, status){
  const newBook = new Book(title, author, pages, status);

  myLibrary.push(newBook);
}

const fullWrap = document.querySelector(".full-wrap");

function displayBooks(){
  
  for (let i = 0; i < myLibrary.length; i++){
    const div = document.createElement("div");
    div.setAttribute("class", "card")

    for (let j = 0; j < Object.keys(myLibrary[i]).length; j++){
      
      const h2 = document.createElement("h2");
      h2.textContent = 
        Object.keys(myLibrary[i])[j]
        //capitalise
        .charAt(0)
        .toUpperCase() 
        + Object.keys(myLibrary[i])[j].slice(1);

      const p = document.createElement("p");
      p.textContent =
        //get value from selected key
        myLibrary[i][Object.keys(myLibrary[i])[j]];

      div.appendChild(h2);
      div.appendChild(p);
    }

    //button to remove card    
    div.appendChild(makeRemoveBtn());
    
    fullWrap.appendChild(div)

  }
};

function makeRemoveBtn(){
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "remove book";
  removeBtn.setAttribute("class", "remove-book");

  removeBtn.addEventListener("click", function (e) {
    e.target.parentElement.remove()
  });

  return removeBtn;
}


// user adds book

// open and close "add book" form
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".add-book");
const closeButton = document.querySelector(".close-dialog");

showButton.addEventListener("click", () =>{
  dialog.showModal();
});

closeButton.addEventListener("click", () =>{
  dialog.close();
});

//adding the book to grid
const submitButton = document.querySelector(".submit");

// display recently added book
function displayAddedBook(){
  for (let i = myLibrary.length - 1; i < myLibrary.length; i++){
    const div = document.createElement("div");
    div.setAttribute("class", "card")

    for (let j = 0; j < Object.keys(myLibrary[i]).length; j++){
      
      const h2 = document.createElement("h2");
      h2.textContent = 
        Object.keys(myLibrary[i])[j]
        //capitalise
        .charAt(0)
        .toUpperCase() 
        + Object.keys(myLibrary[i])[j].slice(1);

      const p = document.createElement("p");
      p.textContent =
        //get value from selected key
        myLibrary[i][Object.keys(myLibrary[i])[j]];

      div.appendChild(h2);
      div.appendChild(p);
    }

    //button to remove card   
    div.appendChild(makeRemoveBtn());

    fullWrap.appendChild(div)
  } 
}

submitButton.addEventListener("click", () =>{
  event.preventDefault();

  const newTitle = document.querySelector("#title").value;
  const newAuthor = document.querySelector("#author").value;
  const newPages = document.querySelector("#pages").value;
  const newStatus = document.querySelector("#status").value;

  addBookToLibrary(newTitle, newAuthor, newPages, newStatus)
  
  displayAddedBook();

  // restores to default values
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#status").value = 'finished';
});

// initial books
addBookToLibrary("There's No Such Thing as an Easy Job", "Kikuko Tsumura", 416, "Finished");
addBookToLibrary("If You Should Fail", "Joe Moran", 168, "Finished");
addBookToLibrary("The Myth of Sisyphus and Other Essays", "Albert Camus", 224, "Reading");
addBookToLibrary("Semicolon: The Past, Present, and Future of a Misunderstood Mark", "Cecelia Watson", 224, "Reading");
addBookToLibrary("Sweet Bean Paste", "Durian Sukegawa", 224, "Unread");

displayBooks();