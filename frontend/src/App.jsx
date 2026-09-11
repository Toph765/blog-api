import { Outlet, Link, useNavigate } from "react-router";
import { useState,  useEffect } from "react";
import setAuthHeader from "../utils/auth";

const App = () => {
const [hide, setHide] = useState(false);

const [user, setUser] = useState(() => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : {}; 
});

const [disable, setDisable] = useState(true);
const navigate = useNavigate();

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
      <div>
          <nav hidden={hide}>
              <h1>Welcome to the main page!</h1>
            {Object.keys(user).length > 0 ? (
              <>
                <div>{user.username}</div>
                <button onClick={handleLogOutBtn}>Log Out</button>
              </>
            ) : (
              <>
                <Link to="log-in" onClick={() => handleSetHide(true)}>Log In</Link>
                <Link to="sign-up" onClick={() => handleSetHide(true)}>Sign Up</Link>
              </>
            )}
        </nav>
        <Outlet context={{handleSetHide, handleSetUser, handleSetDisable, disable}}/>
      </div>
    </>
  )
}

export default App;
