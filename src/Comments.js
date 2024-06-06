import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Button,
  Box
} from '@mui/material';


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
    
    return (
    <Container maxWidth="md">
      <h3>댓글</h3>
      <TableContainer component={Paper} sx={{ margin: '0 auto' }}>
        <Table aria-label="simple table">
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center" component="th" scope="row">
                  {comment.author}
                </TableCell>
                <TableCell align="center">{comment.content}</TableCell>
                <TableCell align="center">{new Date(comment.date).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box component="form" sx={{ mt: 3 }} noValidate autoComplete="off">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="댓글을 입력하세요"
              multiline
              rows={4}
              fullWidth
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleAddComment}>
              등록
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );

}

export default Comments;