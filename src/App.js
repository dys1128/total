import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Community from './Community';
import CommunityDetail from './CommunityDetail';
import { usePosts, CommunityFormWrapper } from './Community';

function App() {
  const [posts, setPosts] = usePosts();

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

export default App;