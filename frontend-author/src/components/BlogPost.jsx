import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";

export const Blogpost = () => {
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const getBlog = async () => {
            try {
                console.log(id)
                const response = await axios.get(`http://localhost:3000/posts/${parseInt(id)}`);
                console.log(response.data)
                setBlog(response.data);
            }
            catch (error) {
                setError(error);
            }
        }

        getBlog()
    }, [id])

    return (
        <>
            {blog && (
            <div>
                <h2>{blog.title}</h2>
                <div>{blog.content}</div>
                <div>
                    <button>edit</button>
                    {blog.published ? (
                        <button>Unpublish</button>
                    ): (
                        <button>Publish</button>
                    )}
                </div>
            </div>

            )}
            <Link to="/">Back Home</Link>
        </>
    )

}