const jwt = require("jsonwebtoken");


const verifyToken = async (req, res) => {
    let user;
    const authToken = req.headers.token;
    if (authToken) {
        jwt.verify(authToken,process.env.JWT_SEC, (err, retUser) => {
            if (err) {
                res.status(401).json({message: "Failed to authenticate"});
            } else {    
                user = retUser;
            }
        })
        return user;
    } else {
        res.status(401).json( {message: "Failed to authenticate"});
    }
}

const authenticate = async (req, res, next) => {
    
    if (req.headers.token) {
    
    try{
        const tokenUser = await verifyToken(req, res);

        if (tokenUser) {
            
            let scopes = [];
            if (tokenUser.isAdmin) {
                scopes = [ "Admin" ];
            }else{ scopes = []; }
    
            const user = new cds.User ({
                id: tokenUser.ID,
                // user_name: tokenUser.ID,
                // user_id: tokenUser.ID,
                _roles: ['any', 'authenticated-user', ...scopes]
            })
            req.user = user;
        }
    } catch (e) {
        console.log(e);
    }
        
    }
    next();
}

module.exports = authenticate;