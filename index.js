const express = require('express');
const bodyParser = require('body-parser');
const books = require('./data.json')
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;



//create a new book
app.post('/books',(req,res) => {
  const { book_id, title, author, genre, year, copies } = req.body;
  if (!book_id || !title || !author || !genre || !year || !copies) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const newBook = { book_id, title, author, genre, year, copies };
  books.push(newBook);
  return res.status(201).json(newBook);
})

// Retrieve All Books
app.get('/books',(req,res)=>{
  res.status(200).json(books);
})

//Retrieve a Specific Book by ID
app.get('/books/:id',(req,res) => {
  const id = req.params.id;
  const book = books.find(book => book.book_id == id)

  if(!book){
    return res.status(404).json({ error: 'Book not found' });
  }
  res.status(200).json(book);
})
//update a specific book by id
app.put('/books/:id', (req, res) => {
  const { title, author, genre, year, copies } = req.body;
  const book = books.find(b => b.book_id === req.params.id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  if (title) book.title = title;
  if (author) book.author = author;
  if (genre) book.genre = genre;
  if (year) book.year = year;
  if (copies) book.copies = copies;

  res.status(200).json(book);
});

//delete a speccific book by id
app.delete('/books/:id', (req, res) => {
  const index = books.find(b => b.book_id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }


  books.splice(index, 1); 
  res.status(200).json({ message: 'Book deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});