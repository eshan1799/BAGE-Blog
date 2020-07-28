const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const { json } = require('body-parser');

app.use(cors());
app.use(bodyParser.text());

// Access external data storage
let rawData = fs.readFileSync('blogs.json');
let blogs = JSON.parse(rawData);
let blogID;

// Access client side files
app.use(express.static('client'));

//Home route
app.get('/', (req, res) => res.send('Hello world!'))

//All blogs route
app.get('/blogs', (req, res) => res.send(JSON.stringify(blogs)));

// New blog post route
app.post('/blogs/new', (req, res) => {
  const newPost = JSON.parse(req.body);
  blogs.blogs.push(newPost);
  writeBlog();
  res.send(JSON.stringify(newPost));
});

// Access comments
app.get('/blogs/:id/comments', (req, res) => {
  blogID = Number(req.params.id);
  res.send(JSON.stringify(blogs.blogs[blogID].comments))
});

// Post new comment
app.post('/blogs/:id/comments', (req, res) => {
  const newComment = req.body;
  blogID = req.params.id;
  blogs.blogs[blogID].comments.push(newComment);
  writeBlog();
  res.send(JSON.stringify(newComment));
});

// Search through blog posts
app.get('/blogs/search', (req, res) => {
  let searchTerm = req.query.q.toLowerCase();
  let results = blogSearch(searchTerm);

  results.length > 0
    ? res.send(JSON.stringify(results))
    : res.send(JSON.stringify(`"${searchTerm}" did not return any results!`));
});

// Emoji counter
app.patch('/blogs/:id/emojis', (req, res) => {
  let emoji = req.body;
  blogID = req.params.id;
  let counter = blogs.blogs[blogID].emojis.emoji;
  counter ++;
  writeBlog();
  res.send(json.stringify(counter))
});

app.listen(process.env.PORT || 3000, () => console.log(`Express now departing!`));

// Blog search function
const blogSearch = (searchTerm) => {
  if(searchTerm.startsWith("#")) {
    return blogs.blogs.filter(
    (blog) =>
      blog.tags.includes(searchTerm));
  } else {
    return blogs.blogs.filter(
    (blog) =>
      blog.title.toString().toLowerCase().includes(searchTerm)||
      blog.text.toString().toLowerCase().includes(searchTerm) ||
      blog.tags.toString().toLowerCase().includes(searchTerm));
  }
};

// Rewrites the external blog json file
function writeBlog() {
  fs.writeFile('blogs.json', JSON.stringify(blogs, null, 2), (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });
}

module.exports = app;
