let bookList;

async function renderBook(filter){
  const books = document.querySelector(".books");
  books.classList.add("books__loading")
  
  if(!bookList){
    bookList = await getBooks(); // if no booklist await and fetch it, but once we have it, shouldn't wait anymore
    //to sort and other stuff
  }

  books.classList.remove("books__loading")

  console.log(bookList);

  if (filter === 'LOW_TO_HIGH'){
    // console.log(filter)
    // bookList.sort((a, b) => {
    //   return a.originalPrice - b.originalPrice
    // })
    bookList.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice))
    
  }

  else if(filter === 'HIGH_TO_LOW'){
    bookList.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)) //unlike map sort changes the original list 
  }

  else if(filter === 'RATING'){
    bookList.sort((a, b) => b.rating - a.rating)
  }

// books.innerHTML = bookList.map((book, index) => 
//   `<div class="book">
//   <figure class="book__img--wrapper">
//     <img class="book__img" src="${bookList[index].url}" alt="">
//   </figure>
//   <div class="book__title">
//     ${bookList[index].title}
//   </div>
//   <div class="book__ratings">
//     <i class="fas fa-star"></i>
//     <i class="fas fa-star"></i>
//     <i class="fas fa-star"></i>
//     <i class="fas fa-star"></i>
//     <i class="fas fa-star-half-alt"></i>
//   </div>
//   <div class="book__price">
//     <span class="book__price--normal">$${bookList[index].originalPrice}</span> $${bookList[index].salePrice}
//   </div>
// </div>`
// ).join("")

books.innerHTML = bookList.map(book => {
  return `<div class="book">
  <figure class="book__img--wrapper">
    <img class="book__img" src="${book.url}" alt="">
  </figure>
  <div class="book__title">
    ${book.title}
  </div>
  <div class="book__ratings">
    ${ratingsHTML(book.rating)}
  </div>
  <div class="book__price">
     ${priceHTML(book.originalPrice, book.salePrice)}
  </div>
</div>`
})
.join("")
};
renderBook();

//getting the rating stars
function ratingsHTML(rating){
    let ratinghtml = ""

    for(let i = 0; i < Math.floor(rating);i++ ){
      ratinghtml += `<i class="fas fa-star"></i>`
    }

    if (!Number.isInteger(rating)){
      ratinghtml += `<i class="fas fa-star-half-alt"></i>`
    }
    return ratinghtml
}

//getting the price
function priceHTML(originalPrice, salePrice){
  if (salePrice){
    return `<span class="book__price--normal">$${originalPrice.toFixed(2)}</span> $${salePrice.toFixed(2)}`
  }
  return `$${originalPrice.toFixed(2)}`
}

// event listener for filtering the books
const filter = document.querySelector("#filter")
filter.addEventListener("change", (e) => {
  renderBook(e.target.value)
})

// FAKE DATA
function getBooks() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "assets/crack the coding interview.png",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "assets/atomic habits.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "assets/deep work.jpeg",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "assets/book-1.jpeg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "assets/book-2.jpeg",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "assets/book-3.jpeg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "Cashflow Quadrant",
          url: "assets/book-4.jpeg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "assets/book-5.jpeg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
        },
        {
          id: 9,
          title: "The 5 Second Rule",
          url: "assets/book-6.jpeg",
          originalPrice: 35,
          salePrice: null,
          rating: 4,
        },
        {
          id: 10,
          title: "Your Next Five Moves",
          url: "assets/book-7.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "Mastery",
          url: "assets/book-8.jpeg",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
        },
      ])
    }, 1000);
  })
}


