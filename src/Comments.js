import React, { useState, useEffect } from 'react';
import styles from './Commments.module.css'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


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
        id: Date.now(),  
        postId: postId,
        author: "익명", 
        content: commentText,
        date: new Date().toISOString(),
      };
      const updatedComments = [newComment, ...comments];
      localStorage.setItem('comments', JSON.stringify(updatedComments));
      setComments(updatedComments);
      setCommentText('');  
    };
    // return (
    //     <div className={`${styles.con} ${styles.reply}`}>
    //       <h3 className="">댓글</h3>
    //       <section className={`${styles.reply_list} ${styles.table_common}`}>
    //         <table border="1">
    //           {comments.map(comment => (
    //             <div key={comment.id}>
    //               <p><strong>{comment.author}</strong> ({new Date(comment.date).toLocaleString()}):</p>
    //               <p>{comment.content}</p>
    //             </div>
    //           ))}
    //         </table>
    //       </section>
    //       <h3 className=''>댓글 입력</h3>
    //       <section className="styles.reply_form">
    //         <textarea
    //           value={commentText}
    //           onChange={e => setCommentText(e.target.value)}
    //           placeholder="댓글을 입력하세요..."
    //         />
    //         <button onClick={handleAddComment}>댓글 추가</button>
    //       </section>
    //     </div>
    // );
    return (
      <div >
        <h3 className='con'></h3>
        <TableContainer component={Paper} sx={{ minWidth: 650, margin: '0 auto', maxWidth: '70%' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {comments.map((post) => (
                <TableRow
                  key={post.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {post.author}
                  </TableCell>
                  <TableCell align="center">{post.content}</TableCell>
                  <TableCell align="center">{new Date(post.date).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '80ch' },
          }}
          noValidate
          autoComplete="off"
          align = "center"
        >
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={3}
            defaultValue="Default Value"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
          <Button variant="outlined" onClick={handleAddComment} >등록</Button>
        </Box>
        

      </div>
    );

}

export default Comments;
