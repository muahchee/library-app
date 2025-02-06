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

function displayBooks(){
  
}

addBookToLibrary("There's No Such Thing as an Easy Job", "Kikuko Tsumura", 416, "finished");
addBookToLibrary("If You Should Fail", "Joe Moran", 168, "finished");
addBookToLibrary("The Myth of Sisyphus and Other Essays", "Albert Camus", 224, "reading");
addBookToLibrary("Semicolon: The Past, Present, and Future of a Misunderstood Mark", "Cecelia Watson", 224, "reading");
addBookToLibrary("Sweet Bean Paste", "Durian Sukegawa", 224, "unread");

