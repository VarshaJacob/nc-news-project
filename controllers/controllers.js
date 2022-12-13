const {getTopicInfo} = require('../models/models');

exports.getTopics = (req,res) => {
    getTopicInfo().then((topics) => 
    res.status(200).send({'topics': topics})
    )
}