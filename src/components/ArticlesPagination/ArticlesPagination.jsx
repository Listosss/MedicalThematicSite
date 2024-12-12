import React from 'react'
import './ArticlesPagination.css'

export function ArticlesPagination({ setCurrentPage, page }) {
    
    const renderButtonsPaginaton = (page) =>{
        
        const pageButtons = [];
        const startButton = Math.max((page-1),1);
        const endButton  = startButton + 2;

        for(let i = startButton; i<=endButton; i++){
            pageButtons.push(
            <button 
                className={Number(page)===i?'active_page':''}
                key={'pag_btn'+i}
                onClick={()=>setCurrentPage(i)}
                >{i}</button>)
        }
        return pageButtons
    }

    return (
        <nav className='articles_pagination'>
            <div>
                {renderButtonsPaginaton(page)}
            </div>
        </nav>
    )
}
