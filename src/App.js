import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import PostForm from './PostForm';
import PostList from './PostList';
import PostDetail from './PostDetail';
import { useLocation } from 'react-router-dom';  // Import useLocation

function App() {
  const [posts, setPosts] = useState([]);

  // Load posts from local storage and ensure proper initialization of the view count
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts.map(post => ({
      ...post,
      views: post.views || 0,  // Ensure view count is initialized if missing
      createdAt: new Date(post.createdAt)
    })));
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/community/" element={<PostList posts={posts} />} />
        <Route path="/community/new-post" element={<PostFormWrapper posts={posts} setPosts={setPosts} />} />
        <Route path="/community/posts/:postId" element={<PostDetail posts={posts} setPosts={setPosts} />} />
      </Routes>
    </BrowserRouter>
  );
}

function PostFormWrapper({ posts, setPosts }) {
  const location = useLocation();
  const post = location.state?.post;  // Retrieve the post from state if it exists

  return <PostForm posts={posts} setPosts={setPosts} post={post} />;
}

export default App;