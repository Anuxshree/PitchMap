import React, { useState } from 'react';
import './App.css'; 

const App = () => {
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Category1');
    const [results, setResults] = useState([]);
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:8080/get_similar_projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description, category }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                setMessage(data.message);
                setResults([]);
            } else {
                setResults(data);
                setMessage('');
            }
        })
        .catch(error => {
            setMessage('An error occurred while fetching similar projects.');
            setResults([]);
        });
    };

    return (
        <div>
            <header>
                <div className="container">
                    <h1 className="logo">Project Proposal Generator</h1>
                    <nav>
                        <a href="#">Home</a>
                        <a href="#">About</a>
                        <a href="#">Contact</a>
                    </nav>
                </div>
            </header>

            <section className="hero">
                <div className="hero-content">
                    <h2>Generate Projects Instantly</h2>
                    <p>Enter your project description and find related projects in your category.</p>
                    <button className="cta-button" onClick={() => document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth' })}>
                        Get Started
                    </button>
                </div>
            </section>

            <main className="container">
                <div className="form-card">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="description">Project Description</label>
                        <textarea
                            id="description"
                            rows="4"
                            placeholder="Describe your project..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        
                        <label htmlFor="category">Select Category</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="E-commerce">E-commerce</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Finance">Finance</option>
                            <option value="Travel">Travel</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Smart Cities">Smart Cities</option>
                            <option value="Social Media">Social Media</option>
                            <option value="Retail">Retail</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Education">Education</option>
                            <option value="Real Estate">Real Estate</option>
                            <option value="Agriculture">Agriculture</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Environment">Environment</option>
                            <option value="Communication">Communication</option>
                            <option value="Energy">Energy</option>
                            <option value="Sports">Sports</option>
                            <option value="Healthcare">Healthcare</option>
                        </select>
                        
                        <button type="submit" className="submit-button">Find Similar Projects</button>
                    </form>
                </div>
                
                <div id="results" className="results-grid">
                    {message && <div className="alert alert-warning">{message}</div>}
                    {results.map((project, index) => (
                        <div className="card" key={index}>
                            <p><strong>Project Description:</strong> {project['Project Description Required']}</p>
                            <h5>{project['Project Description']}</h5>
                            <p><strong>Tools/Technologies:</strong> {project['Tools/Technologies Required']}</p>
                            <p><strong>Expected Outcome:</strong> {project['Expected Outcome']}</p>
                            <p><strong>Challenges:</strong> {project['Implementation Challenges']}</p>
                        </div>
                    ))}
                </div>
            </main>

            <footer>
                <div className="container">
                    <p>&copy; 2023 Project Similarity Finder. All rights reserved.</p>
                    <div className="social-links">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;