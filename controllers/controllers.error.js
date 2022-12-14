exports.handle404Paths = (req,res,next) => {
    res.status(404).send({message: 'Path not found'})
};

exports.handleCustomErrors = (err,req,res,next) => {
    if (err.code === '22P02') {
        res.status(400).send({message: 'Invalid article_id'})
    } else {
        next(err)
    }
};

exports.handle500 = (err,req,res,next) => {
    res.status(500).send({message: 'Internal server error'})
};

