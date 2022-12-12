const db = require('../db/connection');
// const {topicData} = require (`../db/data/${ENV}-data/index`);

exports.getTopicInfo = () =>{
    return db.query("SELECT * FROM topics;")
    .then(({rows}) => {
        return (rows);
    });
};