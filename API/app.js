const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs-extra');

app.use(cors());
app.use(bodyParser.text());

let rawData = fs.readFileSync('blogs.json');
let blogs = JSON.parse(rawData);
let blogID;

app.get('/', (req, res) => res.send('Hello world!'))

app.get('/blogs', (req, res) => res.send(JSON.stringify(blogs)));

app.post('/blogs/new', (req, res) => {
  const newPost = req.body;
  blogs.push(newPost);
  res.send(JSON.stringify(newPost));
});

app.get('/blog/:id/comments', (req, res) => {
  blogID = req.params.id;
  for (blog in blogs) {
    if (blogs.blogs.key === blogID) {
      res.send(JSON.stringify(blog.comments));
    }
  }
});

app.post('/blogs/:id/comments', (req, res) => {
  const newComment = req.body;
  blogID = req.params.id;
  for (blog in blogs) {
    if (blogs.blogs.key === blogID) {
      blogs.comments.push(newComment);
    }
  }
  res.send(JSON.stringify(newComment))
});

app.get('/blogs/search', (req, res) => {
  let searchTerm = req.query.q;
  let results = blogSearch(searchTerm);
  results.length > 0
    ? res.send(JSON.stringify(results))
    : res.send(JSON.stringify(`"${searchTerm}" did not return any results!`));
});

app.listen(port, () => console.log(`Express now departing from http://localhost:${port}!`));

const blogSearch = (searchTerm) => {
  return blogs.blogs.filter(
    (blog) =>
      blog.title.includes(searchTerm) ||
      blog.text.includes(searchTerm) ||
      blog.tags.includes(searchTerm)
  );
};
