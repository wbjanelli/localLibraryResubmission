function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books = []) {
  const checkedOut = books.filter((bookObj) => {
    const {borrows} = bookObj;
    const isCheckedOut = borrows[0].returned === false;
    return isCheckedOut;
  });

  const booksReturned = books.filter((bookObj) => {
    const {borrows} = bookObj;
    const bookIsReturned = borrows[0].returned === true;
    return bookIsReturned;
  });

  return [checkedOut, booksReturned];
}


function getBorrowersForBook(book={}, accounts=[]) {
  let result = [];
  let count = 0;
  const {borrows} = book;
  borrows.map((borrowObj)=>{
    const {id,returned} = borrowObj;
    const foundAccount = accounts.find((foundAccountObj)=>borrowObj.id === foundAccountObj.id);
      foundAccount.returned = returned;
      result.push(foundAccount);
  });
  return result.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
}

