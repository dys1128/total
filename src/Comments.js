import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Paper, Grid } from '@mui/material';

const COMMENTS_STORAGE_KEY = 'comments';

const fetchComments = (postId) => {
  const allComments = JSON.parse(localStorage.getItem(COMMENTS_STORAGE_KEY)) || {};
  return allComments[postId] || [];
};

const saveComments = (postId, comments) => {
  const allComments = JSON.parse(localStorage.getItem(COMMENTS_STORAGE_KEY)) || {};
  allComments[postId] = comments;
  localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(allComments));
};

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const postComments = fetchComments(postId);
    setComments(postComments);
  }, [postId]);

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    const updatedComments = [...comments, { text: newComment, date: new Date().toISOString() }];
    setComments(updatedComments);
    saveComments(postId, updatedComments);
    setNewComment('');
  };

  return (
    <Paper elevation={1} sx={{ p: 2, mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="댓글 추가"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleAddComment}>
            댓글 달기
          </Button>
        </Grid>
      </Grid>
      <List>
        {comments.map((comment, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemText
              primary={comment.text}
              secondary={new Date(comment.date).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default Comments;