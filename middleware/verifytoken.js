const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const headers = req.headers['authorization'];
    const token = headers ? headers.split(" ")[1] : null;

    if (!token) {
        return res.status(403).json({ auth: false, message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403); 
        }

        req.id = user.id;
        console.log(user.id)
    });
    next(); 

};

module.exports = verifyToken;
