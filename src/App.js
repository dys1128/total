import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import PostForm from './PostForm';
import PostList from './PostList';
import PostDetail from './PostDetail';
import { useLocation } from 'react-router-dom';  // Import useLocation

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts.map(post => ({
      ...post,
      createdAt: new Date(post.createdAt) // 올바르게 Date 객체로 변환
    })));
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/community/" element={<PostList posts={posts} />} />
        <Route path="/community/new-post" element={
          <PostFormWrapper posts={posts} setPosts={setPosts} />
        } />
        <Route path="/community/posts/:postId" element={<PostDetail posts={posts} />} />
      </Routes>
    </BrowserRouter>
  );
}

// A wrapper component to handle the router state for editing a post
function PostFormWrapper({ posts, setPosts }) {
  const location = useLocation();
  const post = location.state?.post;  // Retrieve the post from state if it exists

  return <PostForm posts={posts} setPosts={setPosts} post={post} />;
}

export default App;
