import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
    Button,
    TextField,
    Grid,
    Container,
} from '@mui/material/';

const OPENCAGE_API_KEY = 'c603d421c0b64d6a83c499d11bba9429';

function CommunityForm({ posts, setPosts, post: initialPost }) {
    const navigate = useNavigate();
    const [title, setTitle] = useState(initialPost?.title || '');
    const [author, setAuthor] = useState(initialPost?.author || '');
    const [content, setContent] = useState(initialPost?.content || '');
    const [location, setLocation] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    const locationData = data.results[0].components;
                    setLocation(`${locationData.city}`);
                })
                .catch(() => setLocation('Location not found'));
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const postsArray = JSON.parse(localStorage.getItem('posts') || '[]');
        if (initialPost) {
            const updatedPosts = postsArray.map(p => p.id === initialPost.id ? {...p, title, author, content, date: new Date().toISOString(), location} : p);
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
            setPosts(updatedPosts);
        } else {
            const newId = postsArray.length > 0 ? Math.max(...postsArray.map(p => p.id)) + 1 : 1;
            const newPost = {
                id: newId,
                title,
                author,
                content,
                date: new Date().toISOString(),
                location,
                views: 0, 
            };
            const newPosts = [newPost, ...postsArray];
            localStorage.setItem('posts', JSON.stringify(newPosts));
            setPosts(newPosts);
        }
        navigate('/community');
    };

    return (
        <Container component="CommunityForm" maxWidth="md">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            autoFocus
                            fullWidth
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            id="author"
                            name="author"
                            label="작성자"
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            type="title"
                            id="title"
                            name="title"
                            label="제목을 입력해주세요"
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CKEditor
                            editor={ClassicEditor}
                            data={content}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setContent(data);
                            }}
                            config={{
                                height: '400px',
                            }}
                            onReady={(editor) => {
                                editor.editing.view.change(writer => {
                                    writer.setStyle('height', '400px', editor.editing.view.document.getRoot());
                                });
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            value={location}
                            disabled
                            id="location"
                            name="location"
                            label="Current Location"
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={() => navigate('/community')}
                            type="button"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            size="small"
                        >
                            취소
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, ml: 2 }}
                            size="small"
                        >
                            등록
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default CommunityForm;