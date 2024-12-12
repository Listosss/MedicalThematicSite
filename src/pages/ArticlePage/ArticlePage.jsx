import React, { useContext, useEffect, useState } from 'react'
import './ArticlePage.css'
import { NavLink, useParams } from 'react-router-dom'
import Comments from '../../components/Comments/Comments';
import { StarRating } from '../../components/StarRating/StarRating';
import 'font-awesome/css/font-awesome.min.css';
import { AuthContext } from '../../context/AuthContext';
import { ModalWindow } from '../../components/ModalWindow/ModalWindow';

function SaveArticle({ uid, title }) {
  const { user, saveArticle, deleteSavedArticle } = useContext(AuthContext)
  const [isSaved, setIsSaved] = useState(false)
  const [modalIsOpened, setIsModalOpened] = useState(false)

  useEffect(() => {
    if (!user) return
    if (user?.savedArticles) {
      setIsSaved(user.savedArticles.some(savedArticle => savedArticle.uid === uid))
    }
  }, [uid])

  const handleClick = () => {
    if (!user) {
      setIsModalOpened(true)
      return;
    }
    if (!isSaved) {
      saveArticle({ uid, title })
    }
    else {
      deleteSavedArticle({ uid })
    }
    setIsSaved(!isSaved);
  }
  return (
    <>
      {modalIsOpened && <ModalWindow onClose={() => setIsModalOpened(false)}>
        <p>To interact with article you need an account</p>
        <div className='modal_links_div'>
          <NavLink to={'/login'} >Log in</NavLink>
          <NavLink to={'/register'} >Sign up</NavLink>
        </div>
      </ModalWindow>}

      <button onClick={handleClick} className='save_article_btn'>
        <i className={`${isSaved ? 'fa-solid' : 'fa-regular'} fa-bookmark`} ></i>
      </button></>
  )
}



export function ArticlePage() {
  const { uid } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const getAllInfo = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${uid}&retmode=xml`)
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "application/xml");

      const meshTerms = Array.from(xmlDoc.querySelectorAll("MeshHeading > DescriptorName"))
        .map(term => term.textContent)
        || "No MeSH terms found";

      const title = xmlDoc.querySelector("ArticleTitle")?.textContent || "No title found";

      const abstract = xmlDoc.querySelector("AbstractText")?.textContent || "No abstract available";
      const authors = Array.from(xmlDoc.querySelectorAll("Author > LastName"))
        .map(author => author.textContent)
        .join(", ") || "No authors found";
      const pubDateYear = xmlDoc.querySelector("PubDate > Year")?.textContent || "";
      const pubDateMonth = xmlDoc.querySelector("PubDate > Month")?.textContent || "";
      const pubDateDay = xmlDoc.querySelector("PubDate > Day")?.textContent || "";
      setData({ title: title, abstract: abstract, authors: `Authors:  ${authors}`, pubdt: `${pubDateDay} ${pubDateMonth} ${pubDateYear}`, terms: [...meshTerms.slice(0, 5)] })
      setIsLoading(false)
    }
    catch (error) {
      console.log('Failed to fetch article: ', error)
    }
  }
  useEffect(() => {
    getAllInfo();
  }, [])

  return (
    <div className='page_wrapper'>
      {!isLoading && <>
        <h1 className='article_title'>{data?.title}</h1>
        <div className='categories_div_article'>
          {data?.terms ? data.terms.map((category, i) => (<p className='article_category' key={i}>{category}</p>)) : <p></p>}
        </div>
        <SaveArticle uid={uid} title={data?.title} />
        <p className='article_pubDate_text'>{data?.pubdt}</p>
        <p className='article_authors_text'>{data?.authors}</p>
        <p className='article_text'>{data?.abstract}</p>
        <StarRating articleId={uid} />
        <Comments uid={uid} />
      </>}
      {isLoading && <div className='loading_div'><div className="spinner-border text-success" role="status" >
        <span className="visually-hidden">Загрузка...</span></div>
      </div>}
    </div>
  )
}
