const { Users } = cds.entities();

const validateCredentials = async (req) => {
    const db = await cds.connect();
    const user = await db.run(SELECT.from(Users).where({username: req.data.username, password: req.data.password}));
    return user;
}

module.exports = (srv) => {

    srv.before('UPDATE', 'Users' , async (req) => {
        const user = await validateCredentials(req);
        console.log(req);
        if (user.length === 0) {
            req.error(400,'Wrong Credentials: Update not allowed');
            // return 'Wrong Credentials: Update not allowed';
            
        }
        
    } );


    srv.on('login', async (req) => {

        const user = await validateCredentials(req);
        if (user.length === 0) {
            return 'login failed';
        }
        return 'Done';
    });


}