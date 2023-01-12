const db = require('../db/connection');

//3
exports.getTopicInfo = () =>{
    return db.query('SELECT * FROM topics;')
    .then(({rows}) => {
        return (rows);
    });
};

//4 //10 (adding topic filter and sort order)
exports.getArticleInfo = (sort_by='created_at',order='desc',topic) => {

    const validSortBy = ['created_at','votes','comment_count'];
    const validOrder= ['desc','asc']

    if (validSortBy.includes(sort_by) && validOrder.includes(order)) {
        let sqlquery = `SELECT articles.author,articles.title,articles.article_id,articles.topic,articles.created_at,articles.votes,COUNT(comments.article_id)::INT AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id `;

    if (topic) {
        sqlquery += `WHERE articles.topic='${topic}'`;
    }
    
    sqlquery += `GROUP BY articles.article_id ORDER BY articles.${sort_by} ${order.toUpperCase()};`;

    return db.query(sqlquery)
    .then(({rows}) => {
        return (rows);
    });
    } else {
        return Promise.reject({status:400, message:'Invalid Input'})
    }

    
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


//8
exports.updateArticleVotes = (article_id, votes) => {
    if(Object.keys(votes).length!==1){
        return Promise.reject({status:400, message: 'Missing information'})
    } else if (typeof(votes.inc_votes) !== 'number'){
        return Promise.reject({status:400, message: 'Invalid input'})
    } else {
        return db.query('UPDATE articles SET votes=votes+$2 WHERE article_id=$1 RETURNING *;',[article_id,votes.inc_votes])
        .then(({rows}) => {
            return (rows[0])
        });
    }
};

//9
exports.getUserInfo = () => {
    return db.query('SELECT * FROM users;')
    .then(({rows}) => {
        return (rows);
    });
};
