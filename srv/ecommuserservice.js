const CryptoJS = require("crypto-js");


module.exports = (srv) => {

    //Encrypt the password during update call if password is provided
    srv.before('UPDATE', 'Users' , async (req) => {
        if (req.data.password) {
            req.data.password = CryptoJS.AES.encrypt(req.data.password, process.env.PASS_SEC).toString();
        }  
    } );

    // Validation to NOT allow POST on Orders/Carts for other user
    srv.before('CREATE', 'Orders' , async (req) => {
        
        if (!(req.data.userId_ID === req.user.id)) {
            req.error(400,"Can not create/update other user data");
        }  
    } );

    srv.before('CREATE', 'Carts' , async (req) => {
        
        if (!(req.data.userId_ID === req.user.id)) {
            req.error(400,"Can not create/update other user data");
        }  
    } );


}