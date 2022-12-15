exports.handle404Paths = (req,res,next) => {
    res.status(404).send({message: 'Path not found'})
};

exports.handlePsqlErrors = (err,req,res,next) => {
    if (err.code === '22P02') {
        res.status(400).send({message: 'Invalid article ID'})
    } else {
        next (err)
    }
}

exports.handleCustomErrors = (err,req,res,next) => {
    if (err.status ) {
        res.status(err.status).send({message: err.message})
    } else {
        next(err)
    }
};

exports.handle500 = (err,req,res,next) => {
    console.log(err)
    res.status(500).send({message: 'Internal server error'})
};

