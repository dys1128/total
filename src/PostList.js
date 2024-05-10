import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PostList.module.css'

function PostList({ posts }) {
  return (
    <div>
    <h1 className={styles.con}>게시글 목록</h1>
    <section className={`${styles.article_list} ${styles.table_common} ${styles.con}`}>
      <table border="1">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성 시간</th>
            <th>조회수</th>  
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/community/posts/${post.id}`}>{post.title}</Link>
              </td>
              <td>{post.author}</td>
              <td>{new Date(post.date).toLocaleString()}</td>
              <td>{post.views}</td>  
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    </div>
  );
}

  export default PostList;