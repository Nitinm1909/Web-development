import React, { useState, useEffect } from 'react';

const BlogPage = () => {
  const articles = [
    { title: "The Latest in Hearing Aid Technology", content: "Discover the newest advancements...", link: "#tech1", category: "Technology Updates" },
    { title: "Top 5 Hearing Aid Brands in 2025", content: "Explore the best brands available...", link: "#tech2", category: "Technology Updates" },
    { title: "How to Choose the Right Hearing Aid", content: "Finding the perfect hearing aid...", link: "#advice1", category: "Expert Advice" },
    { title: "Common Myths About Hearing Loss", content: "Debunking the misconceptions...", link: "#advice2", category: "Expert Advice" },
    { title: "Success Story: Regaining Confidence", content: "An inspiring journey...", link: "#story1", category: "Success Stories" },
    { title: "Overcoming Challenges with Hearing Loss", content: "Stories of resilience...", link: "#story2", category: "Success Stories" },
  ];

  const categories = [...new Set(articles.map(article => article.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedArticles, setLikedArticles] = useState([]);
  const [darkMode, setDarkMode] = useState(true); // Set dark mode to true by default

  const toggleLike = (title) => {
    setLikedArticles(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const filteredArticles = articles.filter(
    article =>
      (selectedCategory === "All" || article.category === selectedCategory) &&
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const themeStyles = {
    background: darkMode ? "#000000" : "#f9f9f9", // Black background for dark mode
    color: darkMode ? "#ffffff" : "#333", // White text color for dark mode
    transition: "all 0.3s ease"
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
<div style={{ ...themeStyles, fontFamily: 'Arial, sans-serif', padding: '20px',  }}>

      {/* ✅ Dark-mode responsive Navbar */}

      {/* Sticky Side Nav */}
      <aside style={{
        position: 'fixed', top: '100px', left: '20px', width: '180px',
        background: darkMode ? '#222' : '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '10px'
      }}>
        <h4 style={{ margin: '10px 0' }}>Jump to Category</h4>
        {categories.map((cat, i) => (
          <a key={i} href={`#${cat.replace(/\s+/g, '')}`} style={{
            display: 'block', margin: '5px 0', color: darkMode ? '#90caf9' : '#4a90e2', textDecoration: 'none'
          }}>
            {cat}
          </a>
        ))}
      </aside>

      {/* Header */}
<header style={{ textAlign: 'center', marginBottom: '70px', marginTop: '40px' }}>
  <h1>Empowering Better Hearing</h1>
  <p>Your journey to better hearing starts here.</p>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px', width: '70%', borderRadius: '6px',marginTop: '20px',
            border: '1px solid #ccc', fontSize: '1rem'
          }}
        />
        <div style={{ marginTop: '15px' }}>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{
            padding: '8px 16px', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc'
          }}>
            <option value="All">All Categories</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Blog Cards */}
      {categories.map((cat, i) => {
        const group = filteredArticles.filter(a => a.category === cat);
        if (group.length === 0) return null;

        return (
          <section id={cat.replace(/\s+/g, '')} key={i} style={{ marginBottom: '40px' }}>
            <h2>{cat}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px 20px',marginTop: '20px', }}>
              {group.map((article, idx) => (
                <div key={idx} id={article.link.slice(1)} style={{
                  background: darkMode ? '#1e1e1e' : '#fff',
                  padding: '20px', borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  position: 'relative'
                }}>
                  <h3>{article.title}</h3>
                  <p>{article.content}</p>
                  <a href={article.link} style={{ color: '#4a90e2', textDecoration: 'none', fontWeight: 'bold' }}>
                    Read More →
                  </a>
                  <button onClick={() => toggleLike(article.title)} style={{
                    position: 'absolute', top: '15px', right: '15px',
                    background: 'transparent', border: 'none', fontSize: '1.4rem', cursor: 'pointer'
                  }}>
                    {likedArticles.includes(article.title) ? '❤️' : '🤍'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default BlogPage;
