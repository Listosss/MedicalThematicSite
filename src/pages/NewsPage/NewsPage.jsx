import React, { useEffect, useState } from 'react'
import './NewsPage.css'
import { ArticleCard } from '../../components/ArticleCard/ArticleCard';
import { ArticlesPagination } from '../../components/ArticlesPagination/ArticlesPagination';

export function NewsPage() {
    const [articlesData, setArticlesData] = useState([])
    const [isLoading, setLoading] = useState(false);
    const [category, setCategory] = useState(JSON.parse(localStorage.getItem("category") || "depression"));
    const [sortOption, setSortOption] = useState(JSON.parse(localStorage.getItem("sortOption")) || "");
    const [currentPage, setCurrentPage] = useState(JSON.parse(sessionStorage.getItem("news_page")) || 1);
    const resultsPerPage = 5;

    const getNewsArticles = async (currentCategory = category, currentSortOption = sortOption) => {
        try {
            console.log(currentCategory)
            setLoading(true);
            const baseURL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi";
            const retstart = (currentPage - 1) * resultsPerPage;
            const sortUrl = currentSortOption ? `&sort=${currentSortOption}` : '';

            let response;
            response = await fetch(`${baseURL}?db=pubmed&term=${currentCategory}[Mesh]+AND+HasAbstract[Filter]&retstart=${retstart}&retmax=${resultsPerPage}&retmode=json${sortUrl}`);
            const data = await response.json();
            const idArray = data?.esearchresult?.idlist

            if (idArray && idArray.length > 0) {
                response = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${idArray.join(',')}&retmode=json`);
                const articlesData = await response.json();
                const uids = articlesData?.result?.uids;
                if (uids && uids.length > 0) {
                    const articles = uids.map(id => {
                        const { title, uid } = articlesData.result[id];
                        const object = { title, uid };
                        return object
                    });
                    setArticlesData(articles);
                }
            }

            setLoading(false)
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    }

    useEffect(() => {
        setCurrentPage(1)
        if (category && sortOption) {
            localStorage.setItem("category", JSON.stringify(category))
            localStorage.setItem("sortOption", JSON.stringify(sortOption));
            console.log(category)
            getNewsArticles();
        }
    }, [category, sortOption])

    useEffect(() => {
        sessionStorage.setItem("news_page", JSON.stringify(currentPage));
        window.scrollTo(0, 0);
        getNewsArticles();
    }, [currentPage])

    return (
        <div className='page_wrapper news_page_wrapper'>
            <div className='filter_articles_panel'>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option disabled value={""} hidden>Category</option>
                    <option value={"phobia"}>Phobia</option>
                    <option value={"depression"}>Depression</option>
                    <option value={"PTSD"}>PTSD</option>
                    <option value={"mental health"}>Mental health</option>
                    <option value={"anxiety"}>Anxiety</option>
                    <option value={"schizophrenia"}>Schizophrenia</option>
                </select>

                <select value={sortOption} onChange={e => setSortOption(e.target.value)}>
                    <option disabled value={""} hidden>Sort by</option>
                    <option value="pub date">Publication Date</option>
                    <option value="relevance">Relevance</option>
                </select>
            </div>

            {(articlesData.length > 0 && !isLoading) && <>
                <div className='news_page_articles'>
                    {articlesData.map((article, index) => <ArticleCard article={article} key={'article' + index} />)}
                    <ArticlesPagination page={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            </>}
            {(!articlesData.length && !isLoading) && <p className='nothing_found_text'>Nothing found</p>}
            {isLoading && <div className='loading_div'><div className="spinner-border text-success" role="status" >
                <span className="visually-hidden">Загрузка...</span></div></div>}
        </div>
    )
}
