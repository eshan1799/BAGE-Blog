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
    console.log(newData.length)
  for (i = 0; i < array.blogs.length; i++){
    newPost.insertAdjacentHTML("afterend", `<section class="post-made">
                                          <h1>${newData[i].title}</h1>
                                          <h4>${newData[i].text}<h4>
                                          <p>${newData[i].tags}</p>
                                          <button type="button" id="button">View Comments</button>
                                          </section>`)
  }
}

function hideNewPost() {
  newPostSection.setAttribute('style', 'visibility: hidden;')
}

function hideCommentSection() {
  commentSection.setAttribute('style', 'visibility: hidden;')
}
function showNewPost() {
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
    loadBlogs()
}
