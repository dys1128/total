import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function PostForm({ posts, setPosts, post: initialPost }) {
   const navigate = useNavigate();
   // Use initialPost data if present, otherwise default to empty strings or an empty object
   const [title, setTitle] = useState(initialPost?.title || '');
   const [author, setAuthor] = useState(initialPost?.author || '');
   const [content, setContent] = useState(initialPost?.content || '');

   const handleSubmit = (event) => {
       event.preventDefault();
       const postsArray = JSON.parse(localStorage.getItem('posts') || '[]');
       if (initialPost) {
           // Update existing post
           const updatedPosts = postsArray.map(p => p.id === initialPost.id ? {...p, title, author, content, date: new Date().toISOString()} : p);
           localStorage.setItem('posts', JSON.stringify(updatedPosts));
           setPosts(updatedPosts);
       } else {
           // Add new post
           const newId = postsArray.length > 0 ? Math.max(...postsArray.map(p => p.id)) + 1 : 1;
           const newPost = {
               id: newId,
               title,
               author,
               content,
               date: new Date().toISOString(),
           };
           const newPosts = [newPost, ...postsArray];
           localStorage.setItem('posts', JSON.stringify(newPosts));
           setPosts(newPosts);
       }
       navigate('/community');
   };

   return (
       <form onSubmit={handleSubmit}>
           <input
               type="text"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder="제목"
               required
           />
           <input
               type="text"
               value={author}
               onChange={(e) => setAuthor(e.target.value)}
               placeholder="글쓴이"
               required
           />
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
           <button type="button" onClick={() => navigate('/community')}>취소</button>
           <button type="submit">등록</button>
       </form>
   );
}

export default PostForm;