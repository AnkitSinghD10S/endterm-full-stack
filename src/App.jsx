import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishedOn: '',
    genre: '',
    rating: ''
  });
  const [editId, setEditId] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API_URL}/read`);
      setBooks(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_URL}/update/${editId}`, formData);
      } else {
        await axios.post(`${API_URL}/create`, formData);
      }
      setFormData({ title: '', author: '', publishedOn: '', genre: '', rating: '' });
      setEditId(null);
      fetchBooks();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleEdit = (book) => {
    setFormData({
      title: book.title,
      author: book.author,
      publishedOn: book.publishedOn,
      genre: book.genre,
      rating: book.rating
    });
    setEditId(book._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      fetchBooks();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>{editId ? 'Edit Book' : 'Add Book'}</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        <input
          name="publishedOn"
          type="date"
          value={formData.publishedOn}
          onChange={handleChange}
          placeholder="Published On"
          required
        />
        <input
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
          required
        />
        <input
          name="rating"
          type="number"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating"
          min="1"
          max="5"
          required
        />
        <button type="submit" style={{ marginLeft: '10px' }}>
          {editId ? 'Update' : 'Create'}
        </button>
      </form>

      <h2>Book List</h2>
      <ul>
        {books.map((b) => (
          <li key={b._id}>
            <b>{b.title}</b> by {b.author} (ISBN: {b.isbn})<br />
            Published on: {new Date(b.publishedOn).toLocaleDateString()}<br />
            Genre: {b.genre}<br />
            Rating: {b.rating}/5<br />
            <button onClick={() => handleEdit(b)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(b._id)} style={{ marginLeft: '5px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;