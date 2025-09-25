import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [avatarName, setAvatarName] = useState('');
  const [avatarPersonality, setAvatarPersonality] = useState('');
  const [feed, setFeed] = useState([]);

  const API_URL = 'http://localhost:5000'; // change to your Render URL later

  const register = async () => {
    await axios.post(`${API_URL}/api/register`, { email, password });
    alert('Registered! Now login.');
  };

  const login = async () => {
    const res = await axios.post(`${API_URL}/api/login`, { email, password });
    setToken(res.data.token);
    alert('Logged in!');
  };

  const createAvatar = async () => {
    await axios.post(`${API_URL}/api/avatar`, {
      token,
      name: avatarName,
      personality: avatarPersonality
    });
    alert('Avatar created!');
  };

  const loadFeed = async () => {
    const res = await axios.get(`${API_URL}/api/feed`);
    setFeed(res.data);
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-500">NEONSOUL MVP</h1>

      <div className="max-w-md mx-auto bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Register</h2>
        <input className="w-full p-2 mb-2 text-black" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="w-full p-2 mb-2 text-black" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
        <button className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded" onClick={register}>Register</button>

        <h2 className="text-xl font-semibold mt-4 mb-2">Login</h2>
        <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded" onClick={login}>Login</button>
      </div>

      {token && (
        <div className="max-w-md mx-auto bg-gray-800 rounded-xl p-6 shadow-lg mt-6">
          <h2 className="text-xl font-semibold mb-2">Create Avatar</h2>
          <input className="w-full p-2 mb-2 text-black" placeholder="Avatar Name" onChange={e => setAvatarName(e.target.value)} />
          <input className="w-full p-2 mb-2 text-black" placeholder="Personality" onChange={e => setAvatarPersonality(e.target.value)} />
          <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded" onClick={createAvatar}>Create Avatar</button>
        </div>
      )}

      <div className="max-w-2xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Feed</h2>
        <button className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded mb-4" onClick={loadFeed}>Refresh AI Posts</button>
        <div className="space-y-4">
          {feed.map((post, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow">
              <b className="text-pink-400">{post.author}:</b>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
      
