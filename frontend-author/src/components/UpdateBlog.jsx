import { useState, useEffect,useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useParams, useNavigate, useOutletContext } from "react-router";

export const UpdateBlog = () => {
    const [blog, setBlog] = useState(null);
    const [title, setTitle]  = useState("");
    const [error, setError] = useState(null);
    const editorRef = useRef(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useOutletContext();
    const url = import.meta.env.VITE_API_URL;

    useEffect(()=> {
        if (!user || Object.keys(user).length < 0) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        const grabBlog = async () => {
            try {
                const response = await axios.get(`${url}posts/${parseInt(id)}`);
                setBlog(response.data.content);
                setTitle(response.data.title);
                console.log(response);
            }
            catch (error) {
                setError(error);
            }
        }

        grabBlog()
    }, [id, url]);

    const handleTitleChange  = (e) => {
        setTitle(e.target.value);
    }

    const handleUpdateBtn = async () => {
        try {
            const response = await axios.put(`${url}posts/${parseInt(id)}`, {
                title: title,
                content: editorRef.current.getContent({format: "text"}),
            })

            console.log(response)
            if (response.status === 200) {
                navigate(`/blogpost/${parseInt(id)}`);
            }
        }
        catch (error) {
            setError(error);
        }
    }

    const handleCancelBtn = () => {
        navigate(`/blogpost/${parseInt(id)}`);
    } 

    return (
        <>
            <h2>Update Blog</h2>

            {error && (
                <div>{error}</div>
            )}

            <form action="">
                <div>
                    <label htmlFor="updatedTitle">Title: </label>
                    <input type="text" name="updateTitle" id="updatedTitle" onChange={handleTitleChange} value={title} required/>
                </div>
            </form>
            <Editor
                apiKey='8eiphr96pnbrf11kcbo70jia5qyh4vc78ukk30cdpl4bzfl0'
                initialValue={`<p>${blog}</p>`}
                onInit={(evt, editor) => editorRef.current = editor}
                init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />

            <button onClick={handleUpdateBtn}>Update Blog</button>
            <button onClick={handleCancelBtn}>Cancel</button>
        </>
    )
}