const db = require('../db/connection');

exports.getTopicInfo = () =>{
    return db.query('SELECT * FROM topics;')
    .then(({rows}) => {
        return (rows);
    });
};

exports.getArticleInfo = () => {
    const sqlquery = 'SELECT articles.author,articles.title,articles.article_id,articles.topic,articles.created_at,articles.votes,COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;'
    return db.query(sqlquery)
    .then(({rows}) => {
        return (rows);
    });
};

exports.getComments = (article_id) => {
    return db.query('SELECT comment_id,votes,created_at,author,body FROM comments WHERE article_id=$1',[article_id])
    .then(({rows}) => {
        return (rows);
    });
};