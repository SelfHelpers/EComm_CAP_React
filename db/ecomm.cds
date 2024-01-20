using { Currency, User, managed, cuid } from '@sap/cds/common';
namespace MyEcommProj;

@assert.unique: {
  mail: [ email ]
}
entity Users : cuid, managed {
    username: String @mandatory;
    email: String @mandatory;
    password: String @mandatory;
    isAdmin: Boolean default false;
}

entity Products : cuid, managed {
    title: String @mandatory;
    desc: String @mandatory;
    img: LargeBinary @Core.MediaType;
    categories: many String;
    size: String;
    color: String;
    price: Double;
    currency: Currency;
}

entity Orders : cuid, managed {
    userId: Association to one Users;
    products: Composition of many {
      productId: Association to one Products;
      quantity: Integer;
    }
    amount: Double;
    address: Address_type;
    status: OrderStatus;
}

entity Carts : cuid{
    userId: Association to one Users;
    products: Composition of many {
          productId: Association to one Products;
          quantity: Integer;
       }
  }


type Address_type {
  Country :  String(10);
  City :  String(10);
  Street :  String(10);
  pinCode :  String(10);
}


@assert.range
type OrderStatus      : String enum {
    Pending;
    Ongoing;
    Completed;
    Inactive;
    Draft;
}