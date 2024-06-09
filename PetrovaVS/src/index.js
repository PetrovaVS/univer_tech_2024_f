import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsFeed from './NewsFeed';
import PostDetail from './PostDetail';

import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/post/:postId" element={<PostDetail />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
