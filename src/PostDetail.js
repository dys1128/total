import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comments from './Comments';  // 댓글 컴포넌트 import


function PostDetail({ posts, setPosts}) {
    const { postId } = useParams();
    const navigate = useNavigate();
    const post = posts.find(p => p.id === parseInt(postId));
    const [showOptions, setShowOptions] = useState(false);
    console.log(post);

    if (!post) {
        return <div>게시글을 찾을 수 없습니다.</div>;
    }

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };
    
    const deletePost = () => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        console.log(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        navigate('/community');  // 삭제 후 커뮤니티 페이지로 리디렉션
    };
    
    const editPost = () => {
      navigate(`/community/new-post`, { state: { post } });  // Pass current post data to the editing route
  };

  return (
    <div>
    <button onClick={toggleOptions}>...</button>
    {showOptions && (
        <div>
          <button onClick={editPost}>수정하기</button>
          <button onClick={deletePost}>삭제하기</button>
        </div>
      )}
      <h1>{post.title}</h1> 
      <p>{post.author} - {new Date(post.date).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      
      <Comments postId={parseInt(postId)} />

    </div>
  );
}

export default PostDetail;