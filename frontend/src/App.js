import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    skills: '',
    education: '',
  });

  const [recommendations, setRecommendations] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/recommend', formData);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h2>Graduate Job Recommender</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Skills:</label><br />
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} required />
        </div>
        <div>
          <label>Education:</label><br />
          <input type="text" name="education" value={formData.education} onChange={handleChange} required />
        </div>
        <button type="submit">Get Recommendations</button>
      </form>

      {recommendations.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Recommended Jobs:</h3>
          <ul>
            {recommendations.map((job, index) => (
              <li key={index}>{job}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
