import { Outlet, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { setAuthHeader } from '../utils/auth';
import './App.css'

function App() {
  const [hidden, setHidden] = useState(() => {
    const user = localStorage.getItem("user-author");
    return ((user && Object.keys(user).length < 0) || !user) ? true : false;
  });

  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user-author");
    if (user) {
      return JSON.parse(user);
    } else  {
      return {};
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt-author");

   // localStorage.setItem("user-author", JSON.stringify(user));

    if (token) {
      setAuthHeader(token);
    };
  },[])

  useEffect(() => {
    const handleNavigation = () => {
      if (Object.keys(user).length > 0) {
        navigate("/homepage")
      } else {
        navigate("log-in");
      }
    }

    handleNavigation();

  },[user, navigate]);

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
    <nav hidden={hidden}>
      <h1>Main page</h1>
      
      {user && (
        Object.keys(user).length > 0 && (
          <>
            <div>{user.username}</div>
            <button onClick={handleLogOut}>Log Out</button>
          </>
            
      )
      )}

      <div>
        <button onClick={handleNewBlogNav}>Create New Blog!</button>
      </div>
    </nav>

      <Outlet context={{handleSetUser, handleSetHidden, user}}/>
    </>
  )
}

export default App
