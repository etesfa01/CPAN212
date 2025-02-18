const auth = (req, res, next) => {
    if(req.query.username == "Eden") {
        next();
    }else {
        res.send("You are not an authorized user")
    }
};

//http://localhost:8000/fetchData?username=Eden
export default auth;