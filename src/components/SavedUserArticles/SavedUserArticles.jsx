import React, { useContext, useEffect, useState } from 'react'
import './SavedUserArticles.css'
import 'font-awesome/css/font-awesome.min.css';
import { AuthContext } from '../../context/AuthContext'
import { ArticleCard } from '../ArticleCard/ArticleCard';

export function SavedUserArticles() {
    const { user } = useContext(AuthContext)
    const [sectionOpened, setOpened] = useState(false);
    const savedArticles = user?.savedArticles || [];

    useEffect(() => {
        const savedSection = localStorage.getItem("ssOp");
        if (savedSection) setOpened(JSON.parse(savedSection))
    }, [])
    useEffect(() => { localStorage.setItem("ssOp", JSON.stringify(sectionOpened)) }, [sectionOpened]);
    
    return (
        <div className='saved_articles_wrapper'>
            <button onClick={() => setOpened(!sectionOpened)} className='open_saved_articles_btn'>
                Saved Articles
                <i className={`fa-solid ${sectionOpened ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ marginLeft: '8px' }}></i>
            </button>
            <div className={`saved_articles_content ${sectionOpened ? 'open' : ''}`}>
                {savedArticles.length ?
                    <div className='saved_articles_div'>{savedArticles.map(article => <ArticleCard key={`savedArticle${article.uid}`} article={{ ...article }} />)}</div>
                    : <p className='no_saved_articles_txt'>No saved articles yet</p>}

            </div>
        </div>
    )
}
