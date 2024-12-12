import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArticleCard } from '../../components/ArticleCard/ArticleCard';
import './SearchResultPage.css'
import { ArticlesPagination } from '../../components/ArticlesPagination/ArticlesPagination';

export function SearchResultPage() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get("query");
    const [results, setResults] = useState([]);
    const [isLoading, setLoading] = useState(false)
    const [searchPage, setSearchPage] = useState(JSON.parse(sessionStorage.getItem("searchPage")||1));
    const resultsPerPage = 5;

    useEffect(()=>{
        sessionStorage.setItem("searchPage", JSON.stringify(searchPage))
        if(query)
            fetchArticles(query);
    },[searchPage, query])

    async function fetchArticles(query) {
        setLoading(true);
        const baseURL = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi";
        const retstart = (searchPage-1) * resultsPerPage;
        const url = `${baseURL}?db=pubmed&term=${encodeURIComponent(query)}[Mesh]+AND+HasAbstract[Filter]&retstart=${retstart}&retmax=${resultsPerPage}&retmode=json`
        
        try{
            const response = await fetch(url);
            
            if(!response.ok) throw new Error("Failed to fetch data from PubMed.")
            const data = await response.json()
            const idArray = data?.esearchresult?.idlist;
            
            if (idArray && idArray.length > 0) {
                const articlesResponse = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${idArray.join(',')}&retmode=json`);
                const articlesData = await articlesResponse.json();
                const uids = articlesData?.result?.uids;

                if(uids && uids.length>0){
                    const articles = uids.map(id => {
                        const { title, uid } = articlesData.result[id];
                        const object = { title, uid };
                        return object
                    });
                  
                    setResults(articles)
                }
            }
        }
        catch(e){

        }
        finally {
            setLoading(false);
        }
    } 

    return (
        <div className='page_wrapper'>
            <h1 className='search_result_text'>Search Results for "{query}"</h1>
            {isLoading && <div className='loading_div'><div className="spinner-border text-success" role="status" >
                <span className="visually-hidden">Загрузка...</span></div></div>}
            
            {(results.length > 0 && !isLoading )&& 
                <>
                    <div className='search_articles'>{results.map((item, index) => <ArticleCard key={"search"+index} article={item}/>)}</div>
                    <ArticlesPagination page={searchPage} setCurrentPage={setSearchPage}/>
                </> }
            {(!results.length && !isLoading )&&<p className='no_results_text'>No results found</p>}
        </div>
    )
}
