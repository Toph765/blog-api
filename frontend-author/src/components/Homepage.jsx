import { useState, useEffect } from "react";
import { Link } from "react-router";

export const Homepage = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAllBlogs = async () => {
            try {
                const response = await fetch("http://localhost:3000/posts/all");
                const result = await response.json();

                console.log(result)

                setAllBlogs(result);
            }
            catch (error) {
                setError(error);
            }
        }

        getAllBlogs()

    }, []);
    
    return (
        <>
            {allBlogs && allBlogs.map(blog => {
                return (
                    <div key={blog.id}>
                        <Link to={`blogpost/${blog.id}`}>{blog.title ? blog.title : "untitled"}</Link>
                    </div>
                )
            })}
        </>
    )
}