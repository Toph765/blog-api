import { Outlet, Link } from "react-router"

const App = () => {
  return (
    <>
      <div>
        <h1>Welcome to the main page!</h1>
        <Link to="log-in">Log In</Link>
        <Link to="sign-up">Sign Up</Link>
        <Outlet />
      </div>
    </>
  )
}

export default App
