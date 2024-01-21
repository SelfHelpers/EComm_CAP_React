const { Users } = cds.entities();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const validateCredentials = async (req) => {
    const db = await cds.connect();
    const dbUser = await db.run(SELECT.from(Users).where({email: req.data.email}));
    if (dbUser.length === 0) {
        req.error(400,'Wrong Credentials: login failed');
    }else{
        let decPassword = CryptoJS.AES.decrypt(dbUser[0].password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);
        decPassword = decPassword.toString();
        if (decPassword !== req.data.password) {
            req.error(400,'Wrong Credentials: login failed');
        }
    }
    // const user = await db.run(SELECT.from(Users).where({username: req.data.username, password: req.data.password}));
    return dbUser;
}

module.exports = (srv) => {

    // Register user
    srv.before('CREATE', 'Users', async (req) => {
        req.data.password = CryptoJS.AES.encrypt(req.data.password, process.env.PASS_SEC).toString();
    })

    /*
    srv.before('UPDATE', 'Users' , async (req) => {
        const user = await validateCredentials(req);
        console.log(req);
        if (user.length === 0) {
            req.error(400,'Wrong Credentials: Update not allowed');
            // return 'Wrong Credentials: Update not allowed';
            
        }
        
    } ); */


    srv.on('login', async (req) => {

        const user = await validateCredentials(req);
        if (user.length !== 0) {

            const accessToken = jwt.sign({
                ID: user[0].ID,
                isAdmin: user[0].isAdmin
            }, 
            process.env.JWT_SEC,
            {expiresIn: "1d"});

            const userData = {
                email: user[0].email,
                username: user[0].username,
                accessToken: accessToken
            }
            return userData;
        }
    });


}