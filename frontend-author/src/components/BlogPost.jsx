import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useOutletContext } from "react-router";
import axios from "axios";
import { format } from "date-fns";

export const Blogpost = () => {
    const [blog, setBlog] = useState({});
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useOutletContext();
    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            navigate("/")
        }
    }, [user, navigate]);

    useEffect(() => {
        const getBlog = async () => {
            try {
                console.log(id)
                const response = await axios.get(`${url}posts/${parseInt(id)}`);
                console.log(format(response.data.time, "eee PP"))
                setBlog(response.data);
            }
            catch (error) {
                setError(error);
            }
        }

        getBlog()
    }, [id, url]);

    const handleEditNavBtn = () => {
        navigate(`/update/${parseInt(id)}`);
    }

    const handlePublishBtn = async (e) => {
        e.preventDefault();

        try {
            if (blog.published === true) {
                await axios.put(`${url}posts/${parseInt(id)}`, {published: false});
                setBlog(prevBlog => ({
                    ...prevBlog,
                    published: false
                }))
            } else {
                await axios.put(`${url}posts/${parseInt(id)}`, {published: true});
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
            await axios.delete(`${url}posts/${parseInt(id)}`);

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
            {Object.keys(blog).length > 0 && (
            <div>
                <h2>{blog.title}</h2>
                <div>{blog.author}</div>
                <div>{format(blog.time, "eee PP")}</div>
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