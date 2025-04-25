import express from 'express';
import cors  from ' cors';
import mongoose from ' mongoose';

const app = express();
app.use(cors());
app.use(express.json());

const PORT =  5000;
const MONGO_URI = 'mongodb://localhost:27017/sec-d';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedOn: { type: Date, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

app.post('/api/create', async (req, res) => {
  try {
    const { title, author, publishedOn, genre, rating } = req.body;
    if (!title || !author || !publishedOn || !genre || rating == null) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newBook = new Book({ title, author, publishedOn, genre, rating });
    await newBook.save();
    res.json({ message: 'Book created successfully' });
  } catch (err) {
    res.status(500).json(err,{ error: 'Internal server error' });
  }
});

app.get('/api/read', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (err) {
    res.status(500).json(err,{ error: 'Internal server error' });
  }
});

app.put('/api/update/:id', async (req, res) => {
  try {
    const { title, author, publishedOn, genre, rating } = req.body;
    const updated = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, publishedOn, genre, rating },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json(err,{ error: 'Internal server error' });
  }
});

app.delete('/api/delete/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json(err,{ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});