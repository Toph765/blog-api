import { useState, useEffect } from "react";
import { Link, useOutletContext, useNavigate } from "react-router";
import { format } from "date-fns";
import  styles from "../App.module.css"

export const Homepage = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useOutletContext();
    const navigate = useNavigate();
    const url = import.meta.env.VITE_API_URL;

    useEffect(()=> {
        if (!user || Object.keys(user).length === 0) {
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
                setError(error.message);
            }
        }

        getAllBlogs()

    }, [url]);
    
    return (
        <>
            <div className={styles.blogsContainer}>
                {error && (
                    <div>{error}</div>
                )}
                <div className={styles.blogsList}>
                    {allBlogs && allBlogs.map(blog => {
                        return (
                            <div key={blog.id}>
                                <Link className={styles.link} to={`/blogpost/${blog.id}`}><span>{blog.title ? blog.title : "untitled"}</span></Link>
                                <div className={styles.blogDetails}>{format(blog.time, "eee PP")}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}