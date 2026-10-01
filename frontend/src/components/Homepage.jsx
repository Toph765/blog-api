import { useState, useEffect } from "react";
import { Link } from "react-router";
import { format } from "date-fns";
import styles from "../App.module.css";

const Homepage = () => {
    const [blogs, setBlogs] = useState(null);
    const [error, setError] = useState(null);
    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await fetch(`${url}posts/published`);
                const src = await response.json();
                
                setBlogs(src);

            }
            catch (error) {
                setError(error.message);
            }
        }

        getBlogs();
    }, [url])

    return (
        <>
            <div className={styles.blogsContainer}>
                <div>
                    {error && (
                        <p>{error}</p>
                    )}
                </div>
                <h2>Posts</h2>
                <div  className={styles.blogsList}>
                    {blogs && blogs.map(blog => {
                        return (
                            <div key={blog.id} className={styles.blogItems}>
                                <Link to={`blogposts/${blog.id}`} className={styles.link}>
                                    <h3>{blog.title}</h3>
                                    <div className={styles.blogDetails}>
                                        <div>{blog.author}</div>
                                        <div>{format(blog.time, "eee PP")}</div>
                                    </div>
                                </Link>
                                
                            </div>
                        )
                    })}
                </div>
            </div>
            
        </>
    )
}

export default Homepage;