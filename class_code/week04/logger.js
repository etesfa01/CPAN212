const logger = (req, res, next) => {
    console.log(req.url);
    console.log(req.method); //show me info they are requesting
    console.log(req.headers); //information they are asking
    console.log(Date()); //show me exact date and time
    next();
};

export default logger;

//module.default