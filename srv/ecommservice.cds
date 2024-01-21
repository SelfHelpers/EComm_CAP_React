using  MyEcommProj from '../db/ecomm';

// This is a public service
service ecommservice {
    @insertonly entity Users as projection on MyEcommProj.Users;
    @readonly   entity Products as projection on MyEcommProj.Products;

    // entity Users as projection on MyEcommProj.Users excluding { password };    
    // entity Orders as projection on MyProj.Orders where buyer = '9999-12-31T00:00:00Z';

    action login(email: String, password: String) returns userData;
}

type userData {
    email: String;
    username: String;
    accessToken: String;
}


// ######################################
//  ecommService
// ######################################


// **** Allowed opperations ******
// Login
// registerUser is POST call to Users entity
// Read Only for products