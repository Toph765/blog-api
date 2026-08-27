import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import setAuthHeader from "../../utils/auth";

const LogIn = () => {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({});

    const navigate = useNavigate();

    const handleSetCredentials = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

        const handleLoginBtn = async (e) => {
            e.preventDefault();

            try {
                const response = await axios.post("http://localhost:3000/auth/log-in",{
                    email: credentials.email,
                    password: credentials.password
                })

                localStorage.setItem("jwt", response.data.token);
                console.log(response)
                setAuthHeader(response.data.token);
                if (response.status === 200) {
                    navigate("/")
                }

            }

            catch (error) {
                setError(error.message)
            }
        }

    return (
        <>
            <form action="">
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" onChange={handleSetCredentials} required/>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" onChange={handleSetCredentials} required/>
                </div>
                <button onClick={handleLoginBtn}>Enter</button>
            </form>

            <Link to={"/"}>Back Home</Link>
        </>
    )
}

export default LogIn;