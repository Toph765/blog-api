import { Outlet, useNavigate,useLocation } from 'react-router'
import { useState, useEffect } from 'react'
import { setAuthHeader } from '../utils/auth';
import styles from './App.module.css';

function App() {
  const [hidden, setHidden] = useState(() => {
    const user = localStorage.getItem("user-author");
    return ((user && Object.keys(user).length < 0) || !user) ? true : false;
  });

  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user-author");
    console.log(user)
    if (user) {
      return JSON.parse(user);
    } else  {
      return {};
    }
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("jwt-author");

   // localStorage.setItem("user-author", JSON.stringify(user));

    if (token) {
      setAuthHeader(token);
    };
  },[])

  useEffect(() => {
    const handleNavigation = () => {
      if (Object.keys(user).length === 0) {
        navigate("/log-in");
      } else {
        if (location.pathname === "/") {
          navigate("/homepage");
        } else {
          navigate(location.pathname)
        }
      }
    }

    handleNavigation();

  },[user, navigate, location.pathname]);

  const handleSetUser = (user) => {
    setUser(user);
  };

  const handleNewBlogNav = () => {
    navigate("/new-blog")
  }

  const handleSetHidden = (boolean) => {
    setHidden(boolean);
  }

  const handleLogOut = () => {
    localStorage.removeItem("jwt-author")
    localStorage.removeItem("user-author");
    setHidden(true);
    navigate("/")
  }

  return (
    <>
      <div className={styles.container}>
        {!hidden && (
          <nav  className={styles.nav}>
            <h1>Random Blog - Authors' Hub</h1>
            
            {user && (
              Object.keys(user).length > 0 && (
                <div>
                  <div className={styles.username}>{user.username}</div>
                  <button onClick={handleNewBlogNav}>Create New Blog!</button>
                  <button onClick={handleLogOut}>Log Out</button>
                </div>
            )
            )}
          </nav>
        )}
        
        <div className={styles.main}>
          <Outlet context={{handleSetUser, handleSetHidden, user}}/>
        </div>

        <div className={styles.footer}>
          <div>An Exercise for The Odin Project</div>
        </div>
        
      </div>
    </>
  )
}

export default App
