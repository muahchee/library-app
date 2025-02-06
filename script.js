const myLibrary = [];

function Book(title, author, pages, status, fave){
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.status = status;

  FaveBook.call(this, fave);
}

function FaveBook(fave){
  this.fave = fave;

}

Object.setPrototypeOf(Book.prototype, FaveBook.prototype);

function addBookToLibrary(title, author, pages, status, fave){
  const newBook = new Book(title, author, pages, status, fave);

  myLibrary.push(newBook);
}

const fullWrap = document.querySelector(".full-wrap");

function displayBooks(){
  
  for (let i = 0; i < myLibrary.length; i++){
    const div = document.createElement("div");

    //gives each card an index number, so it can be easily deleted
    div.dataset.indexNumber = i;

    div.setAttribute("class", "card")

    //add star fave button on card
    div.appendChild(makeFaveBtn());

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


    //setting initial fave stars
    if ( div.querySelector("p:last-of-type").textContent === "Yes"){
      div.querySelector(".star").textContent = "★";
    } else{
      div.querySelector(".star").textContent = "☆";
    }
    
    fullWrap.appendChild(div)

  }
};


function makeFaveBtn(){
  const faveBtn = document.createElement("button");

  function currentStar(e){

    if (e.target.parentElement.querySelector(".star").textContent === "☆"){

      //change star
      e.target.parentElement.querySelector(".star").textContent = "★"

      //change fave text
      e.target.parentElement.querySelector("p:last-of-type").textContent = "Yes";

      //change fave in arr
      myLibrary[e.target.parentElement.dataset.indexNumber].fave = "Yes"
      

    } else{
      //change star
      e.target.parentElement.querySelector(".star").textContent = "☆"

      //change fave text
      e.target.parentElement.querySelector("p:last-of-type").textContent = "No";

      //change fave in arr
      myLibrary[e.target.parentElement.dataset.indexNumber].fave = "No"
    }
  }

  faveBtn.textContent = "☆";
  faveBtn.setAttribute("class", "star");

  faveBtn.addEventListener("click", function (e){
    faveBtn.value = currentStar(e);
  })

  return faveBtn;
}

function makeRemoveBtn(){
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "remove book";
  removeBtn.setAttribute("class", "remove-book");

  removeBtn.addEventListener("click", function (e) {
    //remove from dom
    e.target.parentElement.remove()

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

    //gives each card an index number, so it can be easily deleted
    div.dataset.indexNumber = i;

    div.setAttribute("class", "card");

    //add star fave button on card
    div.appendChild(makeFaveBtn());

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

    //setting initial fave stars
    if (div.querySelector("p:last-of-type").textContent === "Yes"){
      div.querySelector(".star").textContent = "★";
    } else{
      div.querySelector(".star").textContent = "☆";
    }

    fullWrap.appendChild(div)
  } 
}

submitButton.addEventListener("click", () =>{
  event.preventDefault();

  const newTitle = document.querySelector("#title").value;
  const newAuthor = document.querySelector("#author").value;
  const newPages = document.querySelector("#pages").value;
  const newStatus = document.querySelector("#status").value;
  const newFave = document.querySelector('#fave').value;

  addBookToLibrary(newTitle, newAuthor, newPages, newStatus, newFave)
  
  displayAddedBook();

  // restores to default values
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#status").value = 'finished';
  document.querySelector("#fave").value = 'no';

});

// initial books
addBookToLibrary("There's No Such Thing as an Easy Job", "Kikuko Tsumura", 416, "Finished", "Yes");
addBookToLibrary("If You Should Fail", "Joe Moran", 168, "Finished", "Yes");
addBookToLibrary("The Myth of Sisyphus and Other Essays", "Albert Camus", 224, "Reading", "No");
addBookToLibrary("Semicolon: The Past, Present, and Future of a Misunderstood Mark", "Cecelia Watson", 224, "Reading", "No");
addBookToLibrary("Sweet Bean Paste", "Durian Sukegawa", 224, "Unread", "No");

displayBooks();