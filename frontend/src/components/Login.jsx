import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router";
import axios from "axios";
import setAuthHeader from "../../utils/auth";
import styles from "../App.module.css";

const LogIn = () => {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({});
    const { handleSetUser, handleSetHide, handleSetDisable } = useOutletContext();
    const url = import.meta.env.VITE_API_URL;

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
                const response = await axios.post(`${url}auth/log-in`,{
                    email: credentials.email,
                    password: credentials.password
                })

                if (response.status === 200) {
                    localStorage.setItem("jwt", response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.payload));
                    setAuthHeader(response.data.token);
                    handleSetUser(response.data.payload);
                    handleSetHide(false);
                    handleSetDisable(false);
                    navigate("/");
                }

            }

            catch (error) {
                setError(error.message)
            }
        }

    return (
        <>
            {error && (
                <div>{error}</div>
            )}
            <div className={styles.formContainer}>
                <h2>Log In</h2>

                <form className={styles.form}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" onChange={handleSetCredentials} required/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={handleSetCredentials} required/>
                    </div>
                    <div>
                        <button onClick={handleLoginBtn}>Enter</button>
                    </div>
                </form>

                <Link to={"/"} className={styles.link} onClick={() => handleSetHide(false)}><span>Back Home</span></Link>
            </div>
            

        </>
    )
}

export default LogIn;