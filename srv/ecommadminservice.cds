using  MyEcommProj from '../db/ecomm';

service ecommAdminService @(requires: 'Admin'){
    entity Users as projection on MyEcommProj.Users excluding { password };
    entity Products as projection on MyEcommProj.Products;
    entity Carts as projection on MyEcommProj.Carts;
    entity Orders as projection on MyEcommProj.Orders;
        
    // entity Orders as projection on MyProj.Orders where buyer = '9999-12-31T00:00:00Z';
}

// **** Allowed opperations ******
// users :   PATCH,DELETE,POST,READ for all Users
// products: PATCH,DELETE,POST,READ for all Products
// cart    : PATCH,DELETE,POST,READ for all Carts
// orders  : PATCH,DELETE,POST,READ for all Orders