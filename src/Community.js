import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Paper, IconButton } from '@mui/material';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import CommunityForm from './CommunityForm';

const OPENCAGE_API_KEY = 'c603d421c0b64d6a83c499d11bba9429'; 

export const usePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(
      storedPosts.map((post) => ({
        ...post,
        views: post.views || 0,
        createdAt: new Date(post.createdAt),
      }))
    );
  }, []);

  return [posts, setPosts];
};

export const CommunityFormWrapper = ({ posts, setPosts }) => {
  const location = useLocation();
  const post = location.state?.post;
  return <CommunityForm posts={posts} setPosts={setPosts} post={post} />;
};

function Community({ posts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showLocalPosts, setShowLocalPosts] = useState(false);
  const [location, setLocation] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`)
          .then((response) => response.json())
          .then((data) => {
            const locationData = data.results[0].components;
            const city = locationData.city || locationData.town || locationData.village;
            setLocation(city || 'Unknown');
          })
          .catch(() => setLocation('Unknown'));
      },
      (error) => {
        console.error(error);
        setLocation('Unknown');
      }
    );
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleToggleLocalPosts = () => {
    setShowLocalPosts((prevState) => !prevState);
    setCurrentPage(1);
  };

  const filteredPosts = showLocalPosts
    ? posts.filter((post) => post.location && post.location.includes(location))
    : posts;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

  const truncateContent = (content, length) => {
    return content.length > length ? content.substring(0, length) + '...' : content;
  };

  const navigate = useNavigate();
  const goToNewPost = () => navigate('/community/new-post');

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
        <Grid item xs={12} sx={{ width: '100%' }}>
          <Button variant="contained" onClick={handleToggleLocalPosts}>
            {showLocalPosts ? '전체 글 보기' : '내 지역 글 보기'}
          </Button>
        </Grid>
        
        <Grid item xs={12} sx={{ width: '100%', minHeight: 60, maxHeight: 60 }}>
          <Paper sx={{ padding: 1, background: "#D9D9D9", borderColor: 'grey' }}>
            <Grid item xs={{ m: 1 }} onClick={goToNewPost}>
              <Typography variant="underline" align="left" color="gray">
                새 글을 작성해 주세요.
              </Typography>
              <IconButton aria-label="write">
                <ModeOutlinedIcon />
              </IconButton>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sx={{ width: '100%' }}>
          <Grid container spacing={0.2} direction="column">
            {currentItems.map((post) => (
              <Grid item key={post.id} component={Link} to={`/community/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                <Paper sx={{ padding: 1 }}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} sx={{ minHeight: 20, maxHeight: 20 }}>
                      <Typography variant="h6" sx={{ textDecoration: 'none', color: 'inherit' }}>
                        {post.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ minHeight: 40, maxHeight: 40 }}>
                      <Typography variant="body2" color="textSecondary">
                        <Typography component="div" dangerouslySetInnerHTML={{ __html: truncateContent(post.content, 15) }} />
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="overline" color="textSecondary">
                        {formatDistanceToNow(parseISO(post.date), { addSuffix: true, locale: ko })} | {post.author} | {post.location}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} alignItems="center">
            <Pagination
              count={Math.ceil(filteredPosts.length / itemsPerPage)}
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