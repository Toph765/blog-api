import { useState, useEffect } from "react";
import { Link } from "react-router";
import { format } from "date-fns";

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
            <div>
                <h2>This is Home Page!</h2>
                <div>
                    {error && (
                        <p>{error}</p>
                    )}
                </div>
                <div>
                    {blogs && blogs.map(blog => {
                        return (
                            <div key={blog.id}>
                                <Link to={`blogposts/${blog.id}`}>{blog.title}</Link>
                                <div>{format(blog.time, "eee PP")}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            
        </>
    )
}

export default Homepage;