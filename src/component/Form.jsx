import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({ title: '', id: '', author: '', publishedOn: '', genre: '', rating: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/api/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='m-20'>Register User</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" onChange={handleChange} placeholder="title" />
        <input name="id" onChange={handleChange} placeholder="id" />
        <input name="author" onChange={handleChange} type="author" placeholder="author" />
        <input name="publishedOn" onChange={handleChange} type="publish" placeholder="publish" />
        <input name="genre" onChange={handleChange} type="text" placeholder="genre" />
        <input name="rating" onChange={handleChange} type="text" placeholder="rating" />
        <br />
        <button className='m-20 bg-emerald-400 p-5 cursor-pointer rounded-xl text-white' type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;