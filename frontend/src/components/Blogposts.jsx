import { useParams, Link, useOutletContext } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import styles from "../App.module.css";

const Blogpost = () => {
    const [blog, setBlog] = useState({});
    const [comments, setComments] = useState(null);
    const [newComment, setNewComment] = useState("write a comment");
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
            setComments(comments);
        }
        catch (error) {
            setError(error.message)
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

            if (newComment !== "write a comment" && newComment) {
                const response = await axios.post(`${url}posts/${blogId}`, {
                content: newComment,
            })

                setNewComment("");
                setComments([...comments, response.data]);
            }
        }

        catch (error) {
            setError(error.message);
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
            <div className={styles.blogSection}>
                {Object.keys(blog).length > 0 && (
                    <>
                        <h2>{blog.title}</h2>
                        <div className={styles.authorTime}>
                            <div>{blog.author}</div>
                            <div>{format(blog.time, "eee PP")}</div>
                        </div>
                        <p>{blog.content}</p>
                    </>
                )}
            </div>
            <div className={styles.commentSection}>
                <h2>Comments:</h2>
                <form className={styles.commentForm}>
                    <div>
                        <textarea name="newComment" id="newComment" value={newComment} onChange={handleNewComment} disabled={disable}>{newComment}</textarea>
                    </div>
                    <div>
                        <button onClick={handleSubmitComment} disabled={disable}>Submit</button>
                    </div>
                </form>
                <div className={styles.commentsList}>
                    {(comments && comments.length > 0) ? (comments.map(comment => {
                        return (
                        <div key={comment.id}>
                            <div className={styles.commentDetails}>
                                <h4>{comment.author}</h4>
                                <p>{format(comment.time, "eee PP")}</p>
                            </div>
                            <p className={styles.commentContent}>{comment.content}</p>
                            {(comment.userId === user.id) && (
                                <button onClick={() => handleDelCommentBtn(comment.id)}>Delete</button>
                            )}
                        </div>
                        )
                    })) : (
                        <div className={styles.noComment}>Share your thoughts!</div>
                    )}
                </div>
            </div>
            <Link to="/" className={styles.link}><span>Back Home</span></Link>
        </>
    )
};

export default Blogpost;