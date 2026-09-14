import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router";
import axios from "axios";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState(null);
    const { handleSetHide } = useOutletContext();
    const navigate = useNavigate();
    const url = import.meta.env.VITE_API_URL;

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

    const handleSignupBtn = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${url}auth/sign-up`, {
                email: email,
                username: username,
                password: password
            })

            if (response.data.response === "success") {
                navigate("/log-in");
            }

            console.log(response)
        }

        catch (error) {
            setError(error);
        }
    }

    return (
        <>
            {error  && (
                <div>{error}</div>
            )}
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

                <button onClick={handleSignupBtn}>Create Account</button>
            </form>
            <Link to="/" onClick={() => handleSetHide(false)}>Back Home</Link>
        </>
    )
}

export default SignUp;