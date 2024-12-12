import React, { useContext, useEffect, useRef, useState } from 'react'
import './Comments.css'
import defaultCommentsFile from './DefaultComments.json'
import { AuthContext } from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'
import { ModalWindow } from '../ModalWindow/ModalWindow'

function Comment({ data }) {
    return (
        <div className='comment_wrapper'>
            <div className='com_avatar'><img alt='avatar' src={data?.src} /></div>
            <div className='com_text_wrapper'>
                <p className='com_username'>{data?.username}</p>
                <p className='com_text'>{data?.text}</p>
            </div>
        </div>
    )
}

function AddCommentForm({ addComment }) {
    const { user } = useContext(AuthContext)
    const textareaRef = useRef(null);
    const [myComment, setMyComment] = useState("")
    const [modalIsOpened, setIsModalOpened] = useState(false);

    const handleChange = (e) => {
        setMyComment(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "70px";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }
    const handleClick = () => {
        if (!user) {
            setIsModalOpened(true)
            return
        }
        if (myComment.trim()) {
            addComment({ username: user.name, src: user.avatar, text: myComment });
            setMyComment("");
            textareaRef.current.style.height = "70px";
        }

    }
    return (
        <>{modalIsOpened && <ModalWindow onClose={() => setIsModalOpened(false)}>
            <p>To interact with article you need an account</p>
            <div className='modal_links_div'>
                <NavLink to={'/login'} >Log in</NavLink>
                <NavLink to={'/register'} >Sign up</NavLink>
            </div>
        </ModalWindow>}

            <div className='add_comment_form'>
                <p className='add_comment_txt'>Add your own comment:</p>
                <div className='textarea_div'>
                    <textarea className='comment_textarea' value={myComment} ref={textareaRef}
                        onChange={(e) => handleChange(e)} maxLength="500" placeholder="Write your comment here..." />
                    <div className='com_symbols_counter'>{`${myComment.length}/500`}</div>
                </div>
                <button className='comment_btn' disabled={!myComment.trim()} onClick={handleClick}>Comment</button>
            </div></>
    )
}

export default function Comments({ uid }) {

    const [comments, setComments] = useState([]);
    const defaultComments = defaultCommentsFile.defaultComments.sort(() => Math.random() - 0.5).slice(0, 5);

    useEffect(() => {
        const savedArticle = localStorage.getItem(`article_${uid}`);
        const articleData = savedArticle ? JSON.parse(savedArticle) : null;

        if (articleData && articleData?.comments?.length) {
            setComments(articleData.comments)
        }
        else setComments(defaultComments)
    }, [])

    useEffect(() => {
        if (comments.length > 0) {
            localStorage.setItem(`article_${uid}`, JSON.stringify({ comments: comments }))
        }
    }, [comments])

    const addComment = ({ username, src, text }) => {
        const newComment = { username, src, text };
        setComments(comments => [...comments, newComment])
    }
    return (
        <div className='comments_wrapper'>
            <AddCommentForm addComment={addComment} />
            <p className='comments_section_txt'>Comments:</p>
            {comments.length > 0 && comments.map((comment, index) => <Comment data={comment} key={`comment_${index}_${Date.now()}`} />)}

        </div>
    )
}
