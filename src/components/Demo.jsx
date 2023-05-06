import React, { useLayoutEffect } from "react";

import { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick} from '../assets';

import { useLazyGetSummaryQuery } from '../services/article';


const Demo = () => {

    // defining a state hook
    const [article, setArticle] = useState({
        url:'',
        summary:'',
    });

    // define another state hook compiling all prev searched URLs (start with empty array)
    const [allArticles, setAllArticles] = useState([]);

    // define state hook for copied string
    const [copied, setCopied] = useState("");

    // defining a hook:
    const [ getSummary, {error, isFetching}] = useLazyGetSummaryQuery();

    // to store history to local storage define useEffect hook
    useEffect(() => {
        const articlesFromLocalStorage = JSON.parse(
            localStorage.getItem('articles')
        )

        if (articlesFromLocalStorage) {
            setAllArticles(articlesFromLocalStorage)
        }
        
    }, []);

    const handleSubmit = async (e) => {
        // prevent default behaviour of browser which is to reload the application 
        e.preventDefault();

        // make an API request to an AI GPT summarizer
        const { data } = await getSummary({ articleUrl: article.url});
        
        if(data?.summary) {
            const newArticle = { ...article, summary: data.summary };
            const updatedAllArticles = [newArticle, ...allArticles];

            setArticle(newArticle);
            setAllArticles(updatedAllArticles);

            localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
        }
    }

    // function to create copy URL button
    const handleCopy = (copyUrl) => {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => setCopied(false), 3000);
    }

    return (
        <section className="mt-16 w-full max-w-xl">
            {/* Search */}
            <div className="flex flex-col w-full gap-2">
                <form className="relative flex justify-center items-center"
                    onSubmit={handleSubmit}
                >
                    <img
                        src={linkIcon}
                        alt="link_icon"
                        className="absolute left-0 my-2 ml-3 w-5"
                    />
                    <input
                        type="url"
                        placeholder="Enter a URL"
                        value={article.url}
                        onChange={(e) => setArticle({ ... 
                        article, url: e.target.value})}
                        required
                        className="url_input peer"
                    />
                    <button
                        type="submit"
                        className="submit_btn 
                        peer-focus:border-gray-700
                        peer-focus:text-gray-700"
                    >
                        ↵
                    </button>
                </form>
                {/* Browser URL History */}
                <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                    {allArticles.map((item, index) => (
                        <div
                            key={`link-${index}`}

                            //this allows us to get back to a summary we have prev generated without having to make another pull
                            onClick={() => setArticle(item)} 
                            className="link_card"
                        >
                            <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                                <img
                                    src={copied === item.url ? tick : copy}
                                    alt="copy_icon"
                                    className="w-[40%] h-[40%] object-contain"
                                />
                            </div>
                            <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate"> 
                                {item.url}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Display Results */}
            <div className="my-10 max-w-full flex justify-center items-center">
                {isFetching ? (
                    <img src={loader} alt="loader" className="w-20 h-20 object-contain" />

                ) : error ? (
                    <p className="font-satoshi font-normal text-gray-700">
                        Well, that wasn't supposed to happen...
                        <br />
                        <span>
                            {error?.data?.error}
                        </span>
                    </p>
                ) : (
                    article.summary && (
                        <div className="flex flex-col gape-3">
                            <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                                Article <span className="blue_gradient">Summary</span>
                            </h2>
                            <div className="summary_box">
                                <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
                            </div>
                        </div>
                    )
                )}

            </div>
        </section>
    )
}

export default Demo