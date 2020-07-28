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
                                          <h4 id="h4Item">${newData[i].text}<h4>
                                          <p>${newData[i].tags}</p>
                                          <button type="button" id="button${i}">View Comments</button>
                                          <label class="emoji-but">
                                              <span id="${i}" class="emoji-info">&#128515;</span>
                                              <p id="react1-${i}">0</p>
                                          </label>
                                          <label class="emoji-but">
                                              <span id="${i}" class="emoji-info">&#128514;</span>
                                              <p id="react2-${i}">0</p>
                                          </label>
                                          <label class="emoji-but">
                                                <span id="${i}" class="emoji-info">&#128546;</span>
                                                <p id="react3-${i}">0</p>
                                          </label>
                                          <button type="button" id="emojiButton${i}">Send Emoji</button>
                                          </section>`)

  }
  let  check1Array = document.querySelectorAll(`.emoji-info`)


  for (i=0; i < check1Array.length; i++){
    check1Array[i].addEventListener('click', sendEmojiData)
}

}





function sendEmojiData(e) {
  let emojiSent = e.target.innerText
  let idSent = e.target.id
  console.log(emojiSent)
  console.log(idSent)
  if (emojiSent === "😃") {
    emojiSent = "smiley"
  } else if (emojiSent === "😂") {
    emojiSent = "laugh"
  } else if (emojiSent === "😢") {
    emojiSent = "sad"
  }
console.log(`http://localhost:3000/blogs/${idSent}/emojis/${emojiSent}`)
  fetch(`http://localhost:3000/blogs/${idSent}/emojis/${emojiSent}`)
    .then(r => r.json())
    .then(increaseEmojiCount)
    .catch(console.warn)
}

function increaseEmojiCount(data) {
  console.log(data)
  document.getElementById('react1-0').textContent = data
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

    const options = {
        method: 'POST',
        body: JSON.stringify(`"Title: ${title}", "Text: ${text}", "Tags: ${dropdown}"`),
    };
    fetch('http://localhost:3000/blogs/new', options)
    .then(r => r.json())
    .then(console.log(title))
    .catch(console.warn)
    deleteBlogs()
  }
