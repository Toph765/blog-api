import { useState } from "react";
import { Link } from "react-router";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const handleSetEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleSetUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleSetPassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSetRePassword = (e) => {
        setRePassword(e.target.value);
    }

    return (
        <>
            <form action="">
                <div>
                    <label htmlFor="newEmail">Email: </label>
                    <input type="email" name="newEmail" id="newEmail" value={email} onChange={handleSetEmail} required/>
                </div>
                <div>
                    <label htmlFor="newUsername">Username: </label>
                    <input type="text" name="newUsername" id="newUsername" value={username} onChange={handleSetUsername} required/>
                </div>
                <div>
                    <label htmlFor="newPassword">Password: </label>
                    <input type="password" name="newPassword" id="newPassword" value={password} onChange={handleSetPassword} required/>
                </div>
                <div>
                    <label htmlFor="newRePassword">Re-enter Password: </label>
                    <input type="password" name="newRePassword" id="newRePassword" value={rePassword} onChange={handleSetRePassword} required/>
                </div>

                <button>Create Account</button>
            </form>
            <Link to="/">Back Home</Link>
        </>
    )
}

export default SignUp;