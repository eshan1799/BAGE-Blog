let newPostSection;
let addNew;
let commentSection;
const blogPost = document.querySelector("#submit")
blogPost.addEventListener("click", savePost)
let title;
let text;
let dropdown;
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

function drawBlogs(blog) {
  console.log(blog)
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
    const prac = document.querySelector("#practice");
    prac.textContent= title;
    text = document.getElementById("blogText").value;
    console.log(text)
    const prac2 = document.querySelector("#practice2");
    prac2.textContent= text;
    dropdown = document.getElementById("category").value;
    console.log(dropdown)
    const prac3 = document.querySelector("#practice3");
    prac3.textContent= dropdown;
    newPostSection.setAttribute('style', 'visibility: hidden;')
}
