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
        return (rows[0])
    });
};

//6
exports.getComments = (article_id) => {
    return db.query('SELECT comment_id,votes,created_at,author,body FROM comments WHERE article_id=$1 ORDER BY created_at DESC;',[article_id])
    .then(({rows}) => {
            return (rows);
    });
};

//7
exports.addNewComment = (comment,article_id) => {
    if(Object.keys(comment).length!==2){
        return Promise.reject({status:400, message: 'Missing information'})
    } else if (typeof(comment.username) !== 'string' || typeof(comment.body)!=='string'){
        return Promise.reject({status:400, message: 'Invalid input'})
    } else {
        return db.query('INSERT INTO comments (author,body,article_id) VALUES ($1,$2,$3) RETURNING *;',[comment.username,comment.body,article_id])
        .then(({rows}) => {
            return (rows[0])
         })
    }
};

//9
exports.getUserInfo = () => {
    return db.query('SELECT * FROM users;')
    .then(({rows}) => {
        console.log(rows)
        return (rows);
    });
};
