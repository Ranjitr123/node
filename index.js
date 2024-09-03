const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const url = 'mongodb://localhost:27017/mydatabase';

// Connect to MongoDB
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected successfully to MongoDB');
}).catch((err) => {
  console.error('Connection error:', err);
});

// Define a schema and model
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
});

const Book = mongoose.model('Book', bookSchema);

// Example: Creating a new book
const newBook = new Book({
  title: 'testing tilte',
  author: 'testing author',
});

newBook.save()
  .then(() => console.log('Book saved'))
  .catch(err => console.error('Error saving book:', err));

// Set up Express routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// POST route to create a new book
app.post('/books', async (req, res) => {
  try {
    const { title, author } = req.body;
    const book = new Book({ title, author });
    await book.save();
    res.status(201).send(book); // Respond with the created book and status 201 (Created)
  } catch (error) {
    res.status(400).send({ error: 'Error creating book' }); // Respond with an error message
  }
});

// GET route to retrieve all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find(); // Retrieve all books from the database
    res.status(200).send(books); // Respond with the list of books and status 200 (OK)
  } catch (error) {
    res.status(500).send({ error: 'Error fetching books' }); // Respond with an error message
  }
});

// GET route to retrieve a book by ID
app.get('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id); // Retrieve the book by ID
    if (!book) {
      return res.status(404).send({ error: 'Book not found' }); // Respond with 404 if not found
    }
    res.status(200).send(book); // Respond with the book and status 200 (OK)
  } catch (error) {
    res.status(500).send({ error: 'Error fetching book' }); // Respond with an error message
  }
});
// DELETE route to delete a book by ID
app.delete('/books/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findByIdAndDelete(id); // Find and delete the book by ID
      if (!book) {
        return res.status(404).send({ error: 'Book not found' }); // Respond with 404 if not found
      }
      res.status(200).send({ message: 'Book deleted successfully', book }); // Respond with success message and the deleted book
    } catch (error) {
      res.status(500).send({ error: 'Error deleting book' }); // Respond with an error message
    }
  });
  

// Start server on port 3200
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
