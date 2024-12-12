import React, { useEffect, useState } from 'react'
import './MainPage.css'
import { ArticleCard } from '../../components/ArticleCard/ArticleCard'
import 'font-awesome/css/font-awesome.min.css';
import { CategoriesBanner } from '../../components/CategoriesBanner/CategoriesBanner';

export function MainPage() {
    const [articlesData, setArticlesData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getArticles = async () => {
        try {
            setLoading(true);
            let response;
            response = await fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=Depression[Mesh]+AND+HasAbstract[Filter]&retmax=3&retmode=json`);
            const data = await response.json()
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
                    localStorage.setItem('articlesData', JSON.stringify(articles));
                }
            }
            else console.log('No articles found');
            setLoading(false)
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    }
    useEffect(() => {
        const cachedArticles = localStorage.getItem('articlesData');
        if (cachedArticles) {
            setArticlesData(JSON.parse(cachedArticles));
            return;
        } else
            getArticles();

    }, [])

    return (<>
        <CategoriesBanner />
        <div className='page_wrapper'>
            <div className='home_content_text'>
                <div>
                    <h1>Help your health</h1>
                    <p>This site is dedicated to making health and wellness information accessible, understan&shy;dable, and actionable so that readers can make the best possible decisions about their health. </p>
                </div>
                <div>
                    <h1>Expert-Reviewed</h1>
                    <p>Our content is created, fact-checked, and reviewed by qualified writers, editors, clinicians, and other contributors.
                        The information we publish is accurate, evidence-based, current, person-centric, and trustworthy.</p>
                </div>
                <div>
                    <h1>Community & Support</h1>
                    <p>Our platform offers a safe place for each community to give and receive advice through one-on-one messaging and group discussions, all while offering members access to the latest news and research updates.</p>
                </div>
            </div>
            <div className='top_reads_section'><h1 >TOP READS</h1><i className="fa fa-arrow-right"></i></div>
            <div className='main_page_articles'>
                {(articlesData.length > 0 && !isLoading) && articlesData.map((article, index) => <ArticleCard article={article} key={'article'+index} />)}
                {isLoading && <div className='loading_div'><div className="spinner-border text-success" role="status" >
                    <span className="visually-hidden">Загрузка...</span></div>
                </div>}
            </div>
        </div>
    </>
    )
}

