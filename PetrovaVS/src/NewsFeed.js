
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const shortenText = (text, maxWords) => {
  const words = text.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return text;
};

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setShowScrollToTop(scrollY > 100);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="news-feed">
      <h1>Yandex News</h1>
      {posts.map((post) => (
        <Link to={`/post/${post.id}`} key={post.id}>
          <div className="post-card">
            <h3 style={{ color: 'black', textDecoration: 'none' }}>
              {shortenText(post.title, 4)}
            </h3>
          </div>
        </Link>
      ))}
      
      
      <div
        className={`scroll-to-top ${showScrollToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      </div>
    </div>
  );
};

export default NewsFeed;
