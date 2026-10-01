import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { useState,  useEffect } from "react";
import setAuthHeader from "../utils/auth";
import styles from "./App.module.css";

const App = () => {
const navigate = useNavigate();
const location = useLocation();

const [hide, setHide] = useState(() => {
  if (location.pathname === "/log-in" || location.pathname == "/sign-up") {
    return true;
  } else return false;
});

const [user, setUser] = useState(() => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : {}; 
});

const [disable, setDisable] = useState(() => {
  const user = localStorage.getItem("user");
  if (user && Object.keys(user).length > 0) {
    return false;
  } else return true;
});

useEffect(() => {
  const token = localStorage.getItem("jwt");

  if (token) {
    setAuthHeader(token);
  };

}, [])

const handleSetHide = (boolean) => {
  setHide(boolean);
};

const handleSetUser = (user) => {
  setUser(user);
};

const handleSetDisable = (boolean) => {
  setDisable(boolean);
};

const handleLogOutBtn = ()  => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");
  setUser({});
  setDisable(true);
  navigate("/");
}

  return (
    <>
      <div className={styles.container}>

        {!hide && (
          <nav className={styles.nav}>
              <h1>Random Blog</h1>
            {Object.keys(user).length > 0 ? (
              <div>
                <div className={styles.username}>{user.username}</div>
                <button onClick={handleLogOutBtn}>Log Out</button>
              </div>
            ) : (
              <div>
                <Link to="log-in" className={styles.link} onClick={() => handleSetHide(true)}><span> Log In</span></Link>
                <Link to="sign-up" className={styles.link} onClick={() => handleSetHide(true)}><span>Sign Up</span></Link>
              </div>
            )}
          </nav>
        )}
          
        <div className={styles.main}>
          <Outlet context={{handleSetHide, handleSetUser, handleSetDisable, disable, user}}/>
        </div>

        <div className={styles.footer}>
          <div>A The Odin Project Exercise</div>
        </div>
      </div>
    </>
  )
}

export default App;
