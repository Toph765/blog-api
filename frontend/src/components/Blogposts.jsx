import { useParams, Link, useOutletContext } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const Blogpost = () => {
    const [blog, setBlog] = useState({});
    const [comments, setComments] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState(null);
    const { id } = useParams();
    const { disable, user } = useOutletContext();
    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
    const getBlog = async () => {
        try {
            const blogId = parseInt(id);
            const response = await fetch(`${url}posts/${blogId}`);
            const blog = await response.json(response);

            const commentRes = await fetch(`${url}posts/${blogId}/comments`);
            const comments = await commentRes.json(commentRes)
            setBlog(blog);
            console.log(comments)
            setComments(comments);
        }
        catch (error) {
            setError(error)
        }
    };

    getBlog();
    }, [id, url]);

    const handleNewComment = (e) => {
        setNewComment(e.target.value);
    }

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        const blogId = parseInt(id);

        try {
            const response = await axios.post(`{url}posts/${blogId}`, {
                content: newComment,
            })

            console.log(response.data)
            console.log(comments)
            setNewComment("");
            setComments([...comments, response.data]);
        }

        catch (error) {
            setError(error);
        }
    }

    const handleDelCommentBtn = async (commentId) => {
        const updatedComments = comments.filter(comment => comment.id !== commentId);
        const blogId = parseInt(id)

        await axios.delete(`${url}posts/${blogId}/comments/${commentId}/delete`);

        setComments(updatedComments);
    }

    return (
        <>
            <div>
                {error && (
                    <div>{error}</div>
                )}
            </div>
            <div>
                {Object.keys(blog).length > 0 && (
                    <>
                        <h2>{blog.title}</h2>
                        <div>{blog.author}</div>
                        <div>{blog.time}</div>
                        <p>{blog.content}</p>
                    </>
                )}
            </div>
            <div>
                <h2>Comments:</h2>
                <form action="" className="newComment">
                    <div>
                        <textarea name="newComment" id="newComment" value={newComment} onChange={handleNewComment} disabled={disable}>{newComment}</textarea>
                    </div>
                    <button onClick={handleSubmitComment} disabled={disable}>Submit</button>
                </form>
                {comments && comments.map(comment => {
                    return (
                    <div key={comment.id}>
                        <p>{comment.author}</p>
                        <p>{comment.time}</p>
                        <p>{comment.content}</p>
                        {(comment.userId === user.id) && (
                            <button onClick={() => handleDelCommentBtn(comment.id)}>Delete</button>
                        )}
                    </div>
                    )
                })}
            </div>
            <Link to="/"> Back Home</Link>
        </>
    )
};

export default Blogpost;