const fs = require('fs-extra');

let rawData = fs.readFileSync('blogs.json');
let blogs = JSON.parse(rawData);

let newData = {
  "title": "Number 4",
  "text": "djlas",
  "tags": [
    "music",
    "art",
    "technology"
  ],
  "comments": [
    "comment 1",
    "comment 2",
    "comment 3"
  ],
  "emojis":
    {
    "emoji 1": 0,
    "emoji 2": 0,
    "emoji 3": 0
    },
  "key": 3
}

blogs.blogs.push(newData);

fs.writeFile('blogs.json', JSON.stringify(blogs, null, 2), (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});

console.log(newData)
