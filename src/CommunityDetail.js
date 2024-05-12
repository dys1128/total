import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comments from './Comments';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';



function CommunityDetail({ posts, setPosts }) {
  const { postId } = useParams();
  const navigate = useNavigate();
  const postIndex = posts.findIndex(p => p.id === parseInt(postId));
  const post = posts[postIndex];
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (post) {
      const updatedPosts = [...posts];
      updatedPosts[postIndex] = { ...post, views: post.views + 1 };

      localStorage.setItem('posts', JSON.stringify(updatedPosts));
      setPosts(updatedPosts);
    }
  }, [postId]);  

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const deletePost = () => {
    const updatedPosts = posts.filter(p => p.id !== parseInt(postId));
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    navigate('/community');
  };

  const editPost = () => {
    navigate(`/community/new-post`, { state: { post } });
  };

  // return (
  //   <div>
  //     <h1 className='con'>게시글 상세</h1>
  //     <section className={`${styles.article_detail} ${styles.table_common} ${styles.con} ${styles.row}`}>
  //       <table className="styles.cell" border="1">
  //             <tbody>
  //                 <tr className="styles.article_title">
  //                     <td colspan="3">{post.title}</td>
  //                 </tr>
  //                 <tr className="styles.article_info">
  //                     <th>날짜</th>
  //                     <td>{new Date(post.date).toLocaleDateString()}</td>
  //                     <th>조회수</th>
  //                     <td>{post.views}</td>
  //                 </tr>
  //                 <tr classNames="styles.article_body">
  //                    <div colspan="4" dangerouslySetInnerHTML={{ __html: post.content }} />
  //                     {/* <td colspan="4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt deleniti repellat aliquam quis labore est error iste obcaecati laborum illo? Distinctio dolorem quis at assumenda! Perferendis, libero earum! Ducimus, ratione!</td> */}
  //                 </tr>   
  //             </tbody>
  //         </table>
        
  //     </section>
  //     <Comments postId={parseInt(postId)} />
  //                 <button onClick={editPost}>수정하기</button>
  //                 <button onClick={deletePost}>삭제하기</button>
  //   </div>
  // );
  return (
    <div>
      <h1 className='con'>게시글 상세</h1>
      
      <TableContainer component={Paper} sx={{ minWidth: 650, margin: '0 auto', maxWidth: '70%' }}>
        <Table sx={{ minHeight: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell align="center" colSpan={3}>{post.title}</TableCell>
            <TableCell><IconButton colSpan={1} aria-label="editDelete" onClick={toggleOptions}>
            {showOptions && (
                <div>
                    <Button variant="outlined" onClick={editPost} >수정</Button>
                    <Button variant="outlined" onClick={deletePost} >삭제</Button>
                  
                </div>
            )}
            <MoreHorizOutlinedIcon />
            </IconButton></TableCell>
          </TableRow>
          <TableRow >
            <TableCell align="left" size="small" colSpan={1}>{post.author}</TableCell>
            <TableCell align="right"size="small" colSpan={2}>{new Date(post.date).toLocaleString()}</TableCell>
            <TableCell align="center"size="small" colSpan={1}>{post.views}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableCell align="left" colSpan={3}><div colspan="4" dangerouslySetInnerHTML={{ __html: post.content }} /></TableCell>
        </TableBody>
        </Table>
      </TableContainer> 
      <Comments postId={parseInt(postId)} />
      <button onClick={editPost}>수정하기</button>
      <button onClick={deletePost}>삭제하기</button>
    </div>
  );
}

export default CommunityDetail;
