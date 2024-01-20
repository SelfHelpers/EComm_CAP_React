using  MyEcommProj from '../db/ecomm';

service ecommUserService @(requires: 'authenticated-user') {
    entity Users  @(restrict: [ {grant: '*', where: 'ID = $user'}]) as projection on MyEcommProj.Users;
    entity Carts  @(restrict: [ {grant: '*', where: 'userId_ID = $user'}]) as projection on MyEcommProj.Carts;
    entity Orders @(restrict: [ {grant: '*', where: 'userId_ID = $user'}]) as projection on MyEcommProj.Orders;
        
    // entity Orders as projection on MyProj.Orders where buyer = '9999-12-31T00:00:00Z';
}

// **** Allowed opperations ******
// Update users : PATCH call to the Users entity
// Delete users : DELETE call to the Users entity
// Read to users : Only return the logged in user details
// Create cart  : Only for logged in user
// Get cart     : Only for the logged in user
// Create order  : Only for logged in user
// Get order     : Only for the logged in user