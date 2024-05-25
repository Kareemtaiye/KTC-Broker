import React from "react";

function TermsArticle({ articleName, articleText }) {
  return (
    <div className='article-container'>
      <blockquote className='blockquote'>
        <p className=' details blockquote-detail'>"{articleName}"</p>
      </blockquote>
      <article className='article'>
        <p className='details article-detail'>{articleText}</p>
      </article>
    </div>
  );
}

export default TermsArticle;
