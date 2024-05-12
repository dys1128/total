import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import Write from './Write';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function Community({ posts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 
  console.log(posts);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <div>
      <Write />
      <TableContainer component={Paper} sx={{ minWidth: 650, margin: '0 auto', maxWidth: '70%' }}>
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
              key={currentItems.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {post.id -1}              </TableCell>
              <TableCell align="center"><Link to={`/community/posts/${post.id}`}>{post.title}</Link></TableCell>
              <TableCell align="center">{post.author}</TableCell>
              <TableCell align="center">{new Date(post.date).toLocaleString()}</TableCell>
              <TableCell align="center">{post.views}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <Stack spacing={2} alignItems="center">
        <Pagination
          count={Math.ceil(posts.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary" 
        />
      </Stack>
    </div>
  );
}

export default Community;