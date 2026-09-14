import { useState } from "react";
import { useNavigate, Link, useOutletContext } from "react-router";
import axios from "axios";

export const SignUp = () => {
    const [newUser, setNewUser] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { handleSetHidden } = useOutletContext();
    const url = import.meta.env.VITE_API_URL;

    const handleSetNewUser = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const handleSignUpbtn = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${url}auth/sign-up`, {
                email: newUser.newEmail,
                username: newUser.newUsername,
                password: newUser.newPassword,
                isAuthor: true,
            })

            if (response.data.response === "success") {
                handleSetHidden(false);
                navigate("/log-in");
            }
        }
        catch (error) {
            setError(error);
        }
    }
    
    return (
        <>
            {error && (
                <div>{error}</div>
            )}
            
            <form action="">
                <div>
                    <label htmlFor="newEmail">Email: </label>
                    <input type="email" name="newEmail" id="newEmail"  onChange={handleSetNewUser} required/>
                </div>
                <div>
                    <label htmlFor="newUsername">Username: </label>
                    <input type="text" name="newUsername" id="newUsername" onChange={handleSetNewUser} required/>
                </div>
                <div>
                    <label htmlFor="newPassword">Password: </label>
                    <input type="password" name="newPassword" id="newPassword" onChange={handleSetNewUser} required/>
                </div>
                <div>
                    <label htmlFor="rePassword">Re-enter Password: </label>
                    <input type="password" name="rePassword" id="rePassword" onChange={handleSetNewUser} required/>
                </div>
                <button onClick={handleSignUpbtn}>Create Account</button>
            </form>  
            <Link to="/log-in">Log In</Link>
        </>
    )
}