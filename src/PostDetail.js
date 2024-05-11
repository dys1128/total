import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comments from './Comments';
import styles from './PostDetail.module.css';

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
      <h1 className='con'>게시글 상세</h1>
      <section className={`${styles.article_detail} ${styles.table_common} ${styles.con} ${styles.row}`}>
        <table className="styles.cell" border="1">
              <tbody>
                  <tr className="styles.article_title">
                      <td colspan="3">{post.title}</td>
                  </tr>
                  <tr className="styles.article_info">
                      <th>날짜</th>
                      <td>{new Date(post.date).toLocaleDateString()}</td>
                      <th>조회수</th>
                      <td>{post.views}</td>
                  </tr>
                  <tr classNames="styles.article_body">
                     <div colspan="4" dangerouslySetInnerHTML={{ __html: post.content }} />
                      {/* <td colspan="4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt deleniti repellat aliquam quis labore est error iste obcaecati laborum illo? Distinctio dolorem quis at assumenda! Perferendis, libero earum! Ducimus, ratione!</td> */}
                  </tr>
                  
              </tbody>
          </table>
        
      </section>
      <Comments postId={parseInt(postId)} />
                  <button onClick={editPost}>수정하기</button>
                  <button onClick={deletePost}>삭제하기</button>
    </div>
  );
}

export default PostDetail;
