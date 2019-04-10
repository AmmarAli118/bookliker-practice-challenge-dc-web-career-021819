document.addEventListener("DOMContentLoaded", init);
const check = () => console.log("Connected")

function init() {
  console.log('DOM loaded')
  getBooks().then(unPackArray)
}

function unPackArray(array){
  array.forEach(renderTitleLi)
}

function renderTitleLi(element){
  const ul = document.querySelector('#list')
  const li = document.createElement('li')

  li.dataset.id = element.id
  li.innerHTML = `<button>${element.title}</button>`
  li.addEventListener('click', getSingleBook)
  ul.append(li)
}

function renderBookDisplay(book){
  const showPanel = document.querySelector('#show-panel')
        showPanel.innerText = ""

  const bookH2 = document.createElement('h2')
        bookH2.innerText = book.title

  const bookImg = document.createElement('img')
        bookImg.src = book.img_url

  const bookDescription = document.createElement('p')
        bookDescription.innerText = `DESCRIPTION:

        ${book.description}`

  const readBtn = document.createElement('button')
        readBtn.dataset.id = book.id
        readBtn.innerText = "Read this Book!"
        readBtn.addEventListener('click', doSomething)

  showPanel.append(bookH2, bookImg, bookDescription, readBtn)
}

function doSomething(){
  check()

}

// fetch calls
const URL = "http://localhost:3000/books/"

function getBooks(){
  return fetch(URL)
  .then(r=>r.json())
}

function getSingleBook(e){
  const bookId = e.currentTarget.dataset.id
  return fetch(URL+bookId)
  .then(r=>r.json())
  .then(renderBookDisplay)
}

function likeBook(e){
  debugger
  const bookId = e.currentTarget.dataset.id
  const userId = e.currentTarget.dataset.id //check this
  const username = e.currentTarget.dataset.id //check this
  const options = {
    method: 'PATCH',
    headers: {'content-type':'application/json'},
    body: {
      users: {id: userId, username: username}
    }

  }
  return fetch(URL+bookId, options)
  .then(r=>r.json())
}
