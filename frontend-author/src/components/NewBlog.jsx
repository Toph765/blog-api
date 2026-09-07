import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router";
import { Editor } from "@tinymce/tinymce-react"; 
import axios from "axios";

export const NewBlog  = () => {
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const editorRef = useRef(null);
    const navigate = useNavigate();

    const handleSetTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleSubmitBtn = async () => {
        try {
            const  content = editorRef.current.getContent({format: "text"});
            
            if (content.length > 0 && title) {
                const response = await axios.post("http://localhost:3000/posts", {
                title: title,
                content: editorRef.current.getContent({format: "text"}),
                published: false
                });

                if (response.status === 200) {
                    navigate("/");
                }
            } else {
                setMessage("You can't submit an empty blog");
            }

            if (!title) {
                setMessage("You can't submit an empty title");
            }
            
        }
        catch (error) {
            setError(error)
        }
    };

    return (
        <>
            <div>New Blog</div>

            {message && (
                <div>{message}</div>
            )}

            <form action="">
            <div>
                <label htmlFor="newTitle">Title: </label>
                <input type="text" name="newTitle" id="newTitle" onChange={handleSetTitle} required/>
            </div>
            </form>
            <div>
                <Editor
                apiKey='8eiphr96pnbrf11kcbo70jia5qyh4vc78ukk30cdpl4bzfl0'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>This is the initial content of the editor.</p>"
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
            </div>
            <button onClick={handleSubmitBtn}>Submit</button>
            <Link to="/">Back Home</Link>
        </>
    )
}