using  MyEcommProj from '../db/ecomm';

service ecommservice {
    entity Users as projection on MyEcommProj.Users excluding { password };
    entity Products as projection on MyEcommProj.Products;
    entity Carts as projection on MyEcommProj.Carts;
    entity Orders as projection on MyEcommProj.Orders;
        
    // entity Orders as projection on MyProj.Orders where buyer = '9999-12-31T00:00:00Z';

    action login(username: String, password: String) returns String;
}

// **** Users service ******
// registerUser is POST call to Users entity
// Update users is PATCH call to the Users entity
// Delete users is DELETE call to the Users entity
//////// To-do    ///////////
// Add Restrict to allow the READ all users for Admin and Read user for the same user



// **** Product service ******
// Create product should only be done by Admin


// **** Cart service ******
// Create cart by anyone
// Get all carts by Admin
// Get cart by that specific user


// **** Orders service ******
// Create Orders by anyone
// Get all Orders by Admin
// Get Order by that specific user