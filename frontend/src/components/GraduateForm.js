import React, { useState } from 'react';
import axios from 'axios';

function GraduateForm() {
  const [formData, setFormData] = useState({
    name: '',
    education: '',
    skills: '',
    resumeLink: ''
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", formData); // Debug log

    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:5000/recommend', formData);
      setRecommendations(response.data.recommendations || []);
    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to get recommendations. Please make sure the backend is running.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Graduate Job Recommender</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Education:</label><br />
          <input name="education" value={formData.education} onChange={handleChange} required />
        </div>
        <div>
          <label>Skills (comma separated):</label><br />
          <input name="skills" value={formData.skills} onChange={handleChange} required />
        </div>
        <div>
          <label>Resume Link:</label><br />
          <input name="resumeLink" value={formData.resumeLink} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {recommendations.length > 0 && (
        <div>
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

export default GraduateForm;
