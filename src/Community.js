import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Write from './Write';
import {
    Container,
    Grid,
    Typography,
    Button,
    Paper,
} from '@mui/material';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

const OPENCAGE_API_KEY = 'c603d421c0b64d6a83c499d11bba9429'; // Replace with your OpenCage API key

function Community({ posts }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [showLocalPosts, setShowLocalPosts] = useState(false);
    const [location, setLocation] = useState('');

    // Fetch user's location on component mount
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    const locationData = data.results[0].components;
                    const city = locationData.city || locationData.town || locationData.village;
                    setLocation(city || 'Unknown');
                })
                .catch(() => setLocation('Unknown'));
        }, (error) => {
            console.error(error);
            setLocation('Unknown');
        });
    }, []);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleToggleLocalPosts = () => {
        setShowLocalPosts(prevState => !prevState);
        setCurrentPage(1); // Reset to first page on toggle
    };

    const filteredPosts = showLocalPosts
        ? posts.filter(post => post.location && post.location.includes(location))
        : posts;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

    const truncateContent = (content, length) => {
        return content.length > length ? content.substring(0, length) + '...' : content;
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                <Grid item xs={12} sx={{ width: '100%' }}>
                    <Write />
                </Grid>
                <Grid item xs={12} sx={{ width: '100%' }}>
                    <Button variant="contained" onClick={handleToggleLocalPosts}>
                        {showLocalPosts ? '전체 글 보기' : '내 지역 글 보기'}
                    </Button>
                </Grid>
                <Grid item xs={12} sx={{ width: '100%'  }}>
                    <Grid container spacing={0.2} direction="column">
                        {currentItems.map((post) => (
                            <Grid item key={post.id} component={Link} to={`/community/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                                <Paper sx={{ padding: 1}}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item xs={12} sx={{ minHeight: 20, maxHeight: 20 }}> {/* Specific Grid item height adjustment */}
                                            <Typography variant="h6" sx={{ textDecoration: 'none', color: 'inherit' }}>
                                                {post.title}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}sx={{ minHeight: 40, maxHeight: 40 }}>
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