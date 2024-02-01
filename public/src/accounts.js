



function findAccountById(accounts, id) {
  return accounts.find((account)=> account.id === id) 
}

function sortAccountsByLastName(accounts) {

const sortedAccounts = accounts.sort((a,b) => {
  const accountA = a.name.last.toLowerCase()
  const accountB = b.name.last.toLowerCase()

  if (accountA < accountB){
    return -1;
  }
  if (accountA > accountB){
    return 1
  }
  return 0
})
return sortedAccounts
}
function getTotalNumberOfBorrows(account, books) {

  let count = 0
  const id = account.id
books.forEach((book)=> {
  if (book.borrows.some((borrow)=> borrow.id === id )){
      count += 1
  }
 })
  return count
}   




function getBooksPossessedByAccount(account, books, authors) {
  const inPossesion = [];
  books.map((book) => {
    book.borrows.map((borrow) => {
      
      // if iteration is NOT returned && iteration id === account.id, then push (add) 'book' iteration to 'inPossession' (with "author" key added, from above)
      if (borrow.returned === false && borrow.id === account.id) {
        authors.map((author) => {
          // if iteration 'author' id === 'book' (.map() iteration) authorId, then add "author" key and equate it to iteration 'author'.
          if (author.id === book.authorId) book["author"] = author;
        });
        inPossesion.push(book);
      }
    });
  });
  return inPossesion;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
