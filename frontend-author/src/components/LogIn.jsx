import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router";
import axios from "axios";
import { setAuthHeader } from "../../utils/auth";

export const LogIn = () => {
    const [credentials, setCredentials] = useState({});
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const {handleSetUser, handleSetHidden} = useOutletContext();

    const handleSetCrendetials = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleLoginBtn = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/auth/log-in", {
                email: credentials.email,
                password: credentials.password
            });

            console.log(response)
            if (response.status === 200 && response.data.payload.isAuthor === true) {
                localStorage.setItem("jwt-author", response.data.token);
                localStorage.setItem("user-author", JSON.stringify(response.data.payload));
                setAuthHeader(response.data.token);
                handleSetUser(response.data.payload);
                handleSetHidden(false);
                navigate("/homepage");
            } else {
                setMessage("Log in failed! Please create author account.");
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
            
            {message && (
                <div>{message}</div>
            )}
                <form action="">
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" id="email" onChange={handleSetCrendetials} required/>
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" id="password" onChange={handleSetCrendetials} required/>
                    </div>
                    <button onClick={handleLoginBtn}>Enter</button>
                </form>
                <Link to="/sign-up">Sign Up</Link>
            </>
    )
}