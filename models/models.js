const db = require('../db/connection');

exports.getTopicInfo = () =>{
    return db.query('SELECT * FROM topics;')
    .then(({rows}) => {
        return (rows);
    });
};

exports.getArticleInfo = () => {
    const sqlquery = 'SELECT '
    return db.query('SELECT * FROM articles;')
    .then(({rows}) => {
        console.log(rows)
        return (rows);
    });
}