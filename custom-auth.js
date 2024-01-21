const jwt = require("jsonwebtoken");


const verifyToken = async (req, res) => {
    const authToken = req.header.token;
    console.log(req.header);
    if (authToken) {
        jwt.verify(authToken,process.env.JWT_SEC, (err, user) => {
            if (err) {
                res.status(401).json({message: "Failed to authenticate"});
            } else {
                return user;
            }
        })
    } else {
        res.status(401).json( {message: "Failed to authenticate"});
    }
}

const authenticate = async (req, res, next) => {
    console.log("authentication file");
    if (req.method !== "POST" || 
        (req.originalUrl !== "/odata/v4/ecommservice/Users" && 
        req.originalUrl !== "/odata/v4/ecommservice/login")) {

    const tokenUser = verifyToken(req, res);
    if (tokenUser) {
        let scopes = [];
        if (tokenUser.isAdmin) {
            scopes = [ "Admin" ];
        }else{ scopes = []; }

        const user = new cds.User ({
            id: tokenUser.ID,
            user_name: tokenUser.ID,
            user_id: tokenUser.ID,
            _roles: ['any', 'authenticated-user', ...scopes]
        })
        req.user = user;
    }
        
    }
    
    next();
}

module.exports = authenticate;