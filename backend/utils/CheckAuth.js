import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decodeToken = jwt.verify(token, "keysecret");

            req.userId = decodeToken._id;
            next();
        } catch (error) {
            return res.status(403).json({
                ErrorMsg: "No access",
            })
        }
    } else {
        return res.status(403).json({
            ErrorMsg: "No access"
        })
    }
}