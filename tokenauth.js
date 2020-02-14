const jwt = require('jsonwebtoken');
const secret = 'rr3r45r3534frety54645y45y45y4yy54';

module.exports = function authenticateUser(req, res, next){
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, secret);
        req.authData = decoded;
        next();
    } catch (err) {
        return res.status(401).json({message: "Only logged in users have access to that resource"});
    }
}