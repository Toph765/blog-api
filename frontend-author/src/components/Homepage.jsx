import { useState, useEffect } from "react";
import { Link, useOutletContext, useNavigate } from "react-router";

export const Homepage = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useOutletContext();
    const navigate = useNavigate();
    const url = import.meta.env.VITE_API_URL;

    useEffect(()=> {
        if (!user || Object.keys(user).length < 0) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        const getAllBlogs = async () => {
            try {
                const response = await fetch(`${url}posts/all`);
                const result = await response.json();

                setAllBlogs(result);
            }
            catch (error) {
                setError(error);
            }
        }

        getAllBlogs()

    }, [url]);
    
    return (
        <>
            {error && (
                <div>{error}</div>
            )}
            {allBlogs && allBlogs.map(blog => {
                return (
                    <div key={blog.id}>
                        <Link to={`/blogpost/${blog.id}`}>{blog.title ? blog.title : "untitled"}</Link>
                        <div>{blog.time}</div>
                    </div>
                )
            })}
        </>
    )
}