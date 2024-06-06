import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import CommunityForm from './CommunityForm';
import Community from './Community';
import CommunityDetail from './CommunityDetail';
import { useLocation } from 'react-router-dom';  

function App() {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts.map(post => ({
      ...post,
      views: post.views || 0, 
      createdAt: new Date(post.createdAt)
    })));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/community/" element={<Community posts={posts} />} />
        <Route path="/community/new-post" element={<CommunityFormWrapper posts={posts} setPosts={setPosts} />} />
        <Route path="/community/posts/:postId" element={<CommunityDetail posts={posts} setPosts={setPosts} />} />
      </Routes>
    </BrowserRouter>
  );
}

function CommunityFormWrapper({ posts, setPosts }) {
  const location = useLocation();
  const post = location.state?.post;  
  return <CommunityForm posts={posts} setPosts={setPosts} post={post} />;
}

export default App;