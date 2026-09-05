import { Outlet, Link } from "react-router";
import { useState } from "react";

const App = () => {
const [hide, setHide] = useState(false);
const [user, setUser] = useState({});
const [disable, setDisable] = useState(true);

const handleSetHide = (boolean) => {
  setHide(boolean);
};

const handleSetUser = (user) => {
  setUser(user);
};

const handleSetDisable = (boolean) => {
  setDisable(boolean);
};

  return (
    <>
      <div>
          <nav hidden={hide}>
            {Object.keys(user).length > 0 ? (
              <div>{user.username}</div>
            ) : (
              <>
                <h1>Welcome to the main page!</h1>
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
