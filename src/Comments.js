import React, { useState, useEffect } from 'react';
import styles from './Commments.module.css'

function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
  
    // 댓글 로드
    useEffect(() => {
      const storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
      const filteredComments = storedComments.filter(comment => comment.postId === postId);
      setComments(filteredComments);
    }, [postId]);
  
    // 댓글 추가
    const handleAddComment = () => {
      const newComment = {
        id: Date.now(),  // 간단한 ID 생성
        postId: postId,
        author: "익명",  // 고정된 작성자, 사용자 입력으로 대체 가능
        content: commentText,
        date: new Date().toISOString(),
      };
      const updatedComments = [newComment, ...comments];
      localStorage.setItem('comments', JSON.stringify(updatedComments));
      setComments(updatedComments);
      setCommentText('');  // 입력 필드 초기화
    };
    return (
        <div className={`${styles.con} ${styles.reply}`}>
          <h3 className="">댓글</h3>
          <section class={`${styles.reply_list} ${styles.table_common}`}>
            <table border="1">
              {comments.map(comment => (
                <div key={comment.id}>
                  <p><strong>{comment.author}</strong> ({new Date(comment.date).toLocaleString()}):</p>
                  <p>{comment.content}</p>
                </div>
              ))}
            </table>
          </section>
          <h3 className=''>댓글 입력</h3>
          <section className="styles.reply_form">
            <textarea
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="댓글을 입력하세요..."
            />
            <button onClick={handleAddComment}>댓글 추가</button>
          </section>
        </div>
      );

}

export default Comments;
