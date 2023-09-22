function getTotalBooksCount(books) {
  return books.length;
}
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let count = 0;
  for (const book of books) {
    if (book.borrows.length > 0 && !book.borrows[0].returned) {
      count++;
    }
  }
  return count;
}


function getMostCommonGenres(books=[]) {
  const lookup = {}
  books.forEach ((bookObj)=>{
  const {genre} = bookObj;
  if(!lookup[genre]){
    lookup[genre]=1;
  }else{
    lookup[genre]++;
  }
  })
  const result = []
  for(let genreNameKey in lookup){
    const obj = {name: genreNameKey, count: lookup[genreNameKey]};
    result.push(obj)
  }
  result.sort((elementA,elementB)=>{
    return elementB.count - elementA.count;
  })
  return result.slice(0,5);
};

function getMostPopularBooks(books = []) {
  books.sort((bookA, bookB) => bookB.borrows.length - bookA.borrows.length);
  const result = books.slice(0, 5).map((bookObj) => ({
    name: bookObj.title,
    count: bookObj.borrows.length,
  }));
  return result;
}

function getMostPopularAuthors(books=[], authors=[]) { 
  const topTwoMostPopularAuthors = books.sort((booksObjA, booksObjB)=>{
      return booksObjB.borrows.length - booksObjA.borrows.length
  }).slice(0,5)
  const result = [];
  topTwoMostPopularAuthors.forEach((bookObj)=>{
      const {authorId, borrows} = bookObj;
      const author = authors.find((authorObj)=>{
          return authorObj.id === authorId
      })
      const obj = { name: helperJoinFirstAndLastNames(author) , count: borrows.length }
      result.push(obj);
  })
  return result
}

function helperJoinFirstAndLastNames(author) {
  return `${author.name.first} ${author.name.last}`;
}




module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
