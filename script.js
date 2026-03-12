let books=[]
let currentPage=1
let perPage=8
let filteredBooks=[]

fetch("books.json")

.then(res=>res.json())

.then(data=>{

books=data

filteredBooks=data

displayBooks()

})

function displayBooks(){

let start=(currentPage-1)*perPage

let end=start+perPage

let pageBooks=filteredBooks.slice(start,end)

let container=document.getElementById("booksContainer")

container.innerHTML=""

pageBooks.forEach(book=>{

container.innerHTML+=`

<div class="book">

<img src="${book.cover}" loading="lazy">

<h3>${book.title}</h3>

<p>${book.author}</p>

<a class="download" href="${book.pdf}" download>Download</a>

</div>

`

})

createPagination()

}

function createPagination(){

let totalPages=Math.ceil(filteredBooks.length/perPage)

let pag=document.getElementById("pagination")

pag.innerHTML=""

for(let i=1;i<=totalPages;i++){

pag.innerHTML+=`<button onclick="goPage(${i})">${i}</button>`

}

}

function goPage(page){

currentPage=page

displayBooks()

}

document.getElementById("searchBox")

.addEventListener("keyup",function(){

let text=this.value.toLowerCase()

filteredBooks=books.filter(b=>b.title.toLowerCase().includes(text))

currentPage=1

displayBooks()

})

function filterCategory(cat){

if(cat=="all"){

filteredBooks=books

}else{

filteredBooks=books.filter(b=>b.category==cat)

}

currentPage=1

displayBooks()

  }
