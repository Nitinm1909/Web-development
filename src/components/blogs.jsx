import React, { useState, useEffect } from "react";
import "./blogs.css";

const initialBlogs = [
  {
    id: "blog1",
    title: "Top Hearing Aids in 2025",
    content: "A roundup of the latest and most effective hearing aids this year.",
    image: require("./assets/blog1.jpg"),
    category: "Technology",
  },
  {
    id: "blog2",
    title: "Choosing the Right Hearing Aid",
    content: "What to consider when selecting your first hearing device.",
    image: require("./assets/blog2.avif"),
    category: "Advice",
  },
  {
    id: "blog3",
    title: "How AI is Revolutionizing Hearing",
    content: "Artificial intelligence and sound processing innovations.",
    image: require("./assets/blog3.jpeg"),
    category: "Technology",
  },
  {
    id: "blog4",
    title: "Success Story: Sarah’s Journey",
    content: "How a hearing aid gave back her confidence.",
    image: require("./assets/blog3.jpeg"),
    category: "Stories",
  },
  {
    id: "blog5",
    title: "Overcoming Hearing Stigma",
    content: "Changing perceptions about hearing loss.",
    image: require("./assets/blog3.jpeg"),
    category: "Advice",
  },
];

const reactionsList = ["👍", "❤️", "😂", "😮"];

const BlogPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [likes, setLikes] = useState({});
  const [reactions, setReactions] = useState({});
  const [toast, setToast] = useState("");

  // Load from localStorage
  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    const storedReactions = JSON.parse(localStorage.getItem("reactions")) || {};
    setLikes(storedLikes);
    setReactions(storedReactions);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
    localStorage.setItem("reactions", JSON.stringify(reactions));
  }, [likes, reactions]);

  const handleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    showToast("You liked this blog!");
  };

  const handleReaction = (id, emoji) => {
    const newReactions = { ...(reactions[id] || {}) };
    newReactions[emoji] = (newReactions[emoji] || 0) + 1;
    setReactions((prev) => ({ ...prev, [id]: newReactions }));
    showToast(`You reacted with ${emoji}`);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const filtered = initialBlogs.filter(
    (b) =>
      (category === "All" || b.category === category) &&
      b.title.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ["All", ...new Set(initialBlogs.map((b) => b.category))];

  return (
    <div className="blog-container">
      <h1 className="page-title">Hearing Aid Blog</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c, i) => (
            <option key={i}>{c}</option>
          ))}
        </select>
      </div>

      <div className="blog-grid">
        {filtered.map((blog) => (
          <div className="blog-card" key={blog.id}>
            <img src={blog.image} alt={blog.title} />
            <div className="blog-content">
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
              <div className="actions">
                <button onClick={() => handleLike(blog.id)}>❤️ {likes[blog.id] || 0}</button>
                {reactionsList.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleReaction(blog.id, emoji)}
                    className="reaction"
                  >
                    {emoji} {reactions[blog.id]?.[emoji] || 0}
                  </button>
                ))}
              </div>
              <a href={`/blogs/${blog.id}`} className="read-more">Read More →</a>
            </div>
          </div>
        ))}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
};

export default BlogPage;
