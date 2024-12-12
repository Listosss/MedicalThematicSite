import React, { useEffect, useState } from 'react'
import './ArticleCard.css'
import { useNavigate } from 'react-router-dom'

export function ArticleCard({ article }) {
    const navigate = useNavigate();
    const [articleData, setData] = useState({})

    useEffect(() => {
        if (article.uid) {

            setData({
                title: article.title,

                src: './assets/article.png',
                uid: article.uid
            });
        }
    }, [article]);
    
    return (
        <div className='article_card_wrapper' onClick={() => { navigate(`/article/${articleData.uid}`) }}>
            <div className='article_card_img_div'><img alt={articleData?.title + '_img'} src={articleData?.src} /></div>
            <div className='article_info'>
                <h1>{articleData?.title}</h1>
            </div>
        </div>
    )
}
