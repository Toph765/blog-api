import { Outlet, Link, useNavigate } from 'react-router'
import { useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleSetUser = (user) => {
    setUser(user);
  };

  const handleNewBlogNav = () => {
    navigate("/new-blog")
  }

  return (
    <>
    <nav>
      <h1>Main page</h1>
      {Object.keys(user).length > 0 ? (
        <div>{user.username}</div>
      ) : (
        <div>
        <Link to="log-in">Log in</Link>
        <Link to="sign-up">Sign up</Link>
      </div>
      )}
      <div>
        <button onClick={handleNewBlogNav}>Create New Blog!</button>
      </div>
    </nav>

      <Outlet context={{handleSetUser}}/>
    </>
  )
}

export default App
