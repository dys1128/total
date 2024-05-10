import React from 'react';
import { Link } from 'react-router-dom';


function PostList({ posts }) {
    console.log(posts)
    return (
    
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성 시간</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  export default PostList;