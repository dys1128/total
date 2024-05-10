import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comments from './Comments';

function PostDetail({ posts, setPosts }) {
  const { postId } = useParams();
  const navigate = useNavigate();
  const postIndex = posts.findIndex(p => p.id === parseInt(postId));
  const post = posts[postIndex];
  
  // Increment view count on component mount
  useEffect(() => {
    if (post) {
      // Create a copy and update the view count
      const updatedPosts = [...posts];
      updatedPosts[postIndex] = { ...post, views: post.views + 1 };

      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      setPosts(updatedPosts);
    }
  }, [postId]);  // Only rerun this effect if postId changes

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const deletePost = () => {
    const updatedPosts = posts.filter(p => p.id !== parseInt(postId));
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    navigate('/community');
  };

  const editPost = () => {
    navigate(`/community/new-post`, { state: { post } });
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>조회수 {post.views}</p>
      <p>{post.author} - {new Date(post.date).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <Comments postId={parseInt(postId)} />
      <button onClick={editPost}>수정하기</button>
      <button onClick={deletePost}>삭제하기</button>
    </div>
  );
}

export default PostDetail;
