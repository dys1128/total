import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Write from './Write';
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

function Community({ posts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
        <Grid item xs={12} sx={{ width: '100%' }}>
          <Write />
        </Grid>
        <Grid item xs={12} sx={{ width: '100%' }}>
          <TableContainer component={Paper} sx={{ minWidth: 650 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">번호</TableCell>
                  <TableCell align="center">제목</TableCell>
                  <TableCell align="center">작성자</TableCell>
                  <TableCell align="center">작성&nbsp;시간</TableCell>
                  <TableCell align="center">조회수</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((post, index) => (
                  <TableRow
                    key={post.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {post.id} 
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/community/posts/${post.id}`}>{post.title}</Link>
                    </TableCell>
                    <TableCell align="center">{post.author}</TableCell>
                    <TableCell align="center">{new Date(post.date).toLocaleString()}</TableCell>
                    <TableCell align="center">{post.views}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={Math.ceil(posts.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Community;
