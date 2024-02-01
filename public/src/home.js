
// The `getTotalBooksCount()` function in `public/src/home.js` has a single parameter:
// - An array of book objects.
// It returns a _number_ that represents the number of book objects inside of the array.

function getTotalBooksCount(books) {
const totalAmount = books.reduce((total,book) => {
  return total + 1}, 0)
return totalAmount
}

// The `getTotalAccountsCount()` function in `public/src/home.js` has a single parameter:
// - An array of accounts.
// It returns a _number_ that represents the number of account objects inside of the array.

function getTotalAccountsCount(accounts) {
  const totalAmount = accounts.reduce((total,account) => {
    return total + 1}, 0)
  return totalAmount
}

 //The `getBooksBorrowedCount()` function in `public/src/home.js` has a single parameter:
// - An array of books.
// It returns a _number_ that represents the number of books _that are currently checked out of the library._ This number can be found by looking at the first transaction object in the `borrows` array of each book. If the transaction says the book has not been returned (i.e. `returned: false`), the book is currently being borrowed.

function getBooksBorrowedCount(books) {
const totalAmount = books.reduce((total,book)=> {
  if (book.borrows.some((borrow) => borrow.returned === false)){
    return total + 1;
  }
  return total
},0)
return totalAmount
}

function getMostCommonGenres(books) {
  const genresOfBooks = books.map((book) => book.genre);
  const fiveCommonGenres = [];
  genresOfBooks.map((genre) => {
    const location = fiveCommonGenres.findIndex((element) => element.name === genre);
    if (location >= 0) {
        fiveCommonGenres[location].count = fiveCommonGenres[location].count + 1;
  
      } else {
        fiveCommonGenres.push({ name: genre, count: 1 });
      }
    });
    fiveCommonGenres.sort((a, b) => b.count - a.count);
    if (fiveCommonGenres.length > 5) {
      return fiveCommonGenres.slice(0, 5);
    }
  return fiveCommonGenres;
}

function getMostPopularBooks(books) {
    let popularBooks = [];
    const borrows = books.reduce((account, book) => {
      popularBooks.push({ name: book.title, count: book.borrows.length });
    }, []);
  
    return topFive(popularBooks);
  }
  
  function topFive(array) {
    let popularBooks = array
  
      .sort((countA, countB) => (countA.count < countB.count ? 1 : -1))
      .slice(0, 5);
  
    return popularBooks;
  }
  


function getMostPopularAuthors(books, authors) {
  const popularAuthors = [];

  for (let author of authors) {
    const authorName = `${author.name.first} ${author.name.last}`;
    let count = 0;
    for (let book of books) {
      if (author.id === book.authorId) {
        count += book.borrows.length;
      }
    }
    const authorObject = { name: authorName, count: count };
    popularAuthors.push(authorObject);
  }

  return topFive(popularAuthors);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
