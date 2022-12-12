const {getTopicInfo} = require('../models/models');

exports.getTopics = (req,res) => {
    getTopicInfo().then((rows) => 
    res.status(200).send({'topics': rows})
    )
}