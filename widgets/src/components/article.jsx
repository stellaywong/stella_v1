import React from 'react';

class Article extends React.Component {
    constructor(props) {
        super(props);

        this.mapArticle = this.mapArticle.bind(this);
    }

    mapArticle(articles) {
        return articles.map((article, idx) => {
            return (
                <li key={idx}>
                    <article>{article}</article>

                </li>
            );
        });
    }

    render() {
        let article = this.props.content
        let content = article[this.props.index];

        return <>{content}</>;
    }
}

export default Article;