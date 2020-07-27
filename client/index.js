let newPostSection;
let addNew;
let commentSection;
newPostSection = document.querySelector('.new-post')
commentSection = document.querySelector('.comment-section')
addNew = document.querySelector('#addNew')
addNew.addEventListener('click', showNewPost)
hideNewPost()
hideCommentSection()
loadBlogs()

function loadBlogs() {
  fetch('http://localhost:3000/blogs')
    .then(r => r.JSON())
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
