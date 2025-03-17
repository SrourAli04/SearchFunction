import React from "react";
import { articles } from "../data/articles";
import { useState } from "react";
import '../assets/styles/SearchBox.css';

const SearchBox: React.FC = () => {

    const highlightText = (text: string, searchTerm: string) => {
        if(!searchTerm) return text;
        const regex = new RegExp(searchTerm, 'gi');
        return text.split(/(\s+)/).map((part, index) =>
            regex.test(part) ? <mark key={index}>{part}</mark> : part
        );
    }

    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredArticles = articles.filter(article => {
        return (article.title.toLowerCase().includes(searchTerm.toLowerCase())) || (article.content.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    return (
        <div className="search-container">
            <input type="text"
            placeholder="search"
            value={searchTerm}
            onChange={(e)=>
                setSearchTerm(e.target.value)
            } />
            <p className="result-count">
                <strong>{filteredArticles.length}</strong>
                posts found
            </p>
            {filteredArticles.map(article => (
                <div key={article.id} className="article">
                    <h2>{highlightText(article.title,searchTerm)}</h2>
                    <p>{highlightText(article.content,searchTerm)}</p>
                    <p className="article-date"></p>
                </div>
            ))}
        </div>
    )
}

export default SearchBox;