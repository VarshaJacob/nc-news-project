const db = require('../db/connection');


//3
exports.getTopicInfo = () =>{
    return db.query('SELECT * FROM topics;')
    .then(({rows}) => {
        return (rows);
    });
};

//4
exports.getArticleInfo = () => {
    const sqlquery = 'SELECT articles.author,articles.title,articles.article_id,articles.topic,articles.created_at,articles.votes,COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;'
    return db.query(sqlquery)
    .then(({rows}) => {
        return (rows);
    });
};

//5
exports.getArticleIdInfo = (article_id) => {
    return db.query('SELECT * FROM articles WHERE article_id=$1;',[article_id])
    .then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({status: 404, message: 'Article ID not found'})
        } else {
            return (rows[0])
        }
    });
};

//6
exports.getComments = (article_id) => {
    return db.query('SELECT comment_id,votes,created_at,author,body FROM comments WHERE article_id=$1 ORDER BY created_at DESC;',[article_id])
    .then(({rows}) => {
            return (rows);
    });
};