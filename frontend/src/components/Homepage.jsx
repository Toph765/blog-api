import { useState, useEffect } from "react";
import { Link } from "react-router";

const Homepage = () => {
    const [blogs, setBlogs] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await fetch('http://localhost:3000/posts');
                const src = await response.json();
                
                setBlogs(src);

            }
            catch (error) {
                setError(error.message);
            }
        }

        getBlogs();
    }, [])

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
                            </div>
                        )
                    })}
                </div>
            </div>
            
        </>
    )
}

export default Homepage;