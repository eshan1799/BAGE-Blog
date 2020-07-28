let newPostSection;
let addNew;
let commentSection;
const blogPost = document.querySelector("#submit")
blogPost.addEventListener("click", savePost)
let title;
let text;
let dropdown;
let formElement = []
let newData = []
let blogSection = document.querySelector('.blog-section')
let newP = []
let emojiCheck;
let array;
emojiCheck = document.querySelector("#emojiSelect")
const newPost = document.querySelector("#make-post");
newPostSection = document.querySelector('.new-post')
commentSection = document.querySelector('.comment-section')
addNew = document.querySelector('#addNew')
addNew.addEventListener('click', showNewPost)
hideNewPost()
hideCommentSection()
loadBlogs()

function loadBlogs() {
  fetch('http://localhost:3000/blogs')
    .then(r => r.json())
    .then(drawBlogs)
    .catch(console.error())
  }

function deleteBlogs() {
  location.reload()
}


function drawBlogs(array) {
    newData = array.blogs
  for (i = 0; i < newData.length; i++){
    newPost.insertAdjacentHTML("afterend", `<section class="post-made">
                                          <h1>${newData[i].title}</h1>
                                          <label class="react">&#128515;
                                          <p id="react1-${i}">0</p>
                                          </label>
                                          <label class="react">&#128514;
                                          <p id="react2-${i}">0</p>
                                          </label>
                                          <label class="react">&#128546;
                                          <p id="react3-${i}">0</p>
                                          </label>
                                          <h4 id="h4Item">${newData[i].text}<h4>
                                          <p>${newData[i].tags}</p>
                                          <button type="button" id="button${i}">View Comments</button>
                                          <label class="emoji-but">
                                              <input type="checkbox" id="emoji1-${i}">
                                              <span class="emoji-slider">&#128515;</span>
                                          </label>
                                          <label class="emoji-but">
                                              <input type="checkbox" id="emoji2-${i}">
                                              <span class="emoji-slider">&#128514;</span>
                                          </label>
                                          <label class="emoji-but">
                                              <input type="checkbox" id="emoji3-${i}">
                                              <span class="emoji-slider">&#128546;</span>
                                          </label>
                                          <button type="button" id="emojiButton${i}">Send Emoji</button>
                                          </section>`)

  }
ifCheck()
}



function ifCheck() {
  let check1 = false
  let check2 = false
  let check3 = false
if (document.getElementById('emoji1-0').checked === true) {
  check1 = true
}
if (document.getElementById('emoji2-0').checked === true) {
  check2 = true
}
if (document.getElementById('emoji3-0').checked === true) {
  check3 = true
}
  console.log(check1)
  console.log(check2)
  console.log(check3)
  }



function hideNewPost() {
  newPostSection.setAttribute('style', 'visibility: hidden;')
}

function hideCommentSection() {
  commentSection.setAttribute('style', 'visibility: hidden;')
}

function showNewPost() {
  ifCheck()
  newPostSection.setAttribute('style', 'visibility: visible;')
}

function savePost(e){
    e.preventDefault();
    title = document.getElementById("title").value;
    console.log(title)
    text = document.getElementById("blogText").value;
    console.log(text)
    dropdown = document.getElementById("category").value;
    console.log(dropdown)
    newPostSection.setAttribute('style', 'visibility: hidden;')

    const data = {title : `${title}`, text : `${text}`, tags : `${dropdown}`}
    const options = {
        method: 'POST',
        headers : {
          "ContentType": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch('http://localhost:3000/blogs/new', options)
    .then(r => r.json())
    .then(console.log(title))
    .catch(console.warn)
    deleteBlogs()
}
