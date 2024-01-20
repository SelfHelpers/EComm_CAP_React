// const { Users } = cds.entities();
const CryptoJS = require("crypto-js");

/* const validateCredentials = async (req) => {
    const db = await cds.connect();
    const user = await db.run(SELECT.from(Users).where({username: req.data.username, password: req.data.password}));
    return user;
} */

module.exports = (srv) => {

    // Register user
    srv.before('CREATE', 'Users', async (req) => {
        console.log(process.env.PASS_SEC);
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
        if (user.length === 0) {
            return 'login failed';
        }
        return 'Done';
    });


}