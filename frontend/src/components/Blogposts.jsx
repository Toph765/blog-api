import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const Blogpost = () => {
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
    const getBlog = async () => {
        try {
            const blogId = parseInt(id);
            const response = await fetch(`http://localhost:3000/posts/${blogId}`);
            const blog = await response.json(response);

            const commentRes = await fetch(`http://localhost:3000/posts/${blogId}/comments`);
            const comments = await commentRes.json(commentRes)
            setBlog(blog.content);
            setComments(comments);
        }
        catch (error) {
            setError(error)
        }
    };

    getBlog();
    }, [id]);

    const handleNewComment = (e) => {
        setNewComment(e.target.value);
    }

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        const blogId = parseInt(id);

        try {
            const response = await axios.post(`http://localhost:3000/posts/${blogId}`, {
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

    return (
        <>
            <div>
                {error && (
                    <div>{error}</div>
                )}
            </div>
            <div>
                {blog && (
                    <p>{blog}</p>
                )}
            </div>
            <div>
                <h2>Comments:</h2>
                <form action="" className="newComment">
                    <div>
                        <textarea name="newComment" id="newComment" value={newComment} onChange={handleNewComment}>{newComment}</textarea>
                    </div>
                    <button onClick={handleSubmitComment}>Submit</button>
                </form>
                {comments && comments.map(comment => {
                    return (
                    <div key={comment.id}>
                        <p>{comment.author}</p>
                        <p>{comment.time}</p>
                        <p>{comment.content}</p>
                    </div>
                    )
                })}
            </div>
            <Link to="/"> Back Home</Link>
        </>
    )
};

export default Blogpost;