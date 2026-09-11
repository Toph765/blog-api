import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import axios from "axios";

export const Blogpost = () => {
    const [blog, setBlog] = useState({});
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

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

    const handleEditNavBtn = () => {
        navigate(`/update/${parseInt(id)}`);
    }

    const handlePublishBtn = async (e) => {
        e.preventDefault();

        try {
            if (blog.published === true) {
                await axios.put(`http://localhost:3000/posts/${parseInt(id)}`, {published: false});
                setBlog(prevBlog => ({
                    ...prevBlog,
                    published: false
                }))
            } else {
                await axios.put(`http://localhost:3000/posts/${parseInt(id)}`, {published: true});
                setBlog(prevBlog => ({
                    ...prevBlog,
                    published: true
                }))
            }
        }
        catch (error) {
            setError(error);
        }
    }

    const handleDelBtn = async () => {
        try {
            await axios.delete(`http://localhost:3000/posts/${parseInt(id)}`);

            navigate("/");
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
            {blog && (
            <div>
                <h2>{blog.title}</h2>
                <div>{blog.content}</div>
                <div>
                    <button onClick={handleEditNavBtn}>edit</button>
                    {blog.published ? (
                        <button onClick={handlePublishBtn}>Unpublish</button>
                    ): (
                        <button onClick={handlePublishBtn}>Publish</button>
                    )}
                    <button onClick={handleDelBtn}>Delete</button>
                </div>
            </div>

            )}
            <Link to="/homepage">Back Home</Link>
        </>
    )

}