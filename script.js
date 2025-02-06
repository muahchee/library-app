const myLibrary = [];

function Book(title, author, pages, read){
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
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
    fullWrap.appendChild(div)
  }
}

addBookToLibrary("There's No Such Thing as an Easy Job", "Kikuko Tsumura", 416, "finished");
addBookToLibrary("If You Should Fail", "Joe Moran", 168, "finished");
addBookToLibrary("The Myth of Sisyphus and Other Essays", "Albert Camus", 224, "reading");
addBookToLibrary("Semicolon: The Past, Present, and Future of a Misunderstood Mark", "Cecelia Watson", 224, "reading");
addBookToLibrary("Sweet Bean Paste", "Durian Sukegawa", 224, "unread");

displayBooks();