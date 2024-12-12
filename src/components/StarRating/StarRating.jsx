import { useContext, useEffect, useState } from "react";
import './StarRating.css'
import { AuthContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { ModalWindow } from "../ModalWindow/ModalWindow";

export function StarRating({ articleId }) {
    const { user, rateArticle } = useContext(AuthContext);
    const [modalIsOpened, setIsModalOpened] = useState(false)
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);

    useEffect(() => {
        if (!user) return;
        const ratedArticle = user.ratedArticles?.find(article => article.uid === articleId)
        setRating(ratedArticle ? ratedArticle?.rating : 0);
    }
        , [articleId])

    const handleMouseEnter = (index) => {
        setHovered(index + 1)
    }
    const handleMouseLeave = () => {
        setHovered(0)
    }
    const handleMouseClick = (index) => {
        if (!user) {
            setIsModalOpened(true)
            return
        }
        const newRating = index + 1;
        setRating(newRating);

        rateArticle(articleId, newRating)
    }

    return (
        <>{modalIsOpened && <ModalWindow onClose={() => setIsModalOpened(false)}>
            <p>To interact with article you need an account</p>
            <div className='modal_links_div'>
                <NavLink to={'/login'} >Log in</NavLink>
                <NavLink to={'/register'} >Sign up</NavLink>
            </div>
        </ModalWindow>}
            <div className='star_rating_wrapper'>
                <p className='rating_txt'>Rate this article:</p>
                <div className='stars_div'>
                    {[...Array(5)].map((_, index) =>
                        <span
                            key={index}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleMouseClick(index)}
                            style={{
                                fontSize: '35px',
                                cursor: 'pointer',
                                color: (index < hovered || index < rating) ? "#198754" : " #c4c1c1"
                            }}
                        >★</span>)}</div>
            </div></>
    )
}