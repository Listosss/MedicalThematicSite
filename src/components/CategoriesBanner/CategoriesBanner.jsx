import React from 'react'
import './CategoriesBanner.css'
import { useNavigate } from 'react-router-dom';

export function CategoriesBanner() {
    const navigate = useNavigate();
    const categories =[ "Phobia","Depression","PTSD","Mental health","Anxiety", "Schizophrenia"];

    const handleClick = (category)=>{
        localStorage.setItem("category", JSON.stringify(String(category).toLowerCase()));
        navigate('/news')
    }
    return (
        <div className='banner'>
            <div className='categories_div'>
                {categories.length ? categories.map((category, index)=> 
                <button 
                className='category' 
                key={index} 
                onClick={()=>{handleClick(category)}}
                >{category}</button>) : ""}
            </div>
        </div>
    )
}
