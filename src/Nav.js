import { useNavigate } from 'react-router-dom';

function Nav() {
    const navigate = useNavigate();
    const goToNewPost = () => navigate('/community/new-post');
  
    return (
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
            <button onClick={goToNewPost} className="nav-button">글쓰기</button>
          </li>
        </ul>
      </nav>
    );
  }

  export default Nav;